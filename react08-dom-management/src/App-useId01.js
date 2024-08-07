import './App.css';
import { useId } from 'react';

function App() {
  /*
  useId()는 고유한 아이디를 생성해준다. DOM의 아이디를 부여하거나
  라벨링을 할때 편리하다. 
  */
  const myId = useId();
  console.log("myId", myId);

  return (
    <div className="App">
      <MyInput />
    </div>
  );
}


function MyInput(){
  // 두번째 아이디를 생성한다
  const ageId = useId();
  console.log("ageId", ageId);

  return(
    <div>
      {/* HTML속성을 사용하여 연결 */}
      <label htmlFor="name">이름</label>
      <input type="text" id="name" />
      <br />
      {/* useId 훅 사용해 연결 */}
      <label htmlFor={ageId}>나이</label>
      <input type="text" id={ageId} />
    </div>
  );
}

export default App;
