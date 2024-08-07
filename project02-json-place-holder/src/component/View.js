import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function View(props){
  // 경로에서 전달된 id값 가져옴
  let params = useParams();
  console.log("id", params.id);
  console.log("page", params.page);

  // 빈 객체를 초기값으로 State생성
  let [boardData, setBoardData] = useState({});

  let url = `https://jsonplaceholder.typicode.com/albums/${params.page}/photos?id=${params.id}`;
  console.log('요청url', url);

  // API 요청
  useEffect(function(){
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if(params.id!==undefined){
          setBoardData(json[0]);
        }
      });
  },[params.id]);


  return(
    <>
      <div className="child">
        <header>
          <h2>게시판 - 읽기</h2>
        </header>
        <article>
          <table id="boardTable">
            <colgroup>
              <col width="30%" /><col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>albumId</th>
                <td>{boardData.albumId}</td>
              </tr>
              <tr>
                <th>id</th>
                <td>{boardData.id}</td>
              </tr>
              <tr>
                <th>title</th>
                <td>{boardData.title}</td>
              </tr>
              <tr>
                <th>url</th>
                <td>{boardData.url}</td>
              </tr>
              <tr>
                <th>thumbnailUrl</th>
                <td>
                  <img src={boardData.thumbnailUrl}/>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>    
    </>
  );
}

export default View;