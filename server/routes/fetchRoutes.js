//server/routes/fetchRoutes.js
const express = require('express');
const router = express.Router();
const fetchController = require('../controllers/fetchController'); // Fetch 관련 컨트롤러 불러오기

// gallery API
router.get('/gallery', fetchController.gallery);
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

module.exports = router;