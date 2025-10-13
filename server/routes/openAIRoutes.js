//server/routes/openAIRoutes.js

const express = require('express');
const router = express.Router();
const openAIController = require('../controllers/openAIController');

// 라우터 생성 API
router.post('/openAIGPT',openAIController.openAIGPT);

module.exports = router;