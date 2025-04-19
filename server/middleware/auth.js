// server/middleware/auth.js
require('dotenv').config({path:'./config/.env'});
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token) return res.status(401).json({ message: "토큰 없음" });

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch (err){
        return res.status(403).json({ message: "유효하지 않은 토큰" });
    }
}