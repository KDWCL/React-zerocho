const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  // setState나 ref를 사용하지 않을 때 이런식으로 함수형 컴포넌트를 사용했다
  // 하지만 사람들이 setState,ref를 함수형으로 쓰고 싶어 요청하게 되었고 그렇게 hooks가 만들어졌다
  // state 를 hooks 에서 사용할 때에는 destructuring 구문을 사용한다. 변수자리에 객체나 배열이옴.
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null); // 안에 매개변수는 넣어줘도되고 안넣어줘도 무방
  console.log(inputRef);

  const onSubmit = e => {
    e.preventDefault();
    if (first * second === parseInt(value)) {
      setResult(prevResult => {
        return value + ' 은 정답';
      });
      setValue('');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      inputRef.current.focus(); // current안에 focus()함수가 있음.
    } else {
      setResult(prevResult => {
        return value + ' 은 땡';
      });
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  console.log('랜더링'); // setState로 값이 바뀌면 함수전체가 재실행된다. 그래서 class보다 느릴 수 있다.
  return (
    <div>
      <span>
        {first} 곱하기 {second}는 ?
      </span>
      <form onSubmit={onSubmit}>
        <input
          ref={inputRef} //ref쓰는 방법이 달라짐. useRef를 이용하여 DOM에 접근한다.
          type="number"
          onChange={onChange}
          value={value}
        />
      </form>
      <span>{result}</span>
    </div>
  );
};

module.exports = GuGuDan;
