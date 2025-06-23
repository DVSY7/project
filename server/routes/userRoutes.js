// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 사용자 관련 컨트롤러 불러오기

// 회원가입 API
router.post('/signup',userController.signup);

// 로그인 API
router.post('/login',userController.login);

// 좋아요 API
router.get(`/likesHandler`,userController.likesHandler);

// 조회수 API
router.get(`/views`,userController.updateViews);

// 게시글 댓글 저장 API
router.post(`/gallery/updateComment`,userController.updateComment);

// 게시글 댓글 좋아요처리 API
router.post(`/gallery/updateCommentLikes`,userController.updateCommentLikes);

module.exports = router;