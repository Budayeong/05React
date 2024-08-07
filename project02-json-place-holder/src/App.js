import './App.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import List from './component/List';
import View from './component/View';

function App() {
  return (
    <div className="App">
      <div className="parent">
          <List></List>
          <Routes>
            <Route path="/" element={<View />} />
            <Route path="/view/:id/:page" element={<View />} />
          </Routes> 
      </div>
    </div>
  );
}

export default App;
