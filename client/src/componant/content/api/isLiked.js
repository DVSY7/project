// /api/isLiked.js

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
