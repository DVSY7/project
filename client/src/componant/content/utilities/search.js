// client/src/componant/content/utilities/search.js

import axios from "axios";

export async function search(searchData){

    const searchParams = await axios.post('http://localhost:5000/api/search',{
        searchQuery: searchData,
    });
    
}