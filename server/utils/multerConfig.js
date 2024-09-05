const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `../images/product`)
    },
    filename: (req, file, cb) => {
        const date = new Date().toLocaleDateString().replace(/:/g, '-');
        cb(null, `${date}-${file.originalname}`)
    }
})

const upload = multer({
    storage
})

const uploadMultiple = upload.array('images')

module.exports = { uploadMultiple }