//client/src/componant/content/api/search.js

import axios from "axios";

export const fetchSearchModal = async (searchValue)=>{
    try{
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/searchModal`,{
            searchValue,
        })
        return res.data;
    }catch(error){
        return [];
    }
    }