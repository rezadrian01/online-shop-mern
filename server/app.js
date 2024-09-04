const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const { config } = require('dotenv');
const cors = require('cors');

config();

const app = express();

//router
const authRoutes = require('./routes/auth')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const date = new Date().toLocaleDateString().replace(/:/g, '-');
        cb(null, `${date}-${file.originalname}`)
    }
})

app
    .use(cors())
    .use(bodyParser.json());


app.use('/auth', authRoutes);


mongoose.connect(process.env.MONGODB_URI).then(result => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
});