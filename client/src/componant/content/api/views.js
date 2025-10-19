//client/src/componant/content/api/views.js
import axios from "axios";

export const updateViews =  async (postID, userID, toDayDate) =>{
    try{
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/views/?postID=${postID}&userID=${userID}&toDayDate=${toDayDate}`);
        return res.data.views;
    }catch(error){
        return 0;
    }
}