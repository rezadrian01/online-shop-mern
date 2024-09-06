const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `images/products`)
    },
    filename: (req, file, cb) => {
        const date = new Date().toISOString().replace(/:/g, '-');
        cb(null, `${date}-${file.originalname}`)
    }
})

const upload = multer({
    storage
})

const uploadMultiple = upload.array('images')

module.exports = { uploadMultiple }