import axios from "axios";

export const fetchUserID = async (name)=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userID?name=${name}`);
        console.log("데이터 요청중:",response.data[0].id);
        return response.data;
    }catch(error){
        console.log("데이터 요청 실패");
        return [];
    }
    
}