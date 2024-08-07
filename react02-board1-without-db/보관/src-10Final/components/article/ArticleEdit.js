import React, { useState } from "react";
/*
수정페이지를 구성하기 위해 기존 데이터를 Props로 전달받아
<input> 태그의 value 속성값으로 설정.
하지만 이 경우 readOnly 속성으로 렌더링되어 기존의 내용을 수정할 수 없게 된다.
React에서 Props는 부모가 자식에게 전달하는 파라미터로 '읽기전용'이기 때문이다. (Top-down 방식)

==> 위와 같은 문제로 Props를 State에 저장한 후 onChange이벤트핸들러를 통해 설정된
내용을 수정할 수 있도록 변경한다.
*/

// 게시판 작성
function ArticleEdit(props){
/*
<input>태그의 개수만큼 State 생성.
Props로 전달된 데이터를 각 State에 저장.
이렇게하면 Props는 그 값을 동일하게 유지하게 되고, 복사본인 State만 변경되는 구조가 된다.
*/
  const [title, setTitle] = useState(props.selectRow.title);
  const [writer, setWriter] = useState(props.selectRow.writer);
  const [contents, setContents] = useState(props.selectRow.contents);


  return(
    <article>
      {/* 수정페이지의 폼값처리는 쓰기페이지와 동일 */}
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
              {/* value 속성값은 State로 저장된 값을 설정. 
              Change 이벤트를 통해 입력값을 변경한다. */}
              <th>작성자</th>
              <td>
                <input type="text" name="writer" value={writer} onChange={(event)=>{
                setWriter(event.target.value)}}/>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
              <input type="text" name="title" value={title} onChange={(event)=>{
                setTitle(event.target.value)}}/>
              </td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>
                <textarea name="contents" rows="3" value={contents}
                onChange={(event)=>{
                  setContents(event.target.value)
                }}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="수정하기"/>
      </form>
    </article>
  );
}

export default ArticleEdit;