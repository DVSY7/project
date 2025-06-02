const db = require('../config/db'); // DB 연결
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signupCheck = async (id,username,name,email) => {

    const [rows] = await db.query("SELECT * FROM users WHERE social_login = ?",[id]);

    if(rows.length === 0){
        await db.query(
            "INSERT INTO users (social_login, username, name, email) VALUES(?,?,?,?)",
            [id,username,name,email]
        )
    }

    const token = jwt.sign(
        {id:id, username:email, name:name},
        JWT_SECRET,
        {expiresIn: "3h"}
    );

    return token;
}