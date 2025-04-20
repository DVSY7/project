// server/routes/protected.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/protected-data', verifyToken, (req, res)=>{
    res.json({message: `안녕하세요, ${req.user.username}님`});
})

module.exports = router;