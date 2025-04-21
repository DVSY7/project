// server/routes/authRoutes.js

const express = require('express')
const router = express.Router();
const { kakaoLogin,naverLogin } = require('../controllers/authController');

// 카카오 로그인 API
router.post('/kakao/token',kakaoLogin);
// 네이버 로그인 API
router.post('/naver/token',naverLogin);

module.exports = router;