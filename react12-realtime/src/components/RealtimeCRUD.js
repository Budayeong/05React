import React, { useState } from "react";
import { realtime } from '../realtimeConfig';
import { ref, set } from 'firebase/database';
import { getDatabase, child, get, push, update, remove } from "firebase/database";
import Navi from '../components/Navi';

function RealtimeCRUD() {
  console.log('realtime', realtime);

  /*
  데이터 쓰기
  - set(): 기본 쓰기 작업에 사용. 지정된 참조에 데이터를 저장하고
    해당 경로의 기존 데이터를 모두 변경 가능.  
  */
  function writeUserData(userId, userName, userPass){
    // 등록을 위한 새로운 키 값 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    /*
    최상위 노드를 users로 하고 하위는 사용자가 입력한 ID로 데이터를 구분하여 입력.
    만약 아이디가 동일하면 덮어쓰기됨.
    */
    set(ref(realtime, 'users/'+userId), {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    });
    console.log('입력성공');
  }

  // 데이터 읽기
  function readUserData(userId){
    // 데이터베이스 얻어오기
    const dbRef = ref(getDatabase());
    // 노드에 등록된 아이디가 있는지 확인 후 데이터를 가져옴
    get(child(dbRef, `users/${userId}`))
    .then((snapshot)=>{
      if(snapshot.exists()){
        // 데이터가 존재하는 경우 콘솔에 출력
        console.log(snapshot.val());
      }
      else {
        console.log("No data available");
      }
    })
    .catch((error)=>{
      console.error(error);
    });
  }

  // 데이터 수정
  function editUserData(userId, userName, userPass){
    // 고유키 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    // 수정할 데이터를 객체형식으로 작성
    const postData = {
      name: userName,
      pass: userPass,
      fireKey: newPostKey
    };

    // 아이디로 지정된 데이터를 찾아서 수정
    const updates = {};
    updates['/users/' + userId] = postData;
    return update(ref(realtime), updates); 
  }

  // 데이터삭제1
  function deleteUserData1(userId){
    // 기존 데이터를 null값으로 대체해서 삭제
    const deletes = {};
    deletes['/users/' + userId] = null;
    return update(ref(realtime), deletes);
  }

  // 데이터 삭제2
  function deleteUserData2(userId){
    // remove 함수를 통해 데이터 삭제
    remove(ref(realtime, 'users/' + userId))
    .then(()=>{
      console.log('삭제완료');
    })
    .catch((error)=>{
      console.error('삭제실패', error);
    });
  }


  // 입력을 위한 State. <input>의 스핀박스를 누를때마다 변경됨
  const [addNum, setAddNum] = useState(0);

  // 테스트를 위해 변화하는 값을 id,name,pass에 붙여 하나의 값으로 여러개의 값을 만들어냄
  // 입력 데이터로 변경된 State가 즉시 적용됨
  let adder = "-"+addNum;
  const id = 'dowoon'+adder;
  const name = '윤도운'+adder;
  const pass = '123'+adder;

  return (
    <div className="App">
      <Navi></Navi>
      <h2>Firebase - Realtime Database App</h2>
      <h3>01.CRUD</h3>
      {/* number타입의 <input>이므로 스핀박스가 생성되어 변경할 수 있음 */}
      <input type="number" value={addNum} onChange={(e)=>{setAddNum(e.target.value);}} />
      <input type="button" value='입력' onClick={()=>{
        writeUserData(id,name,pass);
      }}/>
      <input type="button" value='읽기' onClick={()=>{
        readUserData(id);
      }}/>
      <input type="button" value='수정' onClick={()=>{
        editUserData(id, name+'edit', pass+'edit');
      }}/>
      <input type="button" value='삭제1' onClick={()=>{
        deleteUserData1(id);
      }}/>
      <input type="button" value='삭제2' onClick={()=>{
        deleteUserData2(id);
      }}/>
    </div>
  );
}

export default RealtimeCRUD;