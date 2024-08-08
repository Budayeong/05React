import React, { useEffect, useState } from "react";
import { realtime } from '../realtimeConfig';
import { ref, onValue } from 'firebase/database';
import Navi from '../components/Navi';

function Listener() {

  console.log('aa.realtime', realtime);

  // State생성(출력 데이터 저장)
  const [fireData, setFireData] = useState([]);
  // users노드를 참조한 객체
  const dbRef = ref(realtime,'users');

  // useEffect를 사용해 렌더링 완료 후 함수 실행
  useEffect(()=>{
    /*
    onValue()
      : 겨올의 데이터를 읽고 변경사항을 감지하기 위해 수신 대기함.
      이벤트 발생 시점엔 특정 경로에 있는 콘텐트의 정적 스냅샷을 읽는데 사용함.
      노드의 하위 요소를 포함해 데이터가 변경될때마다 동작함
    */
    onValue(dbRef, (snapshot) => {
      let showTr = [];
      // 데잍터 전체를 배열로 가져옴.
      snapshot.forEach((childSnapshot)=>{
        // 각 객체의 key와 value 추출
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        showTr.push(
          <tr>
            <td>{childKey}</td>
            <td>{childData.name}</td>
            <td>{childData.pass}</td>
            <td>{childData.fireKey}</td>
          </tr>
        );
      });
      console.log('bb', showTr);
      // State를 변경하여 새롭게 렌더링
      setFireData(showTr);
    });
  },[]);

  console.log('cc');

  return (
    <div className="App">
      <Navi/>
      <h2>Firebase - REealtime Database App</h2>
      <h3>02.Listener</h3>
      <table border={1} className="table table-bordered">
        <thead>
          <tr className="text-center">
            <th>아이디</th>
            <th>이름</th>
            <th>패스워드</th>
            <th>고유키</th>
          </tr>
        </thead>
        <tbody>
          {fireData}
        </tbody>
      </table>
    </div>
  );
}

export default Listener;