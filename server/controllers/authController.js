// server/controller/authController

require('dotenv').config({ path: '../config/.env' });
const qs = require('qs');
const axios = require('axios');
const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const REDIRECT_URL = process.env.KAKAO_REDIRECT_URL;



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
        console.log('userInfoResponse 정보:', userInfoResponse.data);

        console.log("kakaoAcount 정보: ", kakaoAccount);


        // const userEmail = kakaoAccount.email;

        // // ⚠️ null 체크 추가
        // if (!kakaoAccount || !kakaoAccount.email) {
        //     return res.status(400).json({ message: "카카오 계정에 이메일 정보가 없습니다." });
        // }

        console.log("카카오 로그인 성공!", { user: kakaoAccount });

        // ✅ 여기에서 토큰 생성 및 DB 사용자 등록/조회 로직이 들어가야 합니다.
        res.status(200).json({ user: kakaoAccount });

    } catch (error) {
        console.error('카카오 로그인 오류:', error.response?.data || error.message);
        res.status(500).json({ message: '카카오 로그인 실패' });
    }
};

