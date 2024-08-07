import './App.css';

// 매개변수 props를 통해 전달된 값을 받아 사용한다
function Header(props){
  console.log('props', props.title);
  return(
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

function Nav(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}

function Article(props){
  const lists = [];
  for(let i=0 ; i<props.boardDate.length ; i++){
    let row = props.boardDate[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={(event)=>{
          event.preventDefault();
          // 함수 호출 시 게시물의 일련번호를 인수로 전달
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className='cen'>{row.writer}</td>
        <td className='cen'>{row.date}</td>
      </tr>
    )
  }

  return(
    <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* 배열에 추가한 데이터 출력 */}
          {lists}
        </tbody>
      </table>
    </article>
  );
}

function App() {
  // 게시판의 데이터로 사용할 객체형 배열 생성
  const boardDate = [
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01', contents:'React를 뽀개봅시당'},
    {no:2, title:'어제는 Javascript공부함', writer:'윤도운', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project를 해야지', writer:'김원필', date:'2023-05-05', contents:'Project는 뭘할까'},
  ]
  return (
    <div className="App">
      <Header title="게시판-목록(props)"></Header>
      <Nav onChangeMode={function(){
        alert("글쓰기 페이지로 이동")
      }}></Nav>
      <Article boardDate={boardDate} onChangeMode={(no)=>{
        alert('선택한 게시물 번호:' + no);
      }}></Article>
    </div>
  );
}

export default App;
