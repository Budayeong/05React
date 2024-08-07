import './App.css';
import { useId } from 'react';

/*
각 컴포넌트별로 여러개의 DOM을 추가해야하는 경우에는
useId로 하나의 아이디를 생성한 후 -xxx와 같은 형태로 추가적인 이름을
부여해서 사용할 수 있다.
*/
function App() {
  return (
    <div className="App">
      <MyInput1 />
      <MyInput2 />
    </div>
  );
}

function MyInput1(){
  const id = useId();

  return(
    <div>
      <label htmlFor={`${id}-id`}>아이디</label>
      <input type="text" id={`${id}-id`} name='myId' />
      <br />
      <label htmlFor={`${id}-pass`}>패스워드</label>
      <input type="text" id={`${id}-pass`} name='myPass' />
    </div>
  )
}

function MyInput2(){
  const id = useId();

  return(
    <div>
      <label htmlFor={`${id}-name`}>이름</label>
      <input type="text" id={`${id}-name`} name='myName' />
      <br />
      <label htmlFor={`${id}-age`}>나이</label>
      <input type="text" id={`${id}-age`} name='myAge' />
    </div>
  )
}

export default App;
