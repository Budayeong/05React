import React,  {useState} from "react";
import ComEdit from "./ComEdit";

function ComList(props){
  let row = props.myData;

  const [showEdit, setShowEdit] = useState(false);

  // State를 통해서 컴포넌트를 State에 따라 출력하거나 출력하지않음
  let editForm;
  if (showEdit === false)
    editForm = '';
  else
    editForm = <ComEdit writer={row.writer} no={row.no} comment={row.comment} onEditReply={props.onEditReply}
    showEdit={showEdit} setShowEdit={setShowEdit}/>;

  return (<>
    <table id="boardTable">
      <tr>
        <td>{row.no}</td>
        <td>Writer:{row.writer}</td>
        <td>
          Date:{row.date}
          <button type="button"  onClick={(e)=>{
            e.preventDefault();
            // showEdit가 true이면 수정폼이 로드되어있는 상태임
            if (showEdit==true){
              alert('현재 수정mode입니다. 수정취소를 먼저 눌러주세요.');
              return;
            }
            // showEdit가 false이면 수정폼 로드를 위해 showEdit 설정
            setShowEdit(true);
          }}>수정</button>							
          <button type="button" onClick={() => {
            console.log(row.no);
            if(window.confirm('삭제할까요?'))
              props.onDeleteReply(row.no);
          }}>삭제</button>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="subject" style={{ whiteSpace: "pre-wrap" }}>{row.comment}</td>
      </tr>
    </table>
    {editForm}
  </>);
}

export default ComList;  
