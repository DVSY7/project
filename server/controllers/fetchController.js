// server/controllers/fetchController.js
const db = require('../config/db'); // DB 연결 설정

// 갤러리 데이터 가져오기
exports.gallery = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const sort = req.query.sort;
        const offset = (page - 1) * limit;
        const searchUser = req.query.searchUser || '';
        const likeUser = `%${searchUser}%`;

        const [rows] = await db.query(`
       SELECT 
         g.id, g.username, g.title, g.date, g.profile_image,
         g.likes, g.views, g.location,
         gi.image_url AS thumbnail_url
       FROM gallery g
       JOIN gallery_image_relation gir
         ON g.id = gir.gallery_id AND gir.display_order = 1
       JOIN gallery_image gi
         ON gir.gallery_image_id = gi.id
       WHERE g.is_public = 1 AND g.username LIKE ?
       ORDER BY g.${sort} 
      LIMIT ? OFFSET ?
     `, [likeUser, limit, offset]);
     console.log(sort);

        return res.status(200).json(rows);
    } catch (error) {
        console.error('갤러리 데이터 요청 실패:', error);
        return res.status(500).json({ message: '갤러리 데이터 요청 에러' });
    }
};

// 갤러리 이미지 데이터 가져오기
exports.galleryImage = async (req, res) => {
    try{
        const galleryID = req.query.galleryID;
        const [rows] = await db.query(`
          SELECT gi.image_url FROM gallery_image gi
            JOIN gallery_image_relation gir
            ON gi.id = gir.gallery_image_id
            JOIN gallery g
            ON gir.gallery_id = g.id
            WHERE g.id = ?`, [galleryID]);
        console.log('갤러리 이미지 요청:', rows);
        return res.status(200).json(rows);
    }catch (error){
      console.error('갤러리 이미지 요청 실패:', error);
      return res.status(500).json({ message: '갤러리 이미지 요청 에러' });
    }
}

// 커뮤니티 친구목록 가져오기
exports.friendList = async (req, res) => {
  try{
    const userName = req.query.username;
    const status = req.query.status;

    const [rows] = await db.query(`
      SELECT f.friend_id, p.profile_image_url, u.name FROM friends f
      JOIN users me 
      ON f.user_id = me.id
      JOIN users u
      ON f.friend_id = u.id
      JOIN profiles p
      ON u.id = p.user_id
      WHERE me.username = ? and f.status = ?`,[userName, status]);
      return res.status(200).json(rows);
  }catch(error){
    console.error('친구목록 요청 실패:', error);
    return res.status(500).json({message: '갤러리 이미지 요청 에러'});
  }
}

// 채팅목록 가져오기
exports.chattingList = async (req, res) =>{
  try{
    const userName = req.query.username;

    if(!userName){
      return res.status(200).json([]);
    }

    const [userRows] = await db.query(`
      SELECT u.id FROM users u
      WHERE u.username = ?
      `,[userName]);
    const userID = userRows[0].id;

    const [rows] = await db.query(`
      WITH last_messages AS (
        SELECT
        message_id,
        chat_room_id,
        content,
        sender_id,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY chat_room_id ORDER BY created_at DESC) AS rn
        FROM messages
      ),
      unread_counts AS (
        SELECT
          m.chat_room_id,
          COUNT(*) AS unread_count
        FROM messages m
        LEFT JOIN message_reads mr
          ON m.message_id = mr.message_id AND mr.user_id = ?
        WHERE mr.message_id IS NULL -- 읽지 않은 메세지
        GROUP BY m.chat_room_id
      ),
      sender_info AS (
        SELECT 
          lm.sender_id AS sender_id,
          u.name AS sender_name,
          p.profile_image_url AS sender_profile_image_url
        FROM last_messages lm
        LEFT JOIN users u
          ON lm.sender_id = u.id
        LEFT JOIN profiles p
          ON lm.sender_id = p.user_id
        WHERE lm.rn = 1
      )

      SELECT DISTINCT
        cr.chat_room_id,
        cr.title,
        cr.theme,
        cr.max_members,
        cr.current_members,
        cr.owner_id,
        ou.name AS owner_name,
        lm.sender_id,
        si.sender_name,
        si.sender_profile_image_url,
        p.profile_image_url,
        lm.content AS last_message,
        lm.created_at AS last_message_time, -- 마지막 메세지 시간
        COALESCE(uc.unread_count, 0) AS unread_count -- 읽지 않은 메세지 수
      FROM user_rooms ur
      JOIN chat_rooms cr ON ur.chat_room_id = cr.chat_room_id
      LEFT JOIN last_messages lm ON cr.chat_room_id = lm.chat_room_id AND lm.rn = 1
      LEFT JOIN profiles p ON cr.owner_id = p.user_id
      LEFT JOIN users ou ON ou.id = cr.owner_id
      LEFT JOIN sender_info si ON si.sender_id = lm.sender_id
      LEFT JOIN unread_counts uc ON cr.chat_room_id = uc.chat_room_id
      WHERE ur.user_id = ? AND ur.is_active = 1;
      `, [userID, userID, userID]);

    console.log("채팅목록 요청 중 : ",userID);
    return res.status(200).json(rows);
  }catch(error){
    console.error("채팅목록 요청 실패:",error);
    return res.status(500).json({message:"채팅목록 요청 오류"});
  }
}

// 친구관리 Action 반영하기
exports.ActionList = async (req, res) => {
  try{
    const userID = req.body.requestID;
    const data = req.body.requestValue;

    console.log({"요청받은 유저":userID, "요청받은 값" : data});
    await db.query(`
      UPDATE friends f
      JOIN users u
      ON f.friend_id = u.id
      SET f.status = ?
      WHERE f.friend_id = ?
      `,[data,userID]);
    return res.status(200).json({message : "요청처리 완료!"})

  }catch(error){
    console.log("Action 실패 : ", error);
    return res.status(500).json("Action 요청 실패");
  }
}

// 채팅 가져오기
exports.chatMessage = async (req, res) =>{

  // 필요한정보
  // profile
  // datetime
  // username
  // message

  try{
    const chatroomID = req.query.chatroom;
    
    const [rows] = await db.query(`
      SELECT 
      u.name AS name,
      u.id AS friend_id,
      p.profile_image_url AS profile_image_url,
      m.created_at AS datetime,
      m.content AS message
      FROM users u
      JOIN profiles p
      ON u.id = p.user_id
      JOIN messages m
      ON m.sender_id = u.id
      WHERE m.chat_room_id = ?
      `,[chatroomID]);
    console.log("메시지 요청 성공! : ",rows);

    if(rows.length === 0){
      return res.status(200).json([]);
    }

    return res.status(200).json(rows);
  }catch(error){
    console.log("메세지 요청 실패:",error);
    return res.status(500).json({"메세지 요청 에러":error});
  }
}