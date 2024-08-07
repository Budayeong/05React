import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

function List(props){
  // API 서버와의 통신을 통해 전달받은 JSON데이터를 저장하기 위한 State. 초기값은 빈배열
  let [boardData, setBoardData] = useState([]);

  useEffect(function(){
    fetch("http://nakja.co.kr/APIs/php7/boardListJSON.php?tname=nboard_javascript")
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        // 콜백데이터를 통해 State를 변경
        setBoardData(json);
      });
      return()=>{
        console.log('useEffect실행 => 컴포넌트 언마운트');
      }
  },[]);

  let lists = [];
  // for-of를 통해 JSON배열의 크기만큼 반복
  for (let row of boardData){
    // 날짜와 제목은 문자열을 적절히 잘라서 출력
    let date = row.regdate.substring(0,10);
    let subject = row.subject.substring(0,20);
    lists.push(
      <tr key={row.idx}>
        <td className="cen">{row.idx}</td>
        <td><Link to={"/view/"+row.idx}>{subject}</Link></td>
        <td className="cen">{row.name}</td>
        <td className="cen">{date}</td>
      </tr>
    );
  }

  return(
    <>
      <header>
        <h2>게시판 - 목록</h2>
      </header>
      <nav>
        <Link to="/write">글쓰기</Link>
      </nav>
      <article>
        <table id="boardTable">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* 파싱한 내용을 tbody사이에 삽입 */}
            {lists}
          </tbody>
        </table>
      </article>
    </>
  );
}

export default List;