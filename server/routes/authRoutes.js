// server/routes/authRoutes.js

const express = require('express')
const router = express.Router();
const { kakaoLogin } = require('../controllers/authController');

// 카카오 로그인 API
router.post('/kakao/token',kakaoLogin);

module.exports = router;