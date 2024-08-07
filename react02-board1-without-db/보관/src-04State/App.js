import './App.css';
import { useState } from 'react';

// 준비 중 컴포넌트
function ReadyComp(){
  return (
    <div>
      <h3>컴포넌트 준비중입니다^^*</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

function Header(props){
  console.log('props', props.title);
  return(
    <header>
      <h2>{props.title}</h2>
    </header>
  );
}

// 목록의 네비게이션
function NavList(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        // a 태그는 화면의 깜빡임이 있으므로 이벤트를 없앰
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  );
}

// 내용보기의 네비게이션
function NavView(props){
  // 띄어쓰기 할때는 HTML과 동일하게 nbsp 혹은 {" "}와 같이 기술할 수 있다.
  return (
  <nav>
    <a href="/" onClick={function(event){
      event.preventDefault();
      props.onChangeMode('list');
    }}>목록</a>&nbsp;&nbsp;
    <a href="/" onClick={function(event){
      event.preventDefault();
      props.onChangeMode('edit');
    }}>수정</a>&nbsp;
    <a href="/" onClick={function(event){
      event.preventDefault();
      props.onChangeMode('delete');
    }}>삭제</a>
  </nav>
  );
}

// 작성하기의 네비게이션
function NavWrite(props){
  return(
    <nav>
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  );
}

// 게시판 목록
function ArticleList(props){
  const lists = [];
  for(let i=0 ; i<props.boardDate.length ; i++){
    let row = props.boardDate[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={(event)=>{
          event.preventDefault();
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className='cen'>{row.writer}</td>
        <td className='cen'>{row.date}</td>
      </tr>
    );
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
          {lists}
        </tbody>
      </table>
    </article>
  );
}

// 게시판 읽기
function ArticleView(props){
  return(
    <article>
        <table id="boardTable">
          <colgroup>
            <col width="20%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>성유겸</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>오늘은 React 공부하는 날</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>2023-05-05</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>열심히 해봅시당<br/>열공 합시당</td>
            </tr>
          </tbody>
        </table>
      </article>
  );
}

// 게시판 작성
function ArticleWrite(props){
  return(
    <article>
      <form>
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
              <td><textarea type="content" rows="3"></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="전송"/>
      </form>
    </article>
  );
}


function App() {
  const boardDate = [
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01', contents:'React를 뽀개봅시당'},
    {no:2, title:'어제는 Javascript공부함', writer:'윤도운', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project를 해야지', writer:'김원필', date:'2023-05-05', contents:'Project는 뭘할까'},
  ];

  // 화면전환을 위한 State생성. 초기값으로 list
  const [mode, setMode] = useState('list');
  // 컴포넌트와 제목 저장용 변수
  let articleComp, navComp, titleVar;

  // mode에 따라 각 화면을 전환할 수 있도록 분기
  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardDate={boardDate}
      onChangeMode={(no)=>{
        console.log('선택한 게시물 번호: ' +no);
        setMode('view');
      }}></ArticleList>
  }
  else if (mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>
    articleComp = <ArticleView></ArticleView>
  }
  else if (mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite></ArticleWrite>
  }
  else {
    // 앞에서 설정한 mode가 없다면 '준비중'을 렌더링
    navComp = <ReadyComp></ReadyComp>
    articleComp = '';
  }

  return (
    <div className="App">
      <Header title="게시판-목록(props)"></Header>
      {navComp}
      {articleComp}
    </div>
  );
}

export default App;
