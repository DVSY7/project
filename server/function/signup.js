const db = require('../config/db'); // DB 연결
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signupCheck = async (id,username,name,email) => {

    const [rows] = await db.query("SELECT * FROM users WHERE social_login = ?",[id]);
    // social_login은 기본이미지 제공
    const basicProfile = "images/미니프로필.png"

    if(rows.length === 0){
        const [result] = await db.query(
            "INSERT INTO users (social_login, username, name, email) VALUES(?,?,?,?)",
            [id,username,name,email]
        )

        // 방금 가입한 유저의 ID 가져오기
        const insertId = result.insertId;
        // 기본 프로필 데이터 삽입
        await db.query(
            "INSERT INTO profiles (user_id, profile_image_url) VALUES(?,?)",
            [insertId, basicProfile]
        )
    }

    const token = jwt.sign(
        {id:id, username:email, name:name},
        JWT_SECRET,
        {expiresIn: "3h"}   
    );

    return token;
}