// server/controllers/userController.js
const db = require('../config/db'); // DB 연결
const bcrypt = require('bcryptjs'); // bcrypt 모듈 불러오기

// 회원가입 처리
exports.signup = async (req,res) =>{
    const {username, password, name, sex, birth, email, local, interests} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const gender = sex === "male" ? "M" : "F";

    console.log('회원가입 요청 데이터 :', req.body);

    const query = `
    INSERT INTO Users (username, password, name, sex, birth, email, local)
    VALUES (?,?,?,?,?,?,?)`
    ;

    db.query(query, [username, hashedPassword, name, gender, birth, email, local], (err, result) => {
        if(err) {
            console.log("회원가입 오류 : ", err);
            return res.status(500).json({message: '회원가입 실패', error: err});
        }
        console.log('회원가입 성공:', result);
        res.status(200).json({message: '회원가입 성공:',result});
    });
};