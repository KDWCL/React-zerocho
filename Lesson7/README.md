# 11강 React Hooks 사용법

- setState나 ref를 사용하지 않을 때 이런식으로 함수형 컴포넌트를 사용했다.

- 하지만 사람들이 setState,ref를 함수형으로 쓰고 싶어 요청하게 되었고 그렇게 hooks가 만들어졌다.

- state를 hooks 에서 사용할 때에는 destructuring 구문을 사용한다. 변수자리에 객체나 배열이 온다.

- ref를 hooks에서 사용할 때에는 useRef()를 사용해서 DOM에 접근한다.

# 12강 Class와 Hooks 비교하기

- setState로 값이 바뀌면 함수전체가 재실행된다. 그래서 class보다 느릴 수 있다.

- hooks에서는 for => htmlFor , class => className 으로 쓰인다.

- 이렇게 쓸수는 있지만 setState를 할때마다 안에 있는 모든 값들을 다 적어줘야 되서 매우 불편하다. 하나만 바꾼다고 setState({first:""}) 해주면 다른 값들은 다지워짐.

  ```javascript
  const [state,setState] = React.useState(
  first: Math.ceil(Math.random() * 9),
  second: Math.ceil(Math.random() * 9),
  value: "",
  result: "");
  ```

- 밑의 함수에서 setState 될때마다 랜더링이 되어야 정상이지만 React에서 알아서 묶어서 한번에 처리해줌. 비동기라서 가능하다. 묶어서 처리할동안 다른일부터함. 하지만 setState를 비동기로 만들다보니 함수가 차례대로 실행되지 않아 만든것이 prevState 이다.

  ```javascript
  if (first _ second === parseInt(value)) {
    setResult(prevResult => {
    return value + " 은 정답";
    });
    setValue("");
    setFirst(Math.ceil(Math.random() * 9));
    setSecond(Math.ceil(Math.random() * 9));
    inputRef.current.focus(); // current안에 focus()함수가 있음.
  } else {
    setResult(prevResult => {
    return value + " 은 땡";
  });
    setValue("");
    inputRef.current.focus();
  }
  ```

- prevState hooks 사용법
  ```javascript
  setResult(prevResult => {
    return value + " 은 정답";
  });
  ```
