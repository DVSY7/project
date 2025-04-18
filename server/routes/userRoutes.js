// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 사용자 관련 컨트롤러 불러오기

// 회원가입 API
router.post('/signup',userController.signup);

module.exports = router;