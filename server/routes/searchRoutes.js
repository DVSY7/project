// server/routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const {searchData} = require('../controllers/searchController');

// POST 요청으로 검색 기능 호출
router.post('/search',searchData);

module.exports = router;