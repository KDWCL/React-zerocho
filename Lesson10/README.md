🤢[Commit](https://github.com/KDWCL/React-zerocho/commit/eafe4a7a41c712d778c57db691f0436e99e3dff2) ← Lesson10/GuGuDan-webpack/webpack.config.jsx 만 보면된다.

    dist 파일을 gitignore 해주었기 때문에 dist파일 생성후 npm run dev

## @babel/preset-env

- preset 이란 plugin들의 모음이다.
- preset-env는 자동으로 브라우저에 맞게 최신자바스크립트를 구자바스크립트로 바꿔준다.
- targets를 이용하여 사용할 브라우저를 정해줄 수 있다. 굳이 이렇게 정하는 이유는 바벨이 수많은 브라우저들을 지원하게 되면 하는일 많아져서 점점 느려지기 때문이다.

```javascript
const path = require('path');
module.exports = {
  name: 'gugudan-setting',
  mode: 'development',
  devtool: 'eval',
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
          presets: [
            '@babel/preset-react',
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['> 5% in KR', 'last 2 chrome versions'] }
              }
            ]
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  },
  output: {
    path: path.join(\_\_\_\_\_\_dirname, 'dist'),
    filename: 'app.js'
  }
};
```

- [참고사이트](https://github.com/browserslist/browserslist) ← browserlist
- > 5% in KR뜻은 한국에서 점유율 5%이상 브라우저만 지원
- last 2 chrome versions뜻은 크롬버전의 최신버전 2개 지원

## Plugins

- plugins를 또 넣을 수 있으면 확장프로그램과 비슷한 개념이다.
- 실무에서의 꿀팁은 plugins와 rules에 있는것들을 빼보면서 에러메세지를 보는 것이다.
- plugins: [new webpack.LoaderOptionsPlugin({ debug: true })] 이 플러그인의 역할은 module에 loader의 options 모두에게 debug:true를 다 넣을 수 있게해준다.
- debug: true을 '@babel/preset-env'의 설정값으로 넣어주면 된다.

```javascript
const path = require('path');
const webpack = require('webpack');
module.exports = {
  name: 'gugudan-setting',
  mode: 'development',
  devtool: 'eval',
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
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 5% in KR', 'last 2 chrome versions']
                },
                debug: true
              }
            ],
            '@babel/preset-react'
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }
};
```

- 실행결과

  - targets 에 대한 디버그 값들이 나옴. (지원브라우저들)
  - preset-env에서 저 브라우저들을 지원하기위해서 수많은 플러그인들이 설치되는것을 볼 수 있음.

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8232696d-9227-463a-9f27-501cd0c08875/_2020-02-25__11.23.49.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8232696d-9227-463a-9f27-501cd0c08875/_2020-02-25__11.23.49.png)

## Webpack docs

- 보이는거와 같이 entry, output, loaders(module), plugins, mode가 나와있다.
- 이 5개가 제일 중요한 것.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4898713a-aaa6-4af8-b404-8526cfd4d81b/_2020-02-25__10.36.28.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4898713a-aaa6-4af8-b404-8526cfd4d81b/_2020-02-25__10.36.28.png)
