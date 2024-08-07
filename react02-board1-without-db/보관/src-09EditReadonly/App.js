import './App.css';
import { useState } from 'react';

// 모듈화된 컴포넌트는 js 혹은 jsx 확장자에 상관없이 경로명만 명시한 후 임포트
import NavList from './components/navigation/NavList';
import NavView from './components/navigation/NavView';
import NavWrite from './components/navigation/NavWrite';
import NavEdit from './components/navigation/NavEdit';
import ArticleList from './components/article/ArticleList';
import ArticleView from './components/article/ArticleView';
import ArticleWrite from './components/article/ArticleWrite';
import ArticleEdit from './components/article/ArticleEdit';

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
  // 글쓰기를 위해 기존 상수를 State로 변경한다
  // 데이터의 변화에 따라 화면을 새롭게 렌더링해야하기때문
  const [boardData, setBoardData] =useState([
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01', contents:'React를 뽀개봅시당'},
    {no:2, title:'어제는 Javascript공부함', writer:'윤도운', date:'2023-03-03', contents:'JS는 할게 너무 많아요'},
    {no:3, title:'내일은 Project를 해야지', writer:'김원필', date:'2023-05-05', contents:'Project는 뭘할까'},
  ]);

  // 화면전환을 위한 State생성. 초기값으로 list
  const [mode, setMode] = useState('list');

  // 선택한 게시물의 일련번호를 저장. 선택한 게시물은 없으므로 null로 초기화
  const [no, setNo] = useState(null);

  // 글작성시 일련번호 부여를 위한 State
  // 오라클의 Sequence와 동일한 목적으로, 현재 등록된 게시글이 3개이므로 4로 초기화함
  const [nextNo, setNextNo] = useState(4);

  // 컴포넌트와 제목 저장용 변수
  let articleComp, navComp, titleVar, selectRow;

  // mode에 따라 각 화면을 전환할 수 있도록 분기
  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData}
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
    for(let i=0 ; i<boardData.length ; i++){
      // 선택한 게시물의 번호와 일치하는 객체 검색
      if(no===boardData[i].no){
        // 일치하는 객체를 변수에 저장
        selectRow = boardData[i];
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

    // Write컴포넌트에서 작성한 폼값을 전달받기 위한 함수를 정의해 Props로 전달
    articleComp = <ArticleWrite writeAction={(t,w,c)=>{
      console.log("App.js",t,w,c);

      // 작성일을 생서하기 위해 Date객체 생성
      let dateObj = new Date();
      // 연도
      var year = dateObj.getFullYear();
      // getMonth(): 현재 월을 반환해주는 함수, 0~11까지를 반환하므로 1을 더해줘야함
      var month = ("0" + (1+dateObj.getMonth())).slice(-2);
      // getDate(): 현재 날짜를 반환
      var day = ("0" + dateObj.getDate()).slice(-2);
      /*
      현재 월과 일이
        한자리인 경우: 07 과 같이 설정
        두자리인 경우: 012로 표현되므로 끝에서 두자리만 잘라냄
        따라서 0000-00-00의 포맷
      */
      let nowDate = year + "-" + month + "-" + day;

      /* 추가할 객체 생성. 새로운 게시물의 일련번호는 NextNo을 통해 사용하면되므로 4부터 시작함. */
      let addBoardData = {no:nextNo, title:t, writer:w, contents:c, date:nowDate};

      // 추가방법1.
      // 스프레드 연산자로 복사본 배열 데이터를 하나 생성한다.
      let copyBoardData = [...boardData];
      // 복사된 배열에 새로운 객체(데이터)를 추가한다.
      copyBoardData.push(addBoardData);
      // 복사된 배열로 기존 State를 변경한다.
      setBoardData(copyBoardData);
      // 그러면 React가 State의 변화를 감지해 새롭게 렌더링함

      /*
      React는 State가 변경될때 원본배열을 사용하면 변경을 감지하지 못하여 재렌더링이 되지않는다.
      따라서 배열의 복사본을 만든 후 값을 추가(변경)하고 이를 통해 State를 변경해야한다.
      */

      // 추가방법2
      // 원본배열에 새로운 객체를 추가
      // boardData.push(addBoardData);
      // console.log(boardData);
      // 원본배열로 State를 변경
      // setBoardData(boardData);

      // 일련번호로 사용하는 State를 1 증가
      setNextNo(nextNo +1);
      // 글쓰기가 완료되면 화면을 목록으로 전환
      setMode('list');
    }}></ArticleWrite>
  }
  else if (mode==='delete'){
    // 삭제1
    // 새로운 빈 배열 생성
    let newBoardData = [];
    // 데이터 크기만큼 반복
    for (let i=0 ; i<boardData.length ; i++){
      // 삭제할 일련번호와 일치하지 않는 객체를 검색
      if (no !== boardData[i].no){
        // 검색된 객체를 새로운 배열에 추가
        newBoardData.push(boardData[i]);
      }
      // 따라서 삭제할 객체는 배열에 추가되지 않는다.
    }
    // 복사본 배열을 통해 State를 변경한다
    setBoardData(newBoardData);

    // 삭제2
    // 원본 배열에서 splice함수를 통해 선택한 객체를 삭제
    // for (let i=0 ; i<boardData.length ; i++){
    //   if (no !== boardData[i].no){
    //     boardData.splice(i, 1);
    //   }
    // }

    // 삭제가 완료되면 리스트로 전환
    setMode('list');
  }
  else if(mode==='edit'){
    titleVar = '게시판-수정(props)';

    navComp = <NavEdit 
      onChangeMode={()=>{
        setMode('list');
      }}
      onBack={()=>{
        setMode('view');
        setNo(no);
      }}></NavEdit>

    // 선택한 게시물을 검색
    for (let i=0 ; i<boardData.length ; i++){
      if (no !== boardData[i].no){
        selectRow = boardData[i];
      }
    }

    // 게시물 객체를 Props로 전달
    articleComp = <ArticleEdit selectRow={selectRow}></ArticleEdit>
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
