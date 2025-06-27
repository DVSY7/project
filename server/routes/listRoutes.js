//server/routes/listRoutes.js

const express = require('express')
const router = express.Router();
const listController = require('../controllers/listController');

// 라우터 생성 API
router.post('/create', listController.createList);

module.exports = router;//server/routes/fetchRoutes.js