const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors');

config();

const app = express();

//router
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const wishlistRoutes = require('./routes/wishlist')

//midleware
const { jwtCheck } = require('./middleware/auth')


app
    .use(cors())
    .use(bodyParser.json());

app.use(jwtCheck)


app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/wishlist', wishlistRoutes)


app.use((err, req, res, next) => {
    const data = err?.data || [];
    const message = err.message || "An error occurred";
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ success: false, message, data })
})


mongoose.connect(process.env.MONGODB_URI).then(result => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
});