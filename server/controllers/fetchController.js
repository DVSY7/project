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