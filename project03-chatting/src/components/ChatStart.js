import React, { useRef } from "react";

const ChatStart = () => {
  const refRoom = useRef();
  const refId = useRef();

  const openChatWin = () =>{

    const userId = refId.current.value;
    if (!userId) {
      alert("대화명을 입력해주세요");
      return;
    }

    window.open(`/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
    '','width=500,height=700');
  }

  return(
    <>
    <div className="App">
      <h2>Firebase - Realtime Database App</h2>
      방명: <input type="text" name="roomId" value="room1" ref={refRoom} /><br />
      대화명 <input type="text" name="uerId" ref={refId} /> <br />
      <button type="button" onClick={openChatWin}>채팅시작</button>
    </div>
    </>
  );
};

export default ChatStart;