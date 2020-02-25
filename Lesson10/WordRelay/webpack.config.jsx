const path = require('path');
// 노드에서 경로를 쉽게 조작하기 위해서 제공하는 기능
// __dirname은 내 현재경로를 의미
// 내현재경로+dist를 해서 경로 값을 알아서 반환해줌

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 배포시 : production
  devtool: 'eval', // eval은 빠르게 하겠다는 뜻
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./client']
  }, // entry : 입력
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  } // output : 출력
};

// entry에 modules를 적용시켜서 ouput을 이용하여 출력한다
// test:/\.jsx?/ <- js와 jsx파일에 룰을 적용시키겠다
// loader: "babel-loader" <- loader라는 룰, webpack과 babel을 이어주겠다
// option: {presets: ["@babel.preset-env", "@babel/preset-react"]} <- 바벨의 옵션을 설정
// 즉 js와jsx파일에 룰을 적용시킬 것이고 그 룰은 loader이고 loader의 옵션을 설정해주면 된다.
