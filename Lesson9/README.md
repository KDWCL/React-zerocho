# 15~16강 웹팩 빌드하기

[Commit](https://github.com/KDWCL/React-zerocho/commit/122a33acc4e4712a5873747b089e33354e6d50ef) ← 웹팩 빌드하기 tutorial

[Commit](https://github.com/KDWCL/React-zerocho/commit/b1688a51711015754c98378df0afdf254e96ee9e) ← GuGuDan 웹팩 빌드하기

[Commit](https://github.com/KDWCL/React-zerocho/commit/3019fa7672385c13a440710da45adbb051e4acfe) ← GuGuDan 웹팩 빌드하기 (오류수정)

## webpack을 실행시키기 위한 방법 2가지

1.  package.json의 script부분에 "script":{"dev":"webpack"} 추가

    터미널에 npm run dev를 치면 실행되어짐.

        {
          "name": "webpack-tuto",
          "version": "1.0.0",
          "description": "",
          "main": "WorldRelay.js",
          **"scripts": {
            "dev": "webpack"
          },**
          "author": "",
          "license": "ISC",
          "dependencies": {
            "react": "^16.12.0",
            "react-dom": "^16.12.0"
          },
          "devDependencies": {
            "webpack": "^4.41.6",
            "webpack-cli": "^3.3.11"
          }
        }

2.  npx webpack 하면 package.json에 추가하지않고 실행가능

## 오류 해결

- 위의 방법 2가지로 webpack을 하게되면 이러한 오류가 뜸

  ERROR in ./client.jsx 5:16
  Module parse failed: Unexpected token (5:16)
  You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
  | const WordRelay = require('./WorldRelay')
  |

  > ReactDom.render(<WordRelay/>, document.querySelector("#root"));  
  >  @ multi ./client ./WorldRelay app[0]

  ERROR in ./WorldRelay.js 6:9
  Module parse failed: Unexpected token (6:9)
  You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
  | // react 패키지안에서 export 되어진 Component 라는 것을 찾아옴.  
   | class WordRelay extends Component {

  >     state= {};
  >
  > | render(){
  > | }
  > @ multi ./client ./WorldRelay app[1]

- 해결방법은 JSX문법이 webpack에 적용되지 않아서 뜨는 것이기 때문에 webpack에 babel을 넣어줘야함.
- 해결방법

  일단 아직 바벨을 안깔았기 때문에 깔고나서 babel과 webpack을 연결시켜보자

  npm i -D @babel/core ←바벨의 기본적인 기능들이 들어가있음. js 최신문법을 구문법으로 바꿔줌

  npm i -D @babel/preset-env ← 내 브라우저 환경에 맞게 js최신문법를 구문법으로 바꿔줌

  npm i -D @babel/preset-react ← JSX문법을 사용할 수 있게 해줌

  npm i -D babel-loader ← babel과 webpack을 연결시켜줌

        {
          "name": "webpack-tuto",
          "version": "1.0.0",
          "description": "",
          "main": "WorldRelay.js",
          "scripts": {
            "dev": "webpack"
          },
          "author": "",
          "license": "ISC",
          "dependencies": {
            "react": "^16.12.0",
            "react-dom": "^16.12.0"
          },
          "devDependencies": {
            "@babel/core": "^7.8.4",
            "@babel/preset-env": "^7.8.4",
            "@babel/preset-react": "^7.8.3",
            "babel-loader": "^8.0.6",
            "webpack": "^4.41.6",
            "webpack-cli": "^3.3.11"
          }
        }

- 이제 webpack.config.jsx에서 설정해주자

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
          }, // entry : 입력
          module: {
            rules: [
              {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                  plugins: ["@babel/plugin-proposal-class-properties"]
                }
              }
            ]
          },
          output: {
            path: path.join(__dirname, "dist"),
            filename: "app.js"
          } // output : 출력
        };

        // entry에 modules를 적용시켜서 ouput을 이용하여 출력한다
        // test:/\.jsx?/ <- js와 jsx파일에 룰을 적용시키겠다
        // loader: "babel-loader" <- loader라는 룰, webpack과 babel을 이어주겠다
        // option: {presets: ["@babel.preset-env", "@babel/preset-react"]} <- 바벨의 옵션을 설정
        // 즉 js와jsx파일에 룰을 적용시킬 것이고 그 룰은 loader이고 loader의 옵션을 설정해주면 된다.

- 실행해주면

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3edbb271-5ddb-4eb7-b710-35c7c63ad545/webpack.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3edbb271-5ddb-4eb7-b710-35c7c63ad545/webpack.png)

  ./WorldRelay.js 와 ./client.jsx가 합쳐져서 app.js를 만들었다는 실행문이 뜬다.

## GuGuDan webpack 빌드하기

    const path = require('path');
    module.exports = {
      name: 'gugudan-setting',
      mode: 'development', // 배포시 : production
      devtool: 'eval', // hidden-source-map은 production일때 사용
      resolve: {
        extensions: ['.jsx', '.js']
      },
      entry: {
        app: ['./client']
      },
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
      }
    };

## Tips

예전 프로젝트를 남겨두면 굳이 create-react-app을 쓰지않고도 쉽게 반복적으로 내가 webpack, babel등을 빌드해서 사용가능하다. 더 가볍게 사용가능하기 때문에 직접 빌드하는 방법을 알아두는게 좋다.
