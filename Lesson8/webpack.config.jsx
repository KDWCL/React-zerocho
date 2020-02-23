const path = require("path");
// 노드에서 경로를 쉽게 조작하기 위해서 제공하는 기능
// __dirname은 내 현재경로를 의미
// 내현재경로+dist를 해서 경로 값을 알아서 반환해줌

module.exports = {
  name: "word-relay-setting",
  mode: "development", // 배포시 : production
  devtool: "eval", // eval은 빠르게 하겠다는 뜻
  resolve: {
    extensions: [".js", ".jsx"]
  },
  entry: {
    app: ["./client"]
    // app: ['./client','./WorldRelay']
  }, // entry : 입력
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js"
  } // output : 출력
};
