// server/controllers/userController.js

require('dotenv').config({ path: '../config/.env' });
const db = require('../config/db'); // DB 연결
const bcrypt = require('bcryptjs'); // bcrypt 모듈 불러오기
const jwt = require('jsonwebtoken'); // jsonwebtoken 불러오기

const JWT_SECRET = process.env.JWT_SECRET; // env에서 가져옴

// 회원가입 처리
exports.signup = async (req, res) => {
  const { username, password, name, sex, birth, email, local, interests } =
    req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const gender = sex === 'male' ? 'M' : 'F';

  console.log('회원가입 요청 데이터 :', req.body);

  const query = `
    INSERT INTO Users (username, password, name, sex, birth, email, local)
    VALUES (?,?,?,?,?,?,?)`;
  db.query(
    query,
    [username, hashedPassword, name, gender, birth, email, local],
    (err, result) => {
      if (err) {
        console.log('회원가입 오류 : ', err);
        return res.status(500).json({ message: '회원가입 실패', error: err });
      }

      const userId = result.insertId;

      console.log('회원가입 성공. 사용자 ID:', userId);
      // 관심사가 없으면 바로 성공 응답
      if (!interests || interests.length === 0) {
        return res.status(200).json({ messate: '회원가입 성공 (관심사 없음)' });
      }

      // 관심사 이름을 통해 ID를 조회하고, 중계 테이블에 삽입
      const insertUserInterests = interests.map((interestName) => {
        return new Promise((resolve, reject) => {
          // 관심사 ID찾기
          const findInterestQuery = 'SELECT id FROM interests WHERE name = ?';
          db.query(findInterestQuery, [interestName], (err, rows) => {
            if (err || rows.length === 0)
              return reject(err || `관심사 "${interestName}" 없음`);

            const interestId = rows[0].id;
            const insertBridgeQuery = `INSERT INTO UserInterests (user_id, interest_id) VALUES (?, ?)`;
            db.query(insertBridgeQuery, [userId, interestId], (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          });
        });
      });

      // 모든 관심사 삽입 처리
      Promise.all(insertUserInterests)
        .then(() => {
          res.status(200).json({ message: '회원가입 성공 (관심사 포함)' });
        })
        .catch((err) => {
          console.error('관심사 처리 오류:', err);
          res
            .status(500)
            .json({
              message: '회원가입은 되었지만 관심사 등록 실패',
              error: err,
            });
        });
    }
  );
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
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('로그인 성공:', user);
    console.log('발급된 토큰:', token);

    return res.status(200).json({ message: '로그인 성공', user, token });
  } catch (err) {
    console.error('로그인 처리 중 오류:', err);
    return res.status(500).json({ message: '서버 오류', error: err });
  }
};
