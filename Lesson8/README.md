# 13강 웹팩 설치

- 페이스북 컴포넌트는 20000개임. 컴포넌트는 하나의 js를 의미. 합치는 과정에서 중복발생.

- 웹팩은 이러한 여러개의 자바스크립트의 파일을 하나의 자바스크립트 파일로 합쳐준다.

- 웹팩을 쓰기 위해선 자바스크립트 실행기인 node를 알아야 한다. 웹팩 또한 자바스크립트이기 때문이다.

## 웹팩 사용하기전 셋팅

1. npm init

- packagename 만 지어주고 다른건 그냥 넘기자

- package.json 생성

2. npm i react react-dom

- react, react-dom을 설치해준다.

3. npm i -D webpack webpack-cli

- webpack, webpack-cli을 설치해준다.

4. webpack.config.js, client.jsx 파일 생성

- js, jsx 확장자의 기능적 차이는 없다. 대신 개발자들이 jsx를 보면 jsx문법이 들어갔다는 것을 알 수 있어서 쓰는게 좋다.

5. <script src="./dist/app.js"></script>를 index.js에 추가해준다.

**참고**  
[npm 관련 정리]: (https://www.notion.so/kdwcl/Express-js-e046d75562004074b3659f5332e7d784)

# 14강 모듈 시스템과 웹팩 설정

1. 모듈 시스템(js, jsx파일들을 잘게 쪼개서 사용하기 위함)

- jsx파일안의 컴포넌트를 모듈화 시켜서 내가 필요한 컴포넌트들만 들고올때 편리함.

```javascript
const React = require('react');
const ReactDom = require(`react-dom`);
// require의 역할은 일단 내 폴더에서 react파일을 찾고 없으면 node_modules에서 찾아서 가져온다.
const WorldRelay = require(`./WordRelay`);
// 애는 내 폴더에 파일이 있기 때문에 위치 지정을 해준다.
```

- 이렇게 jsx파일에서 컴포넌트를 들고오기 위해서는 export를 해야한다. export를 하게되면 다른 파일에서 이 파일의 export되어진 컴포넌트를 땡겨올 수 있다. module.exports는 노드의 기능이다.

```javascript
class WorldRelay extends React.Component {
  render() {}
}
module.exports = WorldRelay;
```

2. 웹팩 설정

- webpack.config.js에서 해준다.

```javascript
const path = require('path');
// 노드에서 경로를 쉽게 조작하기 위해서 제공하는 기능
// __dirname은 내 현재경로를 의미
// 내 현재경로+dist를 해서 경로 값을 알아서 반환해줌

module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 배포시 : production
  devtool: 'eval', // eval은 빠르게 하겠다는 뜻
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./client']
    // app: ['./client','./WorldRelay']
  }, // entry : 입력
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  } // output : 출력
};
```

- 우리가 웹팩을 통해 해야될 것은 index.js에 있는 <script src="./dist/app.js"></script> 이 js하나에 모든 js,jsx파일들이 합쳐져야 된다. 그렇기 때문에 webpack.config.js에서 합쳐준다.

- entry는 합쳐야되는 파일들이 들어가며 우리는 client.jsx, WorldRelay.jsx파일을 합쳐야 된다. 하지만 WorldRelay.jsx에서의 컴포넌트는 client.jsx에 이미 불러와져 있기 때문에 따로 적어줄 필요없다.

- output은 entry로 입력받은 애들을 합쳐서 어떤 파일로 반환할것인지 설정해주는 곳이다. path로 반환해줄 파일의 경로설정을 해준다. filename으로 파일이름을 설정해준다.

- resolve 라는 것은 entry에서 합칠 파일들이 많아 질 경우를 대비해서 확장자들을 설정해주면 entry에서 파일들을 적을때 확장자는 생략 가능하다.
