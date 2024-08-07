import React from "react";

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

export default NavList;