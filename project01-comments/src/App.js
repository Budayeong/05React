import './App.css';
import {useState} from 'react';
import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
  
function App() {
  const [myData, setMyData] = useState([
    {no:1, comment:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01'},
    {no:2, comment:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03'},
    {no:3, comment:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05'},
  ]);

  // 시퀀스로 사용할 State생성
  const [nextVal, setNextVal] = useState(4);

  // 현재시간 
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let dateString = year + '-' + month  + '-' + day;

  // 댓글 작성
  const writeProcess = (addWriter, addComment) => {
    // 매개변수를 통해 작성자와 댓글 내용을 가져옴
    console.log('작성자', addWriter, '내용', addComment);

    // 추가할 데이터
    let addData = {no: nextVal, comment:addComment, writer:addWriter, date:dateString};
    
    // 기존 데이터의 복사본 배열 생성
    let copyData = [...myData];
    // 복사본에 데이터 추가
    copyData.push(addData);
    // 기존 데이터배열의 State변경 (-> 새로운 렌더링)
    setMyData(copyData);

    // 새로운 댓글 추가를 위해 시퀀스 증가
    setNextVal(nextVal+1);
  }

  // 댓글 삭제
  const deleteProcess = (no) =>{
    console.log('삭제할 댓글번호', no);
    const newData = [];

    // 기존 데이터에서 삭제할 댓글을 제외한 나머지 데이터를 newData에 추가
    myData.forEach((row)=>{
      if(row.no !== no){
        newData.push(row);
      }
    });

    // newData를 이용해 myData 설정
    setMyData(newData);
  }

  // 댓글 수정
  const editProcess = (no, editWriter, editComment) => {
    console.log('수정할데이터', no, editWriter);

    let newData = myData.filter((row)=>{
      // 기존 데이터에서 인덱스를 통해 수정할 데이터를 찾고, 해당 데이터의 이름을 수정할 이름으로 변경
      if(row.no === no){
        row.writer = editWriter;
        row.comment = editComment;
      }
      return row;
    });
    setMyData(newData);
  }

  // 댓글 컴포넌트
  let comList =  myData.map((row) => (
    <ComList myData={row}
    onDeleteReply={deleteProcess}
    onEditReply={editProcess}/>
  ));

  return (
    <div className="App">
      <Board></Board>
      {comList}
      <ComWrite onAddReply={writeProcess}/>
    </div>
  );
}

export default App;
