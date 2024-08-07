import React, { useState } from "react";

// 함수의 선언과 동시에 export
export default function ModifyPlayerForm(props) {
  const [playerName, setPlayerName] = useState(props.playerName);

  return (<>
    <form className="form" noValidate onSubmit={(e)=>{
      e.preventDefault();
      let playerName = e.target.player.value;
      // props으로 받은 수정할 데이터의 idx와 수정할 이름을 onEditPlayer함수에 넘김
      props.onEditPlayer(props.playerIdx, playerName);
      // 수정박스를 안보이게 하기위해 showEdit 설정
      props.setShowEdit(false);
    }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={(e)=>{
          setPlayerName(e.target.value);
        }} value={playerName} />
        {/* value에 props로 받은 값을 바로 넣으면 readOnly이기때문에 변경 불가능.
        props로 받은 값을 State로만들어서 넣어준다. */}
      <input type="submit" className="input" value="Edit"/>
    </form>
  </>);
}