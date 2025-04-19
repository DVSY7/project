require('dotenv').config({path: './.env'});
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: "0000",
    database: 'bucketmate',
    port: process.env.DB_PORT // 포트번호를 3400으로 설정
});

db.connect((err) => {
    if(err){
        console.log('데이터베이스 연결 실패: ', err.stack);
        return;
    }
    console.log('MySQL 데이터베이스에 연결됨.');
});

module.exports = db;