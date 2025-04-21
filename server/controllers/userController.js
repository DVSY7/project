// server/controllers/userController.js

require('dotenv').config({ path: '../config/.env' });
const db = require('../config/db'); // DB 연결
const bcrypt = require('bcryptjs'); // bcrypt 모듈 불러오기
const jwt = require('jsonwebtoken'); // jsonwebtoken 불러오기
const { logLoginAttempt } = require('../utiles/logHelper');

const JWT_SECRET = process.env.JWT_SECRET; // env에서 가져옴

// 회원가입 처리
exports.signup = async (req, res) => {
  const { username, password, name, sex, birth, email, local, interests } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const gender = sex === 'male' ? 'M' : 'F';

    console.log('회원가입 요청 데이터 :', req.body);

    // 사용자 삽입
    const insertUserQuery = `
      INSERT INTO Users (username, password, name, sex, birth, email, local)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(insertUserQuery, [
      username,
      hashedPassword,
      name,
      gender,
      birth,
      email,
      local,
    ]);

    const userId = result.insertId;
    console.log('회원가입 성공. 사용자 ID:', userId);

    // 관심사 없으면 바로 응답
    if (!interests || interests.length === 0) {
      return res.status(200).json({ message: '회원가입 성공 (관심사 없음)' });
    }

    // 관심사 삽입
    for (const interestName of interests) {
      // 관심사 ID 조회
      const [rows] = await db.query(
        'SELECT id FROM interests WHERE name = ?',
        [interestName]
      );

      if (rows.length === 0) {
        console.warn(`관심사 "${interestName}" 없음`);
        continue; // 혹은 throw new Error(...) 처리 가능
      }

      const interestId = rows[0].id;

      // 중계 테이블 삽입
      await db.query(
        'INSERT INTO UserInterests (user_id, interest_id) VALUES (?, ?)',
        [userId, interestId]
      );
    }

    res.status(200).json({ message: '회원가입 성공 (관심사 포함)' });
  } catch (err) {
    console.error('회원가입 처리 중 오류:', err);
    res.status(500).json({ message: '회원가입 실패', error: err });
  }
};


// 로그인 처리
exports.login = async (req, res) => {
  try {
    const { inputUserName, inputPassWord } = req.body;
    console.log('로그인 요청 데이터:', req.body);

    const query = `SELECT * FROM users WHERE username = ?`;
    const values = [inputUserName];

    console.log(query);
    console.log(values);

    const [results] = await db.query(query, values); // 🔥 여기 핵심
    console.log('DB쿼리 완료!');

    if (results.length === 0) {
      return res.status(401).json({ message: '존재하지 않는 사용자입니다.' });
    }

    const user = results[0];

    const match = await bcrypt.compare(inputPassWord, user.password);
    if (!match) {
      await logLoginAttempt(user.name, 'fail', req);
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('로그인 성공:', user);
    console.log('발급된 토큰:', token);

    await logLoginAttempt(user.name, 'success', req);
    return res.status(200).json({ message: '로그인 성공', user, token });
  } catch (err) {
    console.error('로그인 처리 중 오류:', err);
    return res.status(500).json({ message: '서버 오류', error: err });
  }
};
