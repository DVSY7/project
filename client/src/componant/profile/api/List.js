import axios from "axios";


// 리스트 정보 불러오기
export const fetchListInfo = async(urlUserID,currentUserID)=>{
    try{
        if(urlUserID){
            const res = await axios.post(`http://localhost:5000/api/listInfo`,{ urlUserID,currentUserID });
            return res.data;
        }
    }catch(error){
        console.log("리스트 정보 불러오기 오류:",error);
        return;
    }
}

// 북마크 변경 요청
export const bookmarkChange = async(listID, userID, isBookmark) => {
    try{
        // 북마크 변경 정보가 모두 있으면 요청을 보냄
        if(listID && userID){
            const res = await axios.post(`http://localhost:5000/api/users/bookmark`,{listID,userID,isBookmark})
            console.log("북마크 변경 중",res);
            return res;
        }
    }catch(error){
        // 에러발생
        console.log("북마크 변경 실패");
        return;
    }
}

// 리스트 참여하기
export const addUserRoom = async(listID, userID) =>{
    console.log(userID,listID);
    if(userID && listID){
        try{
            const res = await axios.post(`http://localhost:5000/api/users/addUserRoom`,{listID,userID});
            return res.data;
        }catch(error){
            return 0;
        }
    }
}