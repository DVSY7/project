// client/src/componant/routes/kakaoRedirectPage.js

import axios from 'axios';
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";


export default function KakaoRedirectPage(){
    const [searchParams] = useSearchParams();
    const calledRef = useRef(false);
    
    useEffect(()=> {
        // url에서 code값 추출
        const code = searchParams.get('code');
        console.log('카카오에서 받은 code: ', code);
         if(code && !calledRef.current){
            calledRef.current = true;
            // 백엔드로 code를 보내서 토큰 요청
            const getToken = async () =>{
               try{
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/kakao/token`,{
                    code: code, // code값을 body로 전송
                });

                console.log("토큰 응답:", response.data.token);
                localStorage.setItem("token", response.data.token);
                window.location.href = '/home';
               }catch(error){
                console.error("카카오 토큰 요청 실패: ", error);
               }
            };
            getToken(); // 함수 호출
         }
    },[searchParams]);

    return <div className="flex justify-center items-center h-screen">
                <div
                    className={`w-32 h-32 border-8 border-blue-500 border-t-gray-300 rounded-full spin`}
                > 
                </div>
                <div className="absolute text-[22px] font-bold">로딩중
                    <div className="flex justify-center gap-1">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            </div> 
}
