// server/app.js
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const protected = require("./routes/protected");
const db = require('./config/db');
const cors = require('cors');
const app = express();

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// DB 연결
db.connect();

// 라우터 연결
app.use('/api/users',userRoutes);
app.use('/api/token',protected);

module.exports = app;


