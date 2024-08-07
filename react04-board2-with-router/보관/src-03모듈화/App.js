import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';


/* 라우터 처리를위한 BrowserRouter 컴포넌트는 App.js에서 최상위 엘리먼트를 감싸는 형식으로 사용할 수 있다. */
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 첫 진입시에는 게시판의 목록을 렌더링 */}
          <Route path='/' element={<List></List>}></Route>
          <Route path='/list' element={<List></List>}></Route>
          <Route path='/view' element={<View></View>}></Route>
          <Route path='/write' element={<Write></Write>}></Route>
          {/* 앞에서 설정한 경로외에는 모두 404처리 */}
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
