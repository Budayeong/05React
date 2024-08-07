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
