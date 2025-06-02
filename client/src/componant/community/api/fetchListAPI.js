//client/src/componant/community/api/friendListAPI.js

import axios from 'axios';

export const fetchList = async (listType,userName) => {

  //가져올 데이터 타입
  const status = {
    // 친구리스트
    "friendList" : "accepted",
    // 차단리스트
    "blockList" : "blocked",
    // 채팅리스트
    "chattingList" : "chatting"
  };

  try {
    const response = await axios.get(`http://localhost:5000/api/${listType}?username=${userName}&status=${status[listType]}`);
    return response.data;
  } catch (error) {
    console.error('친구목록 불러오기 실패', error);
    return [];
  }
}; 
