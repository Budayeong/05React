import './App.css';
import { useState } from 'react';

// 모듈화된 컴포넌트는 js 혹은 jsx 확장자에 상관없이 경로명만 명시한 후 임포트
import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';

// 준비 중 컴포넌트
function ReadyComp(){
  return (
    <div>
      <h3>컴포넌트 준비중입니다^^*</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}

// 제목 컴포넌트
function Header(props){
  console.log('props', props.title);
  return(
    <header>
      <h2>{props.title}</h2>
    </header>
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

  // 선택한 게시물의 일련번호를 저장. 선택한 게시물은 없으므로 null로 초기화
  const [no, setNo] = useState(null);

  // 컴포넌트와 제목 저장용 변수
  let articleComp, navComp, titleVar, selectRow;

  // mode에 따라 각 화면을 전환할 수 있도록 분기
  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardDate={boardDate}
      onChangeMode={(no)=>{
        console.log('선택한 게시물 번호: ' +no);
        // 화면을 '읽기'로 State 전환
        setMode('view');
        // 선택한 게시물의 일련번호로 State변경
        setNo(no);
      }}></ArticleList>
  }
  else if (mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>

    console.log("현재 no:", no, typeof(no));
    // 데이터로 사용중인 객체형 배열의 크기만큼 반복하여 검색
    for(let i=0 ; i<boardDate.length ; i++){
      // 선택한 게시물의 번호와 일치하는 객체 검색
      if(no===boardDate[i].no){
        // 일치하는 객체를 변수에 저장
        selectRow = boardDate[i];
      }
    }
    // 객체를 Props를 통해 View 컴포넌트로 전달
    articleComp = <ArticleView selectRow={selectRow}></ArticleView>
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
