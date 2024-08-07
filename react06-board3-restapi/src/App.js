import './App.css';
import { Routes, Route } from 'react-router-dom';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import Edit from './components/board/Edit';
import NotFound from './components/common/NotFound';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path='/' element={<List></List>}></Route>
          <Route path='/list' element={<List></List>}></Route>
          <Route path='/view'>
            {/* 게시물의 일련번호로 얻어와야하는 값 (idx) */}
            <Route path=':idx' element={<View></View>}></Route>
          </Route>
          <Route path='/write' element={<Write></Write>}></Route>
          <Route path='/edit'>
            <Route path=':idx' element={<Edit></Edit>}></Route>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
