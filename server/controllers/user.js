const validator = require('validator');
const bcrypt = require('bcryptjs')
const User = require("../models/user")
const { errorResponse } = require("../utils/error")

exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const existingUser = await User.findById(userId).populate("products").select("-password -address -wishlist -cart -order");
        if (!existingUser) errorResponse("User not found", 404)
        res.status(200).json({
            success: true, message: "Success get user data", data: existingUser

        })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { name, phone, email, address, currentPassword, newPassword, confirmNewPassword } = req.body;

        console.log(name, phone, email, address)
        const existingUser = await User.findById(req.userId);
        if (!existingUser) errorResponse("Invalid user", 401)
        const { validName, validPhone, validEmail, validAddress, errors } = updateUserValidation(name, phone, email, address);
        if (errors.length > 0) errorResponse("Validation failed", 422);

        existingUser.name = validName;
        existingUser.email = validEmail;
        existingUser.phone = validPhone;
        existingUser.address.push(validAddress || "")

        if (currentPassword) {
            const { errors, updatedPassword } = await updatePasswordValidation(existingUser, currentPassword, newPassword, confirmNewPassword)
            if (errors.length == 0 && updatedPassword) {
                existingUser.password = updatedPassword;
            } else {
                errorResponse("Validation password failed", 422, errors)
            }
        }

        await existingUser.save();
        res.status(200).json({ success: true, message: "Success update user" })
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500
        next(err)
    }
}

const updatePasswordValidation = async (userData, currentPassword, newPassword, confirmNewPassword) => {
    const errors = []
    let updatedPassword;
    if (userData.password) {
        const passwordIsCorrect = await bcrypt.compare(currentPassword, userData.password);
        if (!passwordIsCorrect) {
            errors.push("Wrong current password")
        }
    }
    if (newPassword !== confirmNewPassword) {
        errors.push("Wrong confirmation password")
    }
    if (errors.length == 0) {
        updatedPassword = await bcrypt.hash(newPassword, 12)
    }
    return {
        errors,
        updatedPassword
    }

}

const updateUserValidation = (name, phone, email, address) => {
    const errors = []
    const sanitizedEmail = validator.normalizeEmail(email) || "";
    const validEmail = validator.isEmail(sanitizedEmail);
    const validName = !validator.isEmpty(name?.trim());
    const validPhone = !validator.isEmpty(phone.trim());
    // const validAddress = !validator.isEmpty(address);

    if (!validEmail) errors.push("Invalid email")
    if (!validName) errors.push("Invalid name");
    if (!validPhone) errors.push("Invalid phone");
    // if (!validAddress) errors.push("Invalid address")

    return {
        validName: validator.escape(name),
        validPhone: validator.escape(phone),
        validEmail: sanitizedEmail,
        validAddress: validator.escape(address || ""),
        errors
    }
}