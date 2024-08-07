import './App.css';
import React, { useState, useEffect } from 'react';

function MyCommunication(props){
  /* 외부 서버의 API를 얻어오기 위해 State생성. 초기값은 JSON의 포맷에 따라
  달라질 수 있으므로 확인 후 설정하는 것이 좋음. */
  var [myJSON, setmyJSON] = useState({results:[]});

  useEffect(function(){
    // API 서버에서 10명의 정보를 JSON으로 콜백받음
    fetch("https://api.randomuser.me/?results=5")
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        // 콜백데이터를 통해 State 변경
        setmyJSON(json);
      });
    return ()=>{
      console.log('#Life', 'useEffect실행=>컴포넌트 언마운트');
    }
  },[]);
  /*
  useEffect()의 두번째 인자인 의존성배열에 빈 배열을 설정한다.
  지정하지 않으면 렌더링마다 다시 실해오디므로 무한루프에 빠지게된다
  */

let trTag = [];
// 결과데이터의 개수만큼 반복해 <tr>태그를 구성
for(let i=0 ; i<myJSON.results.length ; i++){
  let data = myJSON.results[i];
  // 현재 루프의 객체에서 필요한 정보를 파싱한 후 구성
  trTag.push(
    <tr key={data.login.md5}>
      <td><img src={data.picture.thumbnail} alt='{data.login.username}' /></td>
      {/* 아이디를 클릭하면 Props로 전달된 함수를 통해 현재 루프의 객체를 그대로 인자로 전달함. */}
      <td><a href="/" onClick={(e)=>{
        e.preventDefault();
        props.onProfile(data);
      }}>{data.login.username}</a>
      </td>
      <td>{data.name.title} {data.name.first} {data.name.last}</td>
      <td>{data.nat}</td>
      <td>{data.email}</td>
    </tr>
  );
}

// UI 렌더링
return(
  <div>
    <table border='1'>
      <thead>
        <tr>
          <th>사진</th>
          <th>로그인</th>
          <th>이름</th>
          <th>국가</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{trTag}</tbody>
    </table>
  </div>
  );
}

function App() {   
  return (
    <div className="App">
      <h2>React - 외부서버통신</h2>
      {/* 링크를 클릭하면 정보를 파싱한 문자열을 alert로 출력한다 */}
      <MyCommunication onProfile={(sData)=>{
        console.log(sData);
        // 정보출력을 위한 문자열은 백틱 기호르 이용해 + 기호없이 연결가능
        let info = `전화번호:${sData.cell}
        성별:${sData.gender}
        username:${sData.login.username}
        password:${sData.login.password}`;
        alert(info);
      }} />
    </div>
  );
}

export default App;