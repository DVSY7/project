//client/src/componant/content/api/isLiked.js

import axios from "axios";

// 좋아요 표시 불러오기
export const fetchIsLiked = async (galleryID, userID) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/isLiked?galleryID=${galleryID}&userID=${userID}`);
    const data = res.data;
    console.log("data는?",data);
    return data.liked;
  } catch (error) {
    console.error("fetchIsLiked 오류:", error);
    return false;
  }
};

// 좋아요 표시 저장
export const likesHandler = async (requests,galleryID, userID) =>{
  try{
    const res = await axios.get(`http://localhost:5000/api/users/likesHandler?requests=${requests}&galleryID=${galleryID}&userID=${userID}`);
    return res.data;
  }catch(error){
    return null;
  }
}

// 좋아요 수 불러오기
export const fetchLikes = async (galleryID) =>{
  try{
    const res = await axios.get(`http://localhost:5000/api/likes?galleryID=${galleryID}`);
    return res.data[0].likes;
  }catch(error){
    return null;
  }
}

// 댓글 좋아요 동작처리
export const updateCommentLikes = async (commentID, userID, isliked) => {
  try{
    await axios.post(`http://localhost:5000/api/users/gallery/updateCommentLikes`,{
      commentID,
      userID,
      isliked
    })
    return {Message:"댓글 좋아요 처리 성공"};
  }catch(error){
    return {Message:"댓글 좋아요 처리 실패"};
  }
}

