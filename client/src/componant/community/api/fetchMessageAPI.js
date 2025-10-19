//client/src/componant/community/api/fetchMessageAPI.js

import axios from 'axios';

export const fetchMessageAPI = async (chatroomID,type)=>{
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${type}?chatroom=${chatroomID}`);
    return response.data;
}

export const fetchMessageReadAPI = async (userID,messageID) =>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/messageRead?userID=${userID}&messageID=${messageID}`);
        return response.data;
    }catch(error){
        console.error("메세지 읽음 요청 실패:",error);
        return null;
    }
}
