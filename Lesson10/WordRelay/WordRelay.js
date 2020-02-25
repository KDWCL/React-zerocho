const React = require('react');
// node_modules에서 react를 찾아옴
const { Component } = React;
// react 패키지안에서 export 되어진 Component 라는 것을 찾아옴.
class WordRelay extends Component {
  state = {
    word: '병아리',
    value: '',
    resilt: ''
  };

  onChange = e => this.setState({ value: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({ word: this.state.value, value: '', result: '정답' });
      this.input.focus();
    } else {
      this.setState({
        value: '',
        result: '땡'
      }),
        this.input.focus();
    }
  };
  ref = c => {
    this.input = c;
  };
  input;
  render() {
    return (
      <>
        <span>{this.state.word}</span>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            onChange={this.onChange}
            ref={this.ref}
          />
          <button>제출</button>
        </form>
        <span>{this.state.result}</span>
      </>
    );
  }
}

module.exports = WordRelay;
// 모듈화 시키기 위해서 사용, 노드의 모듈 시스템임
// es6기능엔 export default WordRelay 이렇게 사용할 수 있는 기능이 있음
