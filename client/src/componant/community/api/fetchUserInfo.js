//client/src/componant/community/api/fetchUserInfo.js

import axios from "axios";

export const fetchUserInfo = async (userName) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userInfo?username=${userName}`);
        return response.data;
    }catch(error){
        console.error("정보 불러오기 실패:", error);
        return null;
    }
}