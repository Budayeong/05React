import '../Chat.css'
import React, { useRef, useEffect, useState } from "react";
import { realtime } from '../realtimeConfig';
import { ref, child, set, onValue, push, serverTimestamp } from 'firebase/database';
import { useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const scrollTop = (chatWindow) => {
  console.log('scrollTop 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function ChatMessage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  const chatWindow = useRef();
  const [chatData, setChatData] = useState('');

  // 현재시간 
  function nowDateStr(){
    let today = new Date();
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let hours = ('0' + today.getHours()).slice(-2); 
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2); 
    return year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
  }

  function messageWrite(chatRoom, chatId, chatMessage, time){
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: chatMessage,
      time: time
    });
    console.log('입력성공');
  }

  const dbRef = ref(realtime, roomId);
  useEffect(()=>{
    onValue(dbRef, (snapshot) => {
      let showDiv = [];
      snapshot.forEach((childSnapshot)=>{
        const childData = childSnapshot.val();

        // 내가보낸 메시지인 경우
        if(childData.id === userId){
          // 메시지를 우측으로 정렬
          showDiv.push(
            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
              <div>
                <p className="small me-3 mb-3 rounded-3 d-flex justify-content-end fw-bold">{userId}</p>
                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">{childData.message}</p>
                <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">{childData.time}</p>
              </div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                alt="avatar 1"
                style={{ width: '45px', height: '100%' }}
              />
            </div>
          );
        }
        else {
          // 상대방이 보낸 메시지는 좌측으로 정렬
          showDiv.push(
            <div className="d-flex flex-row justify-content-start">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                alt="avatar 1"
                style={{ width: '45px', height: '100%' }}/>
              <div>
                <p className="small ms-3 mb-3 rounded-3 fw-bold">{childData.id}</p>
                <p className="small p-2 ms-3 mb-1 rounded-3 bg-secondary bg-opacity-10">{childData.message}</p>
                <p className="small ms-3 mb-3 rounded-3 text-muted">{childData.time}</p>
              </div>
            </div>
          );
        }
        // 스크롤바를 제일 아래로 내려줌
        scrollTop(chatWindow.current);
      });
      // State를 변경해서 대화내역을 새롭게 렌더링함.
      setChatData(showDiv);
    });
  },[]);
  
  return(
    <>
    <div className="App">
      <div className="container py-5" >
        <div className="row d-flex justify-content-center" >
          <div className="col-md-10 col-lg-8 col-xl-6">
            <div className="card" id="chat2">
              <div className="card-header d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0">Realtime 채팅</h5>
                <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-sm" data-mdb-ripple-color="dark" onClick={()=>{window.self.close();}}>채팅종료</button>
              </div>
              <div className="card-body" style={{ position: 'relative', height: '700px' }} id="chatWindow" ref={chatWindow} >
                {chatData}
              </div>
              <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3" >
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  let chatRoom = e.target.chatRoom.value;
                  let chatId = e.target.chatId.value;
                  let time = nowDateStr();
                  if(chatId===''){
                    alert('대화명을 입력하세요');
                    return;
                  }
                  let message = e.target.message.value;
                  if(message===''){
                    alert('메시지를 입력하세요');
                    return;
                  }
                  console.log('submit', chatRoom, chatId, message);
                  messageWrite(chatRoom, chatId, message, time);
                  e.target.message.value = '';
                }}
                className="w-100"
                >
                  <div className="input-group">
                    <input type="hidden" name="chatRoom" value={roomId} />
                    <input type="hidden" name="chatId" value={userId} />
                    <input type="text" name="message" className="form-control form-control-lg"
                    placeholder="메시지를 작성하세요" />
                    <button type="submit" className="btn btn-primary btn-sm" data-mdb-ripple-color="dark"><i className="fas fa-paper-plane"></i></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatMessage;