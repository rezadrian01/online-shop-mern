const express = require('express');
const router = express.Router();
const { authGoogle, authGoogleCallback } = require('../controllers/auth')


router.get('/google', authGoogle);
router.get('/google/callback', authGoogleCallback);

module.exports = router