const express = require('express');
const router = express.Router();
const { authGoogle, authGoogleCallback, signin, signup } = require('../controllers/auth')


router.get('/google', authGoogle);
router.get('/google/callback', authGoogleCallback);
router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router