const express = require("express")
const router = express.Router();
const { getUser } = require("../controllers/user")

router.get('/:userId', getUser)

module.exports = router;