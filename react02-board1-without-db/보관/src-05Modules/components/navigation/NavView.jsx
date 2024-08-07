import React from "react";

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

export default NavView;