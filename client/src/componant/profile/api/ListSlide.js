//client/src/componant/profile/api/ListSlide.js
import axios from "axios";

export const fetchListSlides = async ( listID ) => {
    try{
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/lists/slides`, {
            listID: listID
        });
        return response.data;
    }catch(error){
        console.error("서버응답 오류",error);
        return null;
    }
}