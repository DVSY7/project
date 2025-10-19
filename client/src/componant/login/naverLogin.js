export default function NaverLogin() {
    // 버튼 요소 클래스
    const button_element = 'w-48 h-8 rounded-md sm:w-[15rem] font-bold';
  
    // 네이버 로그인 기본 설정
    const CLIENT_ID = '4Dz2Y9Ovs8NYRENEZDMq';
    const REDIRECT_URI = `${process.env.REACT_APP_CLIENT_URL}/auth/naver/callback`;
    const STATE = 'RANDOM_STATE_STRING';

    const naverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
  
    const naverLogin = (e) => {
      e.preventDefault();
      window.location.href = naverURL;
      console.log(naverURL);
    };
  
    return (
      <>
        {/* 네이버 로그인 버튼 */}
        <button
          onClick={naverLogin}
          className={`${button_element} flex relative justify-center items-center bg-[#03C75A] w-60 font-bold font-sans text-white`}
        >
          <img
            src="/images/네이버버튼.png"
            alt="네이버버튼"
            className={'h-full absolute sm:left-14 left-8'}
          />
          Naver
        </button>
      </>
    );
  }
  