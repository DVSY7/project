//client/src/componant/api/createPost.js
import axios from "axios";

export const createPost = async (postInfo)=>{
    try{
        const res = await axios.post(`http://localhost:5000/api/users/createPost`,{
            postInfo,
        })
        return res.data;
    }catch(error){
        return ({message:error});
    }
}