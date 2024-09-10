const express = require("express")
const router = express.Router();
const { getUser, updateUser } = require("../controllers/user");
const { editUser } = require("../middleware/auth");


router.get('/:userId', getUser)
router.post('/', editUser, updateUser)

module.exports = router;