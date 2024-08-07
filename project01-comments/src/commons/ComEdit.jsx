import React from "react";
import {useState} from 'react';

function ComEdit(props){
  const [writer, setWriter] = useState(props.writer);
  const [comment, setComment] = useState(props.comment);

  return (<>
    <form onSubmit={(e)=>{
      e.preventDefault();
      let writer = e.target.writer.value;
      let comment = e.target.comment.value;
      // props으로 받은 수정할 데이터의 no과 수정할 이름을 onEditPlayer함수에 넘김
      props.onEditReply(props.no, writer,comment);
      // 수정 후 수정폼 안보이게
      props.setShowEdit(false);
    }}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer" onChange={(e)=>{
          setWriter(e.target.value);}} value={writer} />
            <button onClick={(e)=>{
              e.preventDefault();
              props.setShowEdit(false);
            }}>수정취소</button>
          </td>
          <td rowspan="2"><input type="submit" value="댓글수정" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment" onChange={(e)=>{
          setComment(e.target.value);}} value={comment}></textarea></td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComEdit;  
