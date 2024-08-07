import React from "react";
import { Link, useParams } from "react-router-dom";

function View(props){

  /*
  useParams: 컴포넌트를 라우터 처리할때 중첩된 구조내에서 :no와 같이
    사용된 파라미터의 값을 얻어올 수 있는 Hook
  */
  var params = useParams();
  console.log("파라미터", params.no);

  /*
  reduce() 함수는 배열의 크기만큼 반복하여 조건에 맞는 하나의 값을 반환.
    여기서는 일련번호와 일치하는 객체 데이터가 반환됨.
  */
  let vi = props.boardData.reduce((prev, curr)=>{
    /*
    초기값이 {}(빈배열)로 주어졌으므로 배열의 크기만큼 반복가능.
    조회할 게시물의 일련번호와 일치하는 객체를 찾아 prev에 저장한 후 반환함.
    */
    if(curr.no===Number(params.no)){
      prev = curr;
    }
    return prev;
  }, {});

  // 반환된 객체는 vi에 저장한 후 return에서 출력
  return(
    <>
      <header>
        <h2>게시판 - 읽기</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
        <Link to="/edit">수정</Link>
        <Link to="/delete">삭제</Link>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="30%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{vi.writer}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{vi.title}</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{vi.date}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{vi.contents}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default View;