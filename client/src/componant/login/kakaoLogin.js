export default function KakaoLogin() {

    // 버튼요소 클레스
    const button_element = 'w-48 h-8 rounded-md sm:w-[15rem] font-bold';


    // kakao 로그인 버튼 함수
    const REST_API_KEY = 'f6badfb7692d7ca2cbf9febe90105836';
    const REDIRECT_URL = 'http://localhost:3000/auth/kakao/callback';

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

    const kakaoLogin = (e) => {
        e.preventDefault();
        window.location.href = kakaoURL;
        console.log(kakaoURL);
    };


    return (
        <>
            {/* 카카오로그인 버튼 */}
            <button
                onClick={kakaoLogin}
                className={`${button_element} flex relative justify-center items-center bg-[#FFEB00] w-60 font-bold font-sans text-black `}
            >
                <img
                    src="/images/카카오버튼.png"
                    alt="카카오버튼"
                    className={'h-full absolute sm:left-14 left-8'}
                ></img>
                Kakao
            </button>
        </>
    )
}