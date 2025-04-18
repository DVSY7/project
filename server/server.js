const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중`);
});