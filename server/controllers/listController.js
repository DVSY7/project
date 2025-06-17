// server/controllers/listController.js

const db = require('../config/db');

exports.createList = async (req, res) => {
  try{
    // 요청에서 값 꺼내기
    const {
      title,
      description,
      isPlanned,
      interest,
      maxParticipants,
      isOffline,
      isGroup,
      tags,
      days
    } = req.body;

    // 리스트 생성 쿼리
    const query = `
      INSERT INTO lists (title, text, isPlanned, interest, max_participants, is_offline, is_group, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
     `;

     const [result] = await db.query(query, [
      title,
      description,
      isPlanned,
      interest,
      maxParticipants,
      isOffline,
      isGroup,
     ]);

     const listId = result.insertId;

     //일차 저장
     for (const day of days) {
      const [dayResult] = await db.query(
        `INSERT INTO list_days (list_id, day_number) VALUES (?, ?)`,
        [listId, day.dayNumber]
      );

      const dayId = dayResult.insertId;

      // 각 항목 저장
      for(const item of day.items) {
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

        // 항목 타임 이미지: url , 장소: 주서, 전화번호, url 함꼐 저장
        await db.query(itemQuery, [
          dayId,
          item.type,
          item.description,
          item.type === 'image' ? item.image : null,
          item.type === 'place' ? item.address : null,
          item.type === 'place' ? item.category : null,
          item.type === 'place' ? item.phone : null,
          item.type === 'place' ? item.placeUrl : null,
          item.displayOrder || 0
        ]);
      }
     }

     // 태그 저장
     if (tags && tags.length > 0) {
      for (const tagName of tags) {
        await db.query(
          `INSERT INTO list_tags (list_id, tag_name) VALUES (?,?)`,
          [listId,tagName]
        );
      }
    }
    
    //  클라이언트에 201 Created 응답과 함께 겨로가를 보냄
    res.status(201).json({
      success: true,
      message: '리스트가 성공적으로 생성되었습니다.',
      listId
    });
    // 에러가 발생 시 500 응담을 보냄  
  } catch (error) {
    console.error('리스트 생성 중 오류 발생:', error);
    res.status(500).json({
      success: false,
      message: '리스트 생성 중 오류가 발생했습니다.'
    });
  }
};