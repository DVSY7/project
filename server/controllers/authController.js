// server/controller/authController

require('dotenv').config({ path: '../config/.env' });
const db = require('../config/db'); // DB 연결
const qs = require('qs');
const axios = require('axios');
const jwt = require(`jsonwebtoken`);
const JWT_SECRET = process.env.JWT_SECRET;
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

        console.log("카카오 로그인 성공!", { user: kakaoAccount })

        // ✅ DB 사용자 등록/조회 로직이 들어가야 합니다.
        // 중복확인 (없으면 회원가입 처리/ 있으면 로그인 처리)
        const kakaoId = `KAKAO_${userInfoResponse.data.id}`;
        console.log("가져온 id", kakaoId);
        const email = kakaoAccount.email;
        console.log("가져온 email", email);
        const name = kakaoAccount.profile?.nickname;
        console.log("가져온 nickname", name);

        // 중복 체크 쿼리
        const [rows] = await db.query("SELECT * FROM users WHERE social_login = ?", [kakaoId]);

        // 중복 없으면 회원가입 처리
        if (rows.length === 0) {
            await db.query(
                "INSERT INTO users(social_login,username, name, email) VALUES (?, ?, ?, ?)",
                [kakaoId, email, name, email]
            );
        }

        // JWT 발급
        const token = jwt.sign({
            id: kakaoId, username: email, name,
        }, JWT_SECRET, { expiresIn: '1h' });




        res.status(200).json({ user: kakaoAccount, token });

    } catch (error) {
        console.error('카카오 로그인 오류:', error.response?.data || error.message);
        res.status(500).json({ message: '카카오 로그인 실패' });
    }
};

