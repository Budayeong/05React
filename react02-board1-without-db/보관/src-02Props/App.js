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

function Nav(){
  return(
    <nav>
      <a href="/">글쓰기</a>
    </nav>
  );
}

function Article(props){
  const lists = [];
  // Props로 전달된 객체형 배열의 크기만큼 반복
  for(let i=0 ; i<props.boardDate.length ; i++){
    // 각 루프에 해당하는 객체를 꺼낸 후 lists에 추가
    let row = props.boardDate[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no}>{row.title}</a></td>
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
      {/* 문자열은 ""을 통해 Props 전달 가능 */}
      <Header title="게시판-목록(props)"></Header>
      <Nav></Nav>
      {/* 변수는 {}을 통해 전달 */}
      <Article boardDate={boardDate}></Article>
    </div>
  );
}

export default App;
