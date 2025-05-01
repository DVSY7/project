// client/src/componant/content/utilities/search.js

import axios from "axios";

export async function search(searchData){

    try{
        const response = await axios.post('http://localhost:5000/api/search',{
            searchQuery: searchData,
        });

        console.log('응답 데이터 : ',response.data.data);
        return response.data

    }catch(error){
        console.error('요청 데이터 오류: ',error);
    }
    
}