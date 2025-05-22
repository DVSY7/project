//client/src/componant/content/api/gallery.js

import axios from 'axios';

export async function galleryfetch(page = 1, limit = 15) {
    try {
        const response = await axios.get(
            `http://localhost:5000/api/gallery?page=${page}&limit=${limit}`
        );
        // response.data = [{ id, username, …, thumbnail_url }, …]
        return response.data;
    } catch (error) {
        console.error("갤러리 데이터 요청 실패:", error);
        return [];
    }
}