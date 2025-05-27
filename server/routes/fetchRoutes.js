//server/routes/fetchRoutes.js
const express = require('express');
const router = express.Router();
const fetchController = require('../controllers/fetchController'); // Fetch 관련 컨트롤러 불러오기

// gallery API
router.get('/gallery', fetchController.gallery);
// galleryImage API
router.get('/galleryImage', fetchController.galleryImage);

module.exports = router;