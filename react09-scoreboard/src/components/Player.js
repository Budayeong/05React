import React, { useState } from "react";
import Counter from '../components/Counter';
import EditPlayerForm from '../components/EditPlayerForm';

export default function Player(props) {
  let row = props.playerData;

  const [showEdit, setShowEdit] = useState(false);

  // State를 통해서 컴포넌트를 State에 따라 출력하거나 출력하지않음
  let editForm;
  if (showEdit === false)
    editForm = '';
  else
    editForm = <EditPlayerForm playerName={row.name} playerIdx={row.idx} onEditPlayer={props.onEditPlayer}
    showEdit={showEdit} setShowEdit={setShowEdit}/>;
  

  return (<>
    <div className="player">
      <span className="player-name">
        <button className="remove-player" onClick={() => {
          if(window.confirm('삭제할까요?'))
            props.onDeletePlayer(row.idx);
        }}> x </button>
        {/* row.name을 누를때, setShowEdit 설정을 반대로 설정해 수정창이 보여지고있으면 끄고, 꺼져있으면 보여줌 */}
        <a href="/" onClick={(e)=>{
          e.preventDefault();
          setShowEdit(!showEdit);
        }}>{row.name}</a>
      </span>
      {/* App컴포넌트에서 전달받은 점수변경 함수를 자식 컴포넌트로 전달  */}
      <Counter idx={row.idx} score={row.score} onChangeScore={props.onChangeScore}/>
    </div>
    {editForm}
  </>);
}