import './App.css';
// 글쓰기 시 브라우저라우터 처리는 index.js로 옮긴 후 작성
// import { BrowserRouter } from 'react-router-dom';
// useNavigate : 글쓰기 완료 시 페이지 이동을 위한 훅 임포트
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

// 현재날짜를 0000-00-00으로 변환
const nowDate = () => {
  let dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = ("0" + (1+dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  return year + "-" + month +"-" + day;
}


/* 라우터 처리를위한 BrowserRouter 컴포넌트는 App.js에서 최상위 엘리먼트를 감싸는 형식으로 사용할 수 있다. */
function App() {
  // 기존 객체형 배열을 State로 변경
  const [boardData, setBoardData] = useState([
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01', contents:'React를 뽀개봅시당'},
    {no:2, title:'어제는 Javascript공부함', writer:'윤도운', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project를 해야지', writer:'김원필', date:'2023-05-05', contents:'Project는 뭘할까'},
    {no:4, title:'집가서 케이크 먹어야즹~', writer:'박성진', date:'2023-08-01', contents:'초.콜.릿.케.이.크'},
  ]);

  // 게시물의 일련번호 부여를 위한 시퀀스 용도의 State
  const [nextNo, setNextNo] = useState(4);
  // 작성 완료 후 페이지 이동을 위한 훅
  const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<List boardData={boardData} />}></Route>
        <Route path='/list' element={<List boardData={boardData} />}></Route>
        {/* 열람의 경우 조회할 게시물의 일련번호가 필요하므로
        중첩된 라우터 구조로 정의한다. :no는 router-dom에서 제공하는
        useParams 훅을통해 값을 얻어올 수 있다. */}
        <Route path='/view'>
          <Route path=':no' element={<View boardData={boardData} nextNo={nextNo} />}></Route>
        </Route>
        {/* Write컴포넌트 내에서 글쓰기 처리를 할 수 있도록 App.js에서 생성한 모든
        State와 관련함수를 Props로 전달한다 */}
        <Route path='/write' element={<Write 
          boardData={boardData} setBoardData={setBoardData} nextNo={nextNo} setNextNo={setNextNo}
          navigate={navigate} nowDate={nowDate}
          />}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
