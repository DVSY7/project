// server/server.js

require('dotenv').config({path: "./config/.env"});

const app = require("./app");

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중`);
});

