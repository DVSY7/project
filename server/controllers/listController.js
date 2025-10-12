// server/controllers/listController.js

const db = require('../config/db');

exports.createList = async (req, res) => {
  try {
    // 데이터베이스 연결 테스트
    try {
      await db.query('SELECT 1');
    } catch (dbError) {
      console.error('데이터베이스 연결 오류:', dbError);
      return res.status(500).json({
        success: false,
        message: '데이터베이스 연결에 실패했습니다.',
        error: dbError.message
      });
    }

    // 요청에서 값 꺼내기
    const {
      userID,
      title,
      description,
      isPlanned,
      interest,
      maxParticipants,
      isOffline,
      isGroup,
      tags,
      days,
      endDate,
      meetPlace,
      budget,
      periodStartDate,
      periodEndDate,
      
    } = req.body;

    // 필수 필드 검증
    if (!title || !description || !interest) {
      return res.status(400).json({
        success: false,
        message: '필수 필드가 누락되었습니다.'
      });
    }

    // 리스트 생성 쿼리
    const query = `
      INSERT INTO lists (user_id, title, text, is_planned, interest, max_participants, is_offline, is_group, end_date, meet_place, budget, period_start_date, period_end_date)
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?, ?)
    `;

    try {
      const [result] = await db.query(query, [
        userID,
        title,
        description,
        isPlanned ? 1 : 0,
        interest,
        maxParticipants || 1,
        isOffline ? 1 : 0,
        isGroup ? 1 : 0,
        endDate,
        meetPlace,
        budget,
        periodStartDate,
        periodEndDate
      ]);

      const listId = result.insertId;

      // 일차 저장
      for (const day of days) {
        if (!day.dayNumber || !Array.isArray(day.items)) {
          continue;
        }

        const [dayResult] = await db.query(
          `INSERT INTO list_days (list_id, day_number) VALUES (?, ?)`,
          [listId, day.dayNumber]
        );

        const dayId = dayResult.insertId;

        // 각 항목 저장
        for (const item of day.items) {
          if (!item.type) continue;

          const itemQuery = `
            INSERT INTO list_items (
              day_id,
              item_type,
              description,
              image_url,
              address,
              category,
              phone,
              place_url,
              display_order
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          await db.query(itemQuery, [
            dayId,
            item.type,
            item.description || '',
            item.type === 'image' ? item.image : null,
            item.type === 'place' ? item.address : null,
            item.type === 'place' ? item.category : null,
            item.type === 'place' ? item.phone : null,
            item.type === 'place' ? item.placeUrl : null,
            item.displayOrder || 0
          ]);
        }
      }

      if(result.affectedRows){
        // 리스트가 생성되면 방금 생성된 리스트의 아이디를 가져옴
        const [listID] = await db.query(`
          SELECT list_id FROM lists
          ORDER BY created_at DESC
          `)

        // 리스트가 생성되면 채팅방을 생성
        await db.query(`
          INSERT INTO chat_rooms ( chat_room_id, title, theme, owner_id, current_members, max_members)
          VALUES (?,?,?,?,1,?)
        `,[listID[0].list_id, title, interest, userID, maxParticipants]);

        // 생성된 채팅방 아이디를 가져옴
        const [chat_room_id] = await db.query(`
          SELECT cr.chat_room_id FROM chat_rooms cr
          JOIN lists l ON cr.title = l.title AND cr.owner_id = l.user_id AND cr.created_at = l.created_at
          WHERE cr.title = ? AND cr.owner_id = ?
          ORDER BY cr.created_at DESC LIMIT 1
          `,[title, userID]);

        // 채팅방과 유저를 연결
        await db.query(`
          INSERT IGNORE INTO user_rooms ( user_id, chat_room_id, is_active )
          VALUES (?,?,1),(?,?,0)
        `,[userID, chat_room_id[0].chat_room_id,55, chat_room_id[0].chat_room_id]);

        // 생성된 리스트와 유저를 연결
        await db.query(`
          INSERT INTO list_relation ( list_id, user_id )
          VALUES (?,?)  
        `,[listID[0].list_id, userID]);

        // 생성된 채팅방에 시스템 메세지를 보냄
        await db.query(`
          INSERT INTO messages ( chat_room_id, sender_id, content )
          VALUES (?,?,?)
          `,[chat_room_id[0].chat_room_id,55,`<시스템>\n[${title}] 채팅방이 생성되었습니다.\n 계획을 토론해보세요.`]);
      }

      // 태그 저장
      if (tags && tags.length > 0) {
        for (const tagName of tags) {
          if (!tagName) continue;
          await db.query(
            `INSERT INTO list_tags (list_id, tag_name) VALUES (?, ?)`,
            [listId, tagName]
          );
        }
      }

      res.status(201).json({
        success: true,
        message: '리스트가 성공적으로 생성되었습니다.',
        listId
      });

    } catch (queryError) {
      console.error('쿼리 실행 오류:', queryError);
      return res.status(500).json({
        success: false,
        message: '데이터베이스 쿼리 실행 중 오류가 발생했습니다.',
        error: queryError.message
      });
    }

  } catch (error) {
    console.error('리스트 생성 중 오류 발생:', error);
    res.status(500).json({
      success: false,
      message: '리스트 생성 중 오류가 발생했습니다.',
      error: error.message
    });
  }
};