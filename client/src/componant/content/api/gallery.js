//client/src/componant/content/api/gallery.js

import axios from 'axios';

// 게시글 정보 불러오기
export async function galleryfetch(page = 1, limit = 15, sort, searchUser) {
    let isSort = 'date DESC';

    if(sort === "최신순"){
        isSort = 'date DESC';
    }else if(sort === "지난순"){
        isSort = 'date ASC';
    }else if(sort === "조회순"){
        isSort = 'views DESC';
    }else if(sort === "인기순"){
        isSort = 'likes DESC';
    }


    console.log(isSort);

    try {
        const response = await axios.get(
            `https://bucketmate.onrender.com/api/gallery?page=${page}&limit=${limit}&sort=${isSort}&searchUser=${searchUser}`
        );
        // response.data = [{ id, username, …, thumbnail_url }, …]
        return response.data;
    } catch (error) {
        console.error("갤러리 데이터 요청 실패:", error);
        return [];
    }
}

// 게시글 댓글 불러오기
export const fetchComment = async (galleryID, userID) =>{
    try{
        if(galleryID){
            const res = await axios.get(`https://bucketmate.onrender.com/api/gallery/comments?galleryID=${galleryID}&userID=${userID}`);
            console.log("정상적으로 실행중");
            return res.data;
        }
        console.log("아이디가 존재하지 않음");
    }catch(error){
        return {message:"댓글불러오기 실패:",error};
    }
}

// 게시글 댓글 저장
export const updateComment = async(galleryID, userID, commentText) =>{
    try{
        const res = await axios.post(`https://bucketmate.onrender.com/api/users/gallery/updateComment`,{
            galleryID,
            userID,
            commentText
        });
        console.log("댓글저장중...");
        return res.data;
    }catch(error){
        console.error("댓글 저장 실패:",error);
        return {message:error};
    }
}