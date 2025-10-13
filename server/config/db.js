// server/config/db.js

require('dotenv').config({ path: './.env' });
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '0000',
    database: process.env.DB_NAME || 'bucketmate',
    port: process.env.DB_PORT || 3400 // 기본값 3400 설정
});

module.exports = db;

