// server/controller/authController

require('dotenv').config({ path: '../config/.env' });
const qs = require('qs');
const axios = require('axios');
const {signupCheck} = require('../function/signup');
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_SECRET_KEY = process.env.NAVER_SECRET_KEY;



exports.kakaoLogin = async (req, res) => {
    const { code } = req.body;
    console.log(code)
    console.log('카카오 요청 URL:', REDIRECT_URL);
    try {
        // 카카오 토큰 요청
        const tokenResponse = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            qs.stringify({
                grant_type: 'authorization_code',
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URL,
                code: code,
            }),
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            }
        );

        const { access_token } = tokenResponse.data;

        console.log("카카오에서 발급 받은 토큰 : ", access_token);

        // 사용자 정보 요청
        const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const kakaoAccount = userInfoResponse.data.kakao_account;

        console.log("카카오 로그인 성공!", { user: kakaoAccount })

        // ✅ DB 사용자 등록/조회 로직이 들어가야 합니다.
        // 중복확인 (없으면 회원가입 처리/ 있으면 로그인 처리)
        const kakaoId = `KAKAO_${userInfoResponse.data.id}`;
        const email = kakaoAccount.email;
        const name = kakaoAccount.profile?.nickname;

         // 토큰과 중복처리를 한번에 하는 함수 (function/signup.js)
        const token = await signupCheck(kakaoId,email,name,email);

        res.status(200).json({ user: kakaoAccount, token });

    } catch (error) {
        console.error('카카오 로그인 오류:', error.response?.data || error.message);
        res.status(500).json({ message: '카카오 로그인 실패' });
    }
};

exports.naverLogin = async (req, res) => {
    const { code, state } = req.body;

    try {
        // access token 요청
        const tokenResponse = await axios.get(`https://nid.naver.com/oauth2.0/token`,{
            params:{
                grant_type: 'authorization_code',
                client_id: NAVER_CLIENT_ID,
                client_secret: NAVER_SECRET_KEY,
                code,
                state,
            },
        });
        // token확인
        const accessToken = tokenResponse.data.access_token;

        console.log(accessToken);

        // 사용자 정보 요청
        const profileResponse = await axios.get(`https://openapi.naver.com/v1/nid/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const profile = profileResponse.data;
        // 사용자 정보 확인하기
        console.log(`네이버 사용자 정보: `, profile);
        // db에 등록할 내용
        const naverId = `NAVER_${profile.response.id}`;
        const email = profile.response.email;
        const name = profile.response.name;

        // 토큰과 중복처리를 한번에 하는 함수 (function/signup.js)
        const token = await signupCheck(naverId,email,name,email);        

        res.status(200).json({ user: profile, token: token });

    }catch(error){
        console.error("네이버 로그인 중 에러:", error);
        return res.status(500).json({message: "서버 오류 발생:", error});
    }

}