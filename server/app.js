const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
const cors = require('cors');
const path = require('path')

config();
const VERSION = '/api/v1'

const app = express();

//router
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const wishlistRoutes = require('./routes/wishlist');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');
const orderRoutes = require("./routes/order");

//midleware
const { jwtCheck } = require('./middleware/auth')


app
    .use(cors())
    .use(jwtCheck)
    .use(express.static(path.join(__dirname)))
    .use(bodyParser.json({ limit: '50mb' }))


app.use(`${VERSION}/auth`, authRoutes);
app.use(`${VERSION}/products`, productRoutes);
app.use(`${VERSION}/wishlist`, wishlistRoutes);
app.use(`${VERSION}/cart`, cartRoutes);
app.use(`${VERSION}/user`, userRoutes);
app.use(`${VERSION}/order`, orderRoutes);


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