// 컴포넌트 모듈화를 위해 React임포트
import React from "react";

// 함수형 컴포넌트는 일반적인 JS함수와같이 정의
function ListComponent(props){
  // 컴포넌트에서 표현해야할 UI를 return문 내부에 기술 (클래스형 컴포넌트의 render()함수와 동일한 역할)
  return (
    <>
    {/* JSX를 표현할때는 최상위 엘리먼트가 반드시 하나여야 하므로
    <></> 와 같은 프레그먼트를 사용 */}
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        <a href="/" onClick={(event)=>{
          // 이벤트 객체를 통해 click이벤트를 차단
          event.preventDefault();
          /*
          부모가 전달한 Props를 통해 자식쪽의 데이터를 전달
          즉, 부모에서 전달한 함수를 호출함으로써 자식은 부모쪽으로 데이터를 전달할 수 있음
          */
          props.changeMode('write');
        }}>글쓰기</a>
      </nav>
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
            <tr>
              <td class="cen">1</td>
              <td> 
                <a href="/" onClick={(event)=>{
                  event.preventDefault();
                  props.changeMode('view');
                }}>오늘은 React공부하는날</a>
              </td>
              <td class="cen">낙짜쌤</td>
              <td class="cen">2030-05-05</td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default ListComponent;