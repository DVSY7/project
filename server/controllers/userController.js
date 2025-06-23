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
      await logLoginAttempt(user.email, 'fail', req);
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('로그인 성공:', user);
    console.log('발급된 토큰:', token);

    await logLoginAttempt(user.email, 'success', req);
    return res.status(200).json({ message: '로그인 성공', user, token });
  } catch (err) {
    console.error('로그인 처리 중 오류:', err);
    return res.status(500).json({ message: '서버 오류', error: err });
  }
};

// 좋아요 처리
exports.likesHandler = async (req, res) =>{
  try{
    const {requests,galleryID,userID} = req.query;
    
    const options = {
      increase: { number : 1, liked: true},
      decrease: { number : -1, liked: false}
    };

    const { number :setNumber, liked: setLiked } = options[requests];

    await db.query(`
    UPDATE gallery
    SET likes = likes + ?  
    WHERE id = ?
      `,[setNumber, galleryID]);
    console.log("좋아요 처리 완료:",galleryID);

    await db.query(`
    INSERT IGNORE INTO likes(gallery_id, user_id, isliked)
    VALUES (?,?,?)
    ON DUPLICATE KEY UPDATE isliked = VALUES(isliked)
    `,[galleryID, userID, setLiked]);

    await db.query(`
      DELETE FROM likes
      WHERE isliked = 0
    `);

    res.status(200).json({message: "좋아요 처리 완료"})
  }catch(error){
    res.status(500).json({message: error})
  }
}

// 조회수 처리
exports.updateViews = async (req, res) => {

  // 여러작업을 하나의 트렌젝션으로 처리하기 
  const connection = await db.getConnection();
  await connection.beginTransaction();
  try{
    // 요청을 보낸 ip
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // 요청받은 정보
    const {postID, userID, toDayDate} = req.query;

    // 조회수 중복 방지 처리
    const [duplicateViews] = await connection.query(`
      SELECT * FROM post_views
      WHERE post_id = ? AND user_id = ? AND ip_address = ? AND viewed_date = ?
      `,[postID,userID,ipAddress,toDayDate]);
    
    // 이미 조회수를 올렸으면 무시
    if(duplicateViews.length === 0){
      await connection.query(`
        INSERT IGNORE INTO post_views(post_id, user_id, ip_address, viewed_date)
        VALUES(?,?,?,?)
        `,[postID,userID,ipAddress,toDayDate]);

    // 조회수 증가 처리
      await connection.query(`
      UPDATE gallery
      SET views = views + 1
      WHERE id = ?
      `,[postID]); 
    }

    // 조회수 최신화
    const [rows] = await connection.query(`
      SELECT views FROM gallery
      WHERE id = ?
      `,[postID]);
    
    await connection.commit();
    console.log(`요청받은 정보: ${postID} : ${userID} : ${toDayDate} 요청받은 ip: ${ipAddress}`,{data:rows[0].views});
    res.status(200).json({views:rows[0]?.views??0});
  }catch(error){
    await connection.rollback();
    res.status(500).json({message:"조회수 처리 실패"});
  }finally{
    await connection.release();
  }
}

// 댓글 처리
exports.updateComment = async (req, res) => {
  try{
    const {galleryID, userID, commentText} = req.body;
    await db.query(`
      INSERT INTO comments ( gallery_id, user_id, comment )
      VALUES (?,?,?)  
    `,[galleryID, userID, commentText]);
    res.status(200).json({message:"댓글저장 성공"});
  }catch(error){
    res.status(500).json({message:"댓글저장 실패:",error});
  }
}

// 댓글 좋아요처리
exports.updateCommentLikes = async (req, res) => {
  try{ 
    // 필요한 정보를 가져옴 
    const {commentID, userID, isliked} = req.body;

    // 좋아요 증가처리
    if(isliked){
      await db.query(`
        DELETE FROM comment_likes
        WHERE comment_id = ? AND user_id = ? AND isliked = true
        `,[commentID, userID]);
      await db.query(`
        UPDATE comments
        SET likes = likes - 1
        WHERE comment_id = ?
      `,[commentID]);
    // 좋아요 감소처리
    }else{
      await db.query(`
        INSERT IGNORE INTO comment_likes(comment_id, user_id)
        VALUES (?,?)
      `, [commentID, userID]);
      await db.query(`
        UPDATE comments
        SET likes = likes + 1
        WHERE comment_id = ?
      `,[commentID]);
    }
    res.status(200).json({messgae:"댓글 좋아요 처리 성공"});
  }catch(error){
    res.status(500).json({message:"댓글 좋아요 처리 오류",error});
  }
}