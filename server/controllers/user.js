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