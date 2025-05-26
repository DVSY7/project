//client/src/componant/content/api/gallery.js

import axios from 'axios';

export async function galleryfetch(page = 1, limit = 15, sort, searchUser) {
    let isSort = 'date DESC';
    let isUser = "";

    if(sort === "최신순"){
        isSort = 'date DESC';
    }else if(sort === "지난순"){
        isSort = 'date ASC';
    }else if(sort === "조회순"){
        isSort = 'views DESC';
    }else if(sort === "인기순"){
        isSort = 'likes DESC';
    }


    console.log(isSort);

    try {
        const response = await axios.get(
            `http://localhost:5000/api/gallery?page=${page}&limit=${limit}&sort=${isSort}&searchUser=${searchUser}`
        );
        // response.data = [{ id, username, …, thumbnail_url }, …]
        return response.data;
    } catch (error) {
        console.error("갤러리 데이터 요청 실패:", error);
        return [];
    }
}