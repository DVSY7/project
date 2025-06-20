//server/routes/fetchRoutes.js
const express = require('express');
const router = express.Router();
const fetchController = require('../controllers/fetchController'); // Fetch 관련 컨트롤러 불러오기

// gallery API
router.get('/gallery', fetchController.gallery);
// gallery/comments API
router.get('/gallery/comments',fetchController.comments);
// galleryImage API
router.get('/galleryImage', fetchController.galleryImage);
// friendList API
router.get('/friendList', fetchController.friendList);
// blockList API
router.get('/blockList', fetchController.friendList);
// chattingList API
router.get('/chattingList', fetchController.chattingList);
// AddBlocked API
router.post('/AddBlocked', fetchController.ActionList);
// RemoveBlocked API 
router.post('/RemoveBlocked', fetchController.ActionList);
// chatMessage API
router.get('/chatmessage', fetchController.chatMessage);
// currentMember API
router.get('/currentMember', fetchController.currentMember);
// messageRead API
router.get('/messageRead', fetchController.messageRead);
// userInfo API
router.get('/userInfo',fetchController.userInfo);
// userID API
router.get('/userID',fetchController.userID);
// isliked API
router.get(`/isliked`,fetchController.isLiked);
// likes API
router.get(`/likes`,fetchController.likes);

module.exports = router;