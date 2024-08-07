import React from "react";

function WriteComponent(props){
  return (
    <>
      <header>
          <h2>게시판 - 작성</h2>
      </header>
      <nav>
      <a href="/" onClick={(event)=>{
          event.preventDefault();
          props.changeMode('list');
        }}>목록</a>
      </nav>
      <article>
        <form action="">
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
                <td><textarea type="content" cols="22" rows="3"></textarea></td>
              </tr>
            </tbody>
          </table>
          {/* JSX는 유사 HTML 문법을 사용하므로 반드시 Pair(쌍)을 이뤄야함.
          따라서 <input> 태그도 아래와 같이 작성한다. */}
          <input type="submit" value="전송"/>
        </form>
      </article>
    </>
  );
}

export default WriteComponent;