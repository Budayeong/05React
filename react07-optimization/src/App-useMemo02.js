import './App.css';
import { useState, useEffect, useMemo } from 'react';

function App() {
  // State생성
  const [number, setNumber]  = useState(0);
  const [ switching, setSwitching] = useState(true);

  // 일반 상수 : 초기값은 'on'
  // const switchMode = switching ? 'On(켜짐)'  : 'Off(꺼짐)';
  
  // 상수를 객체로 변경(Step2)
  /* 
  JS에서는 객체를 선언할때마다 새로운 참조값을 할당받게 된다.
  즉 새로운 레더링을 위해 App컴포넌트가 호출될대마다 참조값이 변경된다.
  따라서 useEffect()가 지속적으로 호출된다. */
  // const switchMode ={ 
    // nowState : switching ? 'On(켜짐)'  : 'Off(꺼짐)'
  // };

  /*
  step3 : useMemo를 적용하여 switching값이 변경될때만 값을 반환하고,
  그렇지 않으면 캐싱된 값을 그대로 사용
  */
  const switchMode = useMemo(()=>{
    return {nowState : switching ? 'on' : 'off'};
  },[switching]);
  

  
  // switchMode값이 변경될때마다 호출되도록 설정
  // Step1 : 기본(원시)타입의값을 할당했음로 값의 변화가 있을때만 useEffect 호출
  // Step2 : 객체형으로 변경하면 App컴포넌트가 렌더링될때마다 새로운 참조값을 할당받게되므로
  // 값이 변화된 것으로 인식하여 useEffect가 지속적으로 호출됨`
  // sep3: 지속적인 변화를 차단하기위해 useMemo를 이용해 memoization값을 사용하도록 코드를 숮ㅇ
  useEffect(()=>{
    console.log("useEffect() 호출됨");
  }, [switchMode]);


  return (
    <div className="App">
      <h2>정수 카운터</h2>
      {/* 스핀박스를 누르면 정수 State가 변경됨 */}
      <input type="number" value={number} onChange={(e)=>setNumber(e.target.value)} />
      <hr />


      

      <h2>토글 스위치</h2>
      {/* <p>스위치 상태(Step1) : {switchMode}</p> */}
      <p>스위치상태(Step2) : {switchMode.nowState}</p>

      {/* 버튼을 누르면 boolean State가 변경된다. */}
      <button onClick={()=> setSwitching(!switching)}>스위치 조작</button>
    </div>
  );
}

export default App;
