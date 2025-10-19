//client/src/componant/community/api/friendListAPI.js

import axios from 'axios';

export const fetchList = async (listType,userName,searchKeyWord = "") => {

  //가져올 데이터 타입
  const status = {
    // 친구리스트
    "friendList" : "accepted",
    // 차단리스트
    "blockList" : "blocked",
    // 채팅리스트
    "chattingList" : "chatting"
  };

  console.log("친구리스트 요청중 : home",userName);

  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/${listType}?username=${userName}&status=${status[listType]}&searchKeyWord=${searchKeyWord}`);
    return response.data;
  } catch (error) {
    console.error('친구목록 불러오기 실패', error);
    return [];
  }
}; 
