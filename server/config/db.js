// server/config/db.js

require('dotenv').config({ path: './.env' });
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '0000',
    database: 'bucketmate',
    port: process.env.DB_PORT // .env에 DB_PORT=3400 으로 되어 있어야 함
});

module.exports = db;
