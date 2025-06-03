//client/src/componant/community/api/fetchMessageAPI.js

import axios from 'axios';

export const fetchMessageAPI = async (chatroomID)=>{
    const response = await axios.get(`http://localhost:5000/api/chatmessage?chatroom=${chatroomID}`);
    return response.data;
}
