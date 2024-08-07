import './App.css';
import { useState, useEffect, useCallback } from 'react';

// Box컴포넌트 : Props를 통해 <div>의 스타일을 전달받음
const Box = ({ createBoxStyle }) => {
  // State: 초기값으로 빈 객체 설정
  const [style, setStyle] = useState({});

  // Props를 통해 전달받은 createBoxStyle이 변경될때마다 호출되도록 정의
  useEffect(()=>{
    console.log('박스 키우기');
    // 호출될때마다 State를 변경
    setStyle(createBoxStyle());
  },[createBoxStyle]);

  // <div>박스를 렌더링
  return <div style={style}></div>
}

function App() {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  /*
  Step1 : App컴포넌트가 렌더링될때마다 새로운 참조값이 부여된다. 따라서
    테마변경을 눌러도 이와상관없는 '박스키우기' 가 출력
  */
  // const createBoxStyle = () =>{
  //   return {
  //     backgroundColor : 'pink',
  //     width : `${size}px`,
  //     height: `${size}px`,
  //   };
  // }

  // Step2 : useCallback 훅을 적용. size가 변경될때만 새롭게 함수를 메모이제이션.
  const createBoxStyle = useCallback(()=>{
    return {
          backgroundColor : 'pink',
          width : `${size}px`,
          height: `${size}px`,
        };
  }, [size]);

  return (
    // <div>박스의 배경색이 isDark에 따라 black/white로 변경된다
    <div className="App" style={{
      backgroundColor: isDark ? 'black' : 'white',
    }}>
      <h2>useCallback()</h2>
      {/* 스핀박스로 변경한 값이 size를 변경하고, 새롭게 렌더링된다. */}
      <input type="number" value={size} step={5} onChange={(e)=>setSize(e.target.value)} />
      {/* 버튼을 누를때마다 black/white가 토글된다. */}
      <button onClick={()=> setIsDark(!isDark)}>테마변경</button>
      {/* Style을 반환하는 함수를 Props로 전달한다 */}
      <Box createBoxStyle={createBoxStyle}/>
    </div>
  );
}

export default App;
