const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')
const { google } = require('googleapis')
const { config } = require('dotenv');

const { errorResponse } = require('../utils/error');

config()

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.API_URL}/auth/google/callback`
)

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizationUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
})

exports.authGoogle = async (req, res, next) => {
    res.redirect(authorizationUrl);
}

exports.authGoogleCallback = async (req, res, next) => {
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({
        version: 'v2',
        auth: oAuth2Client
    })
    const { data } = await oauth2.userinfo.get();
    res.status(200).json({ data })
}

exports.signup = async (req, res, next) => {
    try {
        const { email, name, password, phone } = req.body;
        // console.log(email, name, password, phone)
        const { validEmail, validName, validPassword, validPhone, errors } = signupValidation(email, name, password, phone);
        if (errors.email || errors.name || errors.password || errors.phone) {
            errorResponse('Validation Failed', 422, errors)
        }

        const existingUser = await User.findOne({ email: validEmail });
        if (existingUser) errorResponse('Email has been used', 409);
        const hashedPassword = await bcrypt.hash(validPassword, 12);
        const newUser = new User({
            email: validEmail,
            password: hashedPassword,
            name: validName,
            phone: validPhone
        })
        await newUser.save();
        res.status(201).json({ success: true, message: "Success create account" })

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { validEmail, validPassword, errors } = signinValidation(email, password);
        if (errors.email || errors.password) {
            errorResponse("Validation failed", 422, errors)
        }
        const existingUser = await User.findOne({ email: validEmail });
        if (!existingUser) errorResponse("User not found", 401)

        const correctPassword = await bcrypt.compare(validPassword, existingUser.password);
        if (!correctPassword) errorResponse('Wrong Password', 401)

        const token = jwt.sign({
            email: existingUser.email,
            userId: existingUser._id.toString()
        }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRED })

        res.status(200).json({ success: true, message: "Login Success", token, userId: existingUser._id.toString() })

    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
}

const signupValidation = (email, name, password, phone) => {
    const errors = {
        name: false,
        email: false,
        password: false,
        phone: false
    }

    const sanitizedEmail = validator.normalizeEmail(email);
    const validEmail = validator.isEmail(sanitizedEmail);
    const validName = !validator.isEmpty(name);
    const validPassword = !validator.isEmpty(password);
    const validPhone = !validator.isEmpty(phone);

    if (!validEmail) errors.email = true;
    if (!validName) errors.name = true;
    if (!validPassword) errors.password = true;
    if (!validPhone) errors.phone = true;

    return {
        validEmail: sanitizedEmail || null,
        validName: name || null,
        validPassword: password || null,
        validPhone: phone || null,
        errors
    }

}

const signinValidation = (email, password) => {
    const errors = {
        email: false,
        password: false
    }
    const sanitizedEmail = validator.normalizeEmail(email);
    const validEmail = validator.isEmail(sanitizedEmail);
    const validPassword = !validator.isEmpty(password);

    if (!validEmail) errors.email = true;
    if (!validPassword) errors.password = true;
    return {
        validEmail: sanitizedEmail || null,
        validPassword: password || null,
        errors
    }
}