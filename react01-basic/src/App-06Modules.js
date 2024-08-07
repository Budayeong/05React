// App 컴포넌트에서 사용하는 스타일시트
import './App.css';
// State를 관리하기 위한 훅
import { useState } from 'react';

// 각각의 컴포넌를 js 혹은 jsx 파일로 생성한 후 모듈화
// import시 저장된 경로와 컴포넌트명까지만 기술하고 확장자는 생략한다
import ListComponent from './component/ListComponent';
import ViewComponent from './component/ViewComponent';
import WriteComponent from './component/WriteComponent';

function App() {
  // State를 정의한 후 초기값은 list로 설정. 변경할 함수명은 setMode로 정의
  const [mode, setMode] = useState('list');
  let contents = '';

  // mode의 변화에 따라 다른 컴포넌트를 할당할 수 있도록 if문으로 분기.
  // 공통적으로 mode를 파라미터로 받은 후 state를 변경하는 함수가 props를 통해 자식 컴포넌트로 전달됨.
  if(mode=='view'){
    contents = <ViewComponent changeMode={(pmode)=>{setMode(pmode)}}></ViewComponent>;
  }
  else if(mode=='write'){
    contents = <WriteComponent changeMode={(pmode)=>{setMode(pmode)}}></WriteComponent>;
  }
  else {
    contents = <ListComponent changeMode={(pmode)=>{setMode(pmode)}}></ListComponent>;
  }

  // 최종적으로 컴포넌트 렌더링
  return (
    <div className="App">
      <h2>React - 모듈화</h2>
      {contents}
    </div>
  );
}

export default App;
