//client/src/componant/community/api/fetchUserInfo.js

import axios from "axios";

export const fetchUserInfo = async (userName) =>{
    try{
        const response = await axios.get(`http://localhost:5000/api/userInfo?username=${userName}`);
        return response.data;
    }catch(error){
        console.error("정보 불러오기 실패:", error);
        return null;
    }
}