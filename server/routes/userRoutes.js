// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // 사용자 관련 컨트롤러 불러오기

// 회원가입 API
router.post('/signup',userController.signup);

// 회원가입 프로필 이미지 등록 API
router.post('/signup/profile',userController.signupProfile);

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

// 북마크 처리 API
router.post(`/bookmark`,userController.bookmark);

// 리스트 참여 API
router.post(`/addUserRoom`,userController.addUserRoom);

// 게시글 작성 API
router.post(`/createPost`,userController.createPost);

module.exports = router;