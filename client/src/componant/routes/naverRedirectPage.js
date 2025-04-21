// client/src/componant/routes/NaverRedirectPage.js

import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

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
          const response = await axios.post('http://localhost:5000/auth/naver/token', {
            code,
            state,
          });

          console.log("네이버 토큰 응답:", response.data.token);
          localStorage.setItem("token", response.data.token);
          window.location.href = '/home';
        } catch (error) {
          console.error("네이버 토큰 요청 실패:", error);
        }
      };

      getNaverToken();
    }
  }, [searchParams]);

  return <div>네이버 로그인 처리 중입니다...</div>;
}
