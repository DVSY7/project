// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // JSON 파싱 가능하게

app.post('/request', (req, res) => {
  const { name, email } = req.body;
  console.log("클라이언트로부터 받은 데이터:", req.body);

  // 예시 응답
  res.json({
    success: true,
    message: '데이터 잘 받았습니다!',
    received: { name, email }
  });
});

app.get("/",(req,res) => {
  res.send("hellow express!");
})

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
