// server/app.js

require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");
const openAIRoutes = require("./routes/openAIRoutes")
const fetchRoutes = require('./routes/fetchRoutes');
const listRoutes = require('./routes/listRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cors = require('cors');
app.use(cors());

// 미들웨어 설정
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({extended:true, limit: '10mb'}));

// 정적 파일 서빙 (images 폴더)
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
// 정적 파일 서빙 (uploads/posts 폴더)
app.use('/images/posts', express.static(path.join(__dirname, 'uploads/posts')));

// 라우터 연결   /api/users/signup
app.use('/api/users',userRoutes);
app.use('/api/token',protectedRoutes);
app.use('/api',searchRoutes);
app.use('/auth',authRoutes);
app.use('/api',fetchRoutes);
app.use('/api',openAIRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/images', imageRoutes);
app.get("/", (req,res) => {
    res.send(process.env.GOOGLE_REDIRECT_URL)
})

module.exports = app;


