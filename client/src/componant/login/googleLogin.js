import React from 'react';

export default function GoogleLogin() {
  // 버튼 요소 클래스
  const button_element = 'w-48 h-8 rounded-md sm:w-[15rem] font-bold';

  // 구글 로그인 기본 설정
  const CLIENT_ID = '346251693294-hhgrlj2rdttkktte5hklbc23pnv17afl.apps.googleusercontent.com';
  const REDIRECT_URI = 'http://bucketmate.vercel.app/auth/google/callback';
  const STATE = 'RANDOM_STATE_STRING';
  const SCOPE = encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');

  // 구글 로그인 URL 생성
  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}&access_type=offline&prompt=consent`;

  const googleLogin = (e) => {
    e.preventDefault();
    window.location.href = googleURL;
    console.log(googleURL);
  };

  return (
    <>
      {/* 구글 로그인 버튼 */}
      <button
        onClick={googleLogin}
        className={`${button_element} flex relative justify-center items-center bg-[#F2F2F2] w-60 font-bold font-sans text-black`}
      >
        <img
          src="/images/구글버튼.png"
          alt="구글 로그인 버튼"
          className="h-full absolute sm:left-14 left-8"
        />
        Google
      </button>
    </>
  );
}
