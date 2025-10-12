import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

export default function GoogleRedirectPage(){
    const [searchParams] = useSearchParams();
    const calledRef = useRef(false);

    useEffect(()=> {
        //URL에서 code 추출
        const code = searchParams.get('code')
        console.log('구글에서 받은 code : ', code);

        if(code && !calledRef.current){
            calledRef.current = true;
            const getToken = async () => {
                try{
                    const response = await axios.post('https://bucketmate.onrender.com/auth/google/token',{
                        code:code // code를 백엔드로 전달
                    });
                    console.log("구글 토큰 응답:", response.data.token);
                    localStorage.setItem("token", response.data.token);
                    window.location.href = '/home';
                }catch(error){
                    console.log("구글 토큰 요청 실패:", error);
                }
            };
            getToken();
        }
    }, [searchParams])

    return (
        <>
            <div>구글 로그인 중...</div>
        </>
    )
}