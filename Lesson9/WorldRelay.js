const React = require('react');
// node_modules에서 react를 찾아옴
const {Component} = React;
// react 패키지안에서 export 되어진 Component 라는 것을 찾아옴.
class WordRelay extends Component {
    state= {};
    render(){
    }
}

module.exports = WordRelay;
// 모듈화 시키기 위해서 사용, 노드의 모듈 시스템임
// es6기능엔 export default WordRelay 이렇게 사용할 수 있는 기능이 있음