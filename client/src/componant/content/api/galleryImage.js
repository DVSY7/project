//client/src/componant/content/api/galleryImage.js

import axios from 'axios';

export async function galleryImageFetch(galleryID){
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/galleryImage?galleryID=${galleryID}`
        );
        return response.data;
    }catch (error) {
        console.error("갤러리 이미지 요청 실패:", error);
        return [];
    }
}