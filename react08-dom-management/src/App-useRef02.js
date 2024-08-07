import './App.css';
import { useState, useRef } from 'react';

function App() {
  // 새로운 렌더링을 위한 State 정의
  const [renderer, setRenderer] = useState(0);
  // Ref를 0으로 정의
  const countRef = useRef(0);
  // 일반변수를 0으로 정의
  let countVar = 0;
  
  // State를 변경해서 화면을 새롭게 렌더링
  const doRendering = () => {
    setRenderer(renderer + 1);
  };

  // Ref를 1증가시킨다
  const increaseRef = () => {
    countRef.current = countRef.current + 1 ;
    console.log('ref', countRef.current);
  };

  // 일반변수를 1증가시킨다.
  const increaseVar = () => {
    countVar = countVar + 1 ;
    console.log('var', countVar);
  };

  // 각 변수의 현재값을 출력한다
  const printResult = () =>{
    console.log(`ref:${countRef.current}, var:${countVar}`);
  };

  /*
  State를 변경시키면 그때마다 화면이 새롭게 렌더링된다. 이것은 App()을
  재호출하는것이므로 지역변수로 선언된 countVar는 그때마다 0으로 초기화된다.
  즉 컴포넌트의 생명주기 안에서 값을 유지하고 싶다면 State나 Ref를 사용해야하고
  그렇지 않다면 일반변수를 사용하면된다.
  */
  return (
    <div className="App">
      <p>Ref: {countRef.current}</p>
      <p>Var: {countVar}</p>
      <button onClick={doRendering}>렌더링</button>
      <button onClick={increaseRef}>Ref증가</button>
      <button onClick={increaseVar}>Var증가</button>
      <button onClick={printResult}>Ref/Var출력</button>
    </div>
  );
}

export default App;