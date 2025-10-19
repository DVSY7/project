// client/src/componant/routes/NaverRedirectPage.js

import axios from 'axios';
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export default function NaverRedirectPage() {
  const [searchParams] = useSearchParams();
  const calledRef = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    console.log('네이버에서 받은 code:', code);
    console.log('네이버에서 받은 state:', state);

    if (code && state && !calledRef.current) {
      calledRef.current = true;

      const getNaverToken = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/naver/token`, {
            code,
            state,
          });

          console.log("네이버 토큰 응답:", response.data.token);
          localStorage.setItem("token", response.data.token);
          window.location.href = '/home';
        } catch (error) {
          if(error.status === 409){
            alert("이미 등록된 사용자 입니다. 로그인을 진행해주세요.");
            window.location.href='/';
          }
          console.error("네이버 토큰 요청 실패:", error);
        }
      };

      getNaverToken();
    }
  }, [searchParams]);

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
