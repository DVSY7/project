// server/server.js

require('dotenv').config({path: "./config/.env"});

const app = require("./app");
const http = require("http");
const socketIO = require("socket.io");

// 소켓과 함께 쓸 HTTP 서버
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
    credentials: true,
  },
});

// 소켓 헨들러 분리
const socketHandler = require("./socket");
socketHandler(io);

const PORT = process.env.PORT || 5000;

server.emit("서버가 실행중입니다.")

server.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중`);
});

