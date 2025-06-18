//client/src/componant/content/api/isLiked.js

import axios from "axios";

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

export const likesHandler = async (requests,galleryID, userID) =>{
  try{
    const res = await axios.get(`http://localhost:5000/api/users/likesHandler?requests=${requests}&galleryID=${galleryID}&userID=${userID}`);
    return res.data;
  }catch(error){
    return null;
  }
}

export const fetchLikes = async (galleryID) =>{
  try{
    const res = await axios.get(`http://localhost:5000/api/likes?galleryID=${galleryID}`);
    return res.data[0].likes;
  }catch(error){
    return null;
  }
}

