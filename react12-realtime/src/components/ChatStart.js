import React, { useRef } from "react";
import Navi from '../components/Navi';

const ChatStart = () => {
  // input태그의 DOM 활용을 위해 userRef 훅 생성
  const refRoom = useRef();
  const refId = useRef();

  // open함수를 통해 채팅창을 팝업으로 열어줌
  const openChatWin = () =>{
    /*
    open(): JS에서 새로운팝업창을 열때 사용하는 함수
      -팝업창으로 <ChatMessage>컴포넌트를 렌더링한다.
    */
    window.open(`/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
    '','width=500,height=700');
  }

  return(
    <>
    <div className="App">
      <Navi/>
      <h2>Firebase - REealtime Database App</h2>
      {/* <input>태그에 앞서 생성한 ref변수를 추가해 DOM에 접근한다 */}
      방명: <input type="text" name="roomId" value="room1" ref={refRoom} /><br />
      대화명 <input type="text" name="uerId" ref={refId} /> <br />
      <button type="button" onClick={openChatWin}>채팅시작</button>
    </div>
    </>
  );
};

export default ChatStart;