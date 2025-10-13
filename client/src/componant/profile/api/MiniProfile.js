//client/src/componant/profile/api/miniProfile.js

import axios from "axios";

export const fetchMiniProfileInfo = async (userID)=>{
    try{
        const res = await axios.post(`https://bucketmate.onrender.com/api/profile/miniProfile`,{
            userID,
        })
        return res.data;
    }catch(error){
        return;
    }
}