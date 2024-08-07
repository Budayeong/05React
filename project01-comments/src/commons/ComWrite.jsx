import React from "react";

function ComWrite(props){
  return (<>
    <form onSubmit={(e)=>{
      e.preventDefault();

      let newWriter = e.target.writer.value;
      let newComment = e.target.comment.value;

      if(newWriter.trim().length==0){
        alert('이름을 입력하세요');
        e.target.writer.focus();
        return;
      }
      if(newComment.trim().length==0){
        alert('내용을 입력하세요');
        e.target.comment.focus();
        return;
      }

      // 부모에서 전달된 함수를 호출해 댓글 추가
      props.onAddReply(newWriter,newComment);
      // 다음 입력을 위해 입력란 비움
      e.target.writer.value='';
      e.target.comment.value='';
      }}>
      <table id="boardTable">
        <tr>
          <td id="writer">Writer : <input type="text" name="writer"/></td>
          <td rowspan="2"><input type="submit" value="댓글작성" id="btn"/></td>
        </tr>
        <tr>
          <td><textarea name="comment"></textarea></td>
        </tr>
      </table>        
    </form>
  </>);
}

export default ComWrite;  
