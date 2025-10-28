// server/controllers/userController.js

require('dotenv').config({ path: '../config/.env' });
const db = require('../config/db'); // DB 연결
const bcrypt = require('bcryptjs'); // bcrypt 모듈 불러오기
const jwt = require('jsonwebtoken'); // jsonwebtoken 불러오기
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { logLoginAttempt } = require('../utiles/logHelper');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const JWT_SECRET = process.env.JWT_SECRET; // env에서 가져옴
dayjs.extend(utc);
dayjs.extend(timezone);

// multer storage 설정
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/profiles"); // 저장 폴더
  },
  filename: (req, file, cd) => {
    const koreaTimestamp = dayjs().tz("Asia/Seoul").format("YYYYMMDDHHmmssSSS");
    const ext = path.extname(file.originalname); // .jpeg, .png 등
    const filename = `ProfileImage_${koreaTimestamp}${ext}`;
    cd(null, filename);
  },
});

const upload = multer({ storage });

// 회원가입 처리
exports.signup = async (req, res) => {
  const { username, password, name, sex, birth, email, local, interests} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const gender = sex === 'male' ? 'M' : 'F';

    console.log('회원가입 요청 데이터 :', req.body);

    // 사용자 삽입
    const insertUserQuery = `
      INSERT INTO users (username, password, name, sex, birth, email, local)
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

    const insertId = result.insertId;
    console.log('회원가입 성공. 사용자 ID:', insertId);

    // 관심사 없으면 바로 응답
    if (!interests || interests.length === 0) {
      return res.status(200).json({ message: '회원가입 성공 (관심사 없음)', insertId });
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
        'INSERT INTO userinterests (user_id, interest_id) VALUES (?, ?)',
        [insertId, interestId]
      );
    }

    // 등록된 프로필이 없으면 기본이미지 제공
    const basicProfile = "images/미니프로필.png";
    try{
      await db.query(
        "INSERT INTO profiles(user_id, profile_image_url) VALUES(?,?)",
        [insertId, basicProfile]
      )
    } catch(error) {
      console.error(`프로필 이미지 등록 실패: ${error}`);
    }
    
    

    res.status(200).json({ message: '회원가입 성공 (관심사 포함)', insertId });
  } catch (err) {
    console.error('회원가입 처리 중 오류:', err);
    res.status(500).json({ message: '회원가입 실패', error: err });
  }
};

exports.signupProfile = [
  upload.single("profile"),
  async (req, res) => {
    try{
      const {insertId} = req.body;
      const file = req.file;
      if(!insertId || !file) {
        return res.status(400).json({ message: "잘못된 요청" });
      };
      // DB에 이미지 경로 저장
      const imageURL = `${process.env.SERVER_URL}/images/profiles/${file.filename}`;
      await db.query(
        `UPDATE profiles SET profile_image_url = ? WHERE user_id = ?`,
        [imageURL, insertId]
      );
      res.status(200).json({ message: "프로필 업로드 성공", imageURL})
    }catch(error){
      console.error(error);
      res.status(500).json({ message: "프로필 업로드 실패" });
    }
  }
]

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

// 북마크 처리
exports.bookmark = async (req, res) => {
  const {listID, userID, isBookmark} = req.body;
  try{
    await db.query(`
      UPDATE list_relation
      SET is_bookmark = ?
      WHERE list_id = ? AND user_id = ?
      `,[isBookmark, listID, userID]);
    console.log("서버: 북마크 변경완료");
    res.status(200).json({message:'변경 성공'});
  }catch(error){
    res.status(500);
  }
}

// 리스트 참가 처리
exports.addUserRoom = async (req, res) => {
  const {userID, listID} = req.body;
  if(userID && listID){
    try{
    // 요청을 보낸 유저를 채팅방에 추가
    const [result] = await db.query(`
      INSERT IGNORE INTO user_rooms ( user_id, chat_room_id )
      VALUES (?,?)
      `,[userID, listID]);
    
    // 참여한 리스트를 목록에 추가
    await db.query(`
      INSERT INTO list_relation ( list_id, user_id, is_bookmark )
      VALUES (?,?,?)  
    `,[listID, userID, 0]);

    // 유저의 이름을 가져옴
    const [userName] = await db.query(`
      SELECT name FROM users
      WHERE id = ?
      `,[userID]);

    // 대화방 제목을 가져옴
    const [listTitle] = await db.query(`
      SELECT title FROM lists
      WHERE list_id = ?
      `,[listID]);

    if(result.affectedRows){
      // 유저가 참가되면 채팅방에 메세지를 보냄
      await db.query(`
        INSERT INTO messages ( chat_room_id, sender_id, content )
        VALUES (?,?,?)
        `,
        [
          listID,
          55,
          `<시스템>\n[${userName[0].name}]님이\n[${listTitle[0].title}]에 참여하셨습니다.`
        ]
      )
      // 채팅방 참여 인원수 증가
      await db.query(`
        UPDATE chat_rooms
        SET current_members = current_members + 1
        WHERE chat_room_id = ?
      `,[listID]);
    }

    res.status(200).json(result);
  }catch(error){
    res.status(500).json({message:error});
  }
  }
}

// 게시글 작성 처리
exports.createPost = async (req, res) =>{
  const {postInfo} = req.body;
  const {id, name, email, profile, postText, titleText, address} = postInfo;
  
  // 전달된 body데이터에서 이미지데이터를 추출
  const imageDataArray = postInfo.imageData;
  console.log(postInfo.address);
  try{
    if(!imageDataArray || !Array.isArray(imageDataArray)){
      return res.status(400).json({message:"이미지 데이터가 없습니다."});
    }

    // 이미지 경로를 저장할 변수선언
    const savedPath = [];

    // 서버 디렉토리에 이미지를 저장하는 반복문
    imageDataArray.map((base64String,index) => {
      // base64 헤더 제거
      const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
      const extension = base64String.match(/^data:image\/(\w+);base64/)[1]; // 예: jpeg, png
      const buffer = Buffer.from(base64Data, 'base64');

      // 저장 경로 및 파일명 지정
      const koreaTimestamp = dayjs().tz('Asia/Seoul').format('YYYYMMDDHHmmssSSS');
      const filename = `PostImage_${koreaTimestamp}_${index}.${extension}`;
      const filePath = path.join(__dirname, '../uploads/posts', filename);

      // 저장된 파일 경로 기록
      savedPath.push(`${process.env.SERVER_URL}/images/posts/${filename}`);

      // 파일저장
      fs.writeFileSync(filePath, buffer);
    });

    console.log("image저장 성공!",savedPath);
    if(savedPath.length > 0){
      const [galleryResult] = await db.query(`
        INSERT INTO gallery ( user_id, username, title, text, profile_image, location )
        VALUES (?,?,?,?,?,?)  
      `,[id,email,titleText,postText,profile,address[0]]);
      
      // 데이터가 삽입된 게시글 ID를 저장
      const galleryID = galleryResult.insertId;

      const insertPromise = savedPath.map((path, index)=>{
        return db.query(`
          INSERT INTO gallery_image ( image_url, description )
          VALUES (?,?)  
        `,[path,postInfo.address[index]]);
      });

      const results = await Promise.all(insertPromise);
      const imageID = results.map(([result])=> (result.insertId));

      // 결과 값이 정렬순서가 섞일 수 있어서 다시 정렬
      const sortImageId = imageID.sort((a,b)=>a-b);

      // 게시글과 이미지를 연결
      const insertPromise2 = sortImageId.map((imageID,index)=>{
        return db.query(`
        INSERT INTO gallery_image_relation ( gallery_id, gallery_image_id, display_order )
        VALUES (?,?,?)   
      `,[galleryID,imageID,index + 1]);
      });

      const results2 = await Promise.all(insertPromise2);

      console.log("이미지연결 결과:",results2);
      console.log("삽입된 이미지아이디",sortImageId);
      console.log("삽입할 정보:",postInfo);
      console.log("삽입된 게시글 아이디",galleryID);
    }

    res.status(200).json({result:true});
  }catch(error){
    console.log(error);
    res.status(500).json({message:error})
  }
}