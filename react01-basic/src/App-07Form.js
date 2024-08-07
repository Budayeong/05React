import './App.css';
import { useState } from 'react';

function WriteForm(props){
  // submit 이벤트 리스너를 통해 폼값 처리
  return(
    <form onSubmit={(e)=>{
      // 이벤트리스너 안에서는 event객체를 매개변수로 받을 수 있다
      // 전송차단
      e.preventDefault();
      // 이벤트 target속성을 통해 입력한 폼값을 얻어옴
      let writer = e.target.writer.value;
      let title = e.target.title.value;
      let contents = e.target.contents.value;
      // 부모 컴포넌트에서 Props로 전달해준 함수를 호출해 폼값을 전달
      props.writeAction(title, writer, contents);
    }}>
      <table id="boardTable">
        <tbody>
          <tr>
            <th>작성자</th>
            <td><input type="text" name="writer"/></td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" name="title"/></td>
          </tr>
          <tr>
            <th>날짜</th>
            <td><textarea name="contents" cols="22" rows="3"></textarea></td>
          </tr>
        </tbody>
      </table>
      {/* JSX는 유사 HTML 문법을 사용하므로 반드시 Pair(쌍)을 이뤄야함.
      따라서 <input> 태그도 아래와 같이 작성한다. */}
      <input type="submit" value="전송"/>
    </form>
  );
}

function App() {
  // State 선언
  const [message, setMessage] = useState('폼값 검증 진행중');
  return (
    <div className="App">
      <h2>React - Form값 처리</h2>
      {/* 작성폼 컴포넌트를 추가하면서 Props를 통해 폼값을 받아 콘솔에 출력하는 함수를 전달 */}
      <WriteForm writeAction={
        (wr, ti, con) => {
          console.log("Form값", wr, ti, con);
          // 매개변수로 전달된 폼값이 모두 입력된 경우 State 변경
          if(wr!=='' && ti!=='' && con!==''){
            setMessage('폼값 검증 완료');
          }
        }}></WriteForm>
        <p>{message}</p>
    </div>
  );
}

export default App;
