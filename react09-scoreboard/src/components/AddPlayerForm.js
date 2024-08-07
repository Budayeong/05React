import React from "react";

// 함수의 선언과 동시에 export
export default function AddPlayerForm(props) {
  return (<>
    <form className="form" noValidate onSubmit={(e)=>{
      e.preventDefault();
      // Event객체의 target을 통해 입력한 이름을 얻어옴
      let playerName = e.target.player.value;

      // 입력값이 없는 경우 경고창을 띄우고 포커스 이동 후 중지
      if(playerName.trim().length==0){
        alert('이름을 입력하세요');
        e.target.player.focus();
        return;
      }

      // 부모에서 전달된 함수를 호출해 플레이어 추가
      props.onAddPlayer(playerName);
      // 다음 입력을 위해 입력란 비움
      e.target.player.value='';
    }}>
      <input type="text" name="player" minLength="10" className="input" 
        placeholder="이름을 추가하세요" required onChange={()=>{}} />
      <input type="submit" className="input" value="Add Player"/>
    </form>
  </>);
}