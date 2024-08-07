import React from "react";
/*
수정페이지를 구성하기 위해 기존 데이터를 Props로 전달받아
<input> 태그의 value 속성값으로 설정.
하지만 이 경우 readOnly 속성으로 렌더링되어 기존의 내용을 수정할 수 없게 된다.
React에서 Props는 부모가 자식에게 전달하는 파라미터로 '읽기전용'이기 때문이다. (Top-down 방식)
*/
// 게시판 작성
function ArticleEdit(props){
  return(
    <article>
      <form onSubmit={(event)=>{
        event.preventDefault();

        let title = event.target.title.value;
        let writer = event.target.writer.value;
        let contents = event.target.contents.value;

        props.editAction(title, writer, contents);
      }}>
        <table id="boardTable">
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={props.selectRow.writer}/></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={props.selectRow.title}/></td>
            </tr>
            <tr>
              <th>날짜</th>
              {/* HTML에서는 <textarea>태그에 value속성을 사용하지 않지만 JSX에서는 <input>과 동일하게 이 속성을 사용해 기존값을 설정함. */}
              <td><textarea name="contents" rows="3" value={props.selectRow.contents}></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기"/>
      </form>
    </article>
  );
}

export default ArticleEdit;