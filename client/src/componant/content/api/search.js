//client/src/componant/content/api/search.js

import axios from "axios";

export const fetchSearchModal = async (searchValue)=>{
    try{
        const res = await axios.post(`https://bucketmate.onrender.com/api/searchModal`,{
            searchValue,
        })
        return res.data;
    }catch(error){
        return [];
    }
    }