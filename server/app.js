// server/app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const authRoutes = require("./routes/authRoutes");
const searchRoutes = require("./routes/searchRoutes");
const fetchRoutes = require('./routes/fetchRoutes');
const listRoutes = require('./routes/listRoutes');
const cors = require('cors');


// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// 라우터 연결   /api/users/signup
app.use('/api/users',userRoutes);
app.use('/api/token',protectedRoutes);
app.use('/api',searchRoutes);
app.use('/auth',authRoutes);
app.use('/api',fetchRoutes);
app.use('/api/lists', listRoutes);


module.exports = app;


