const fs = require('fs/promises');
const path = require('path');

exports.deleteProductImage = async (filePath, next) => {
    const newFilePath = path.join(__dirname, '..', filePath);
    try {
        const result = await fs.unlink(newFilePath)
    } catch (err) {
        next(err)
    }
}