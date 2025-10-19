//client/src/componant/community/api/actionList.js
import axios from "axios";


export const actionList = async (actionType, userID)=>{
    //요청한 동작
    const Action = {
        "AddBlocked" : "blocked",
        "RemoveBlocked" : "accepted"
    }

    try{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/${actionType}`,{
            // 요청받은 유저 ID
            requestID : userID,
            // 요청받은 값
            requestValue : Action[actionType],
        })
        return response.data;
    }catch(error){
        console.error("Action 반영 실패:", error, {userID : userID});
        return null;
    }
}