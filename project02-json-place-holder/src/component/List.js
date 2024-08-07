import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function List(props){
  // API 서버와의 통신을 통해 전달받은 JSON데이터를 저장하기 위한 State. 초기값은 빈배열
  let [boardData, setBoardData] = useState([]);
  // url 변경을 위한 State
  let [urlPage, setUrlPage] = useState(100); // 초기값은 100
  let url = `https://jsonplaceholder.typicode.com/albums/${urlPage}/photos`;

  // api fetch
  useEffect(function(){
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setBoardData(json);
        console.log('list현재 url',url);
      });
  },[urlPage]);

  let lists = [];
  // for-of를 통해 JSON배열의 크기만큼 반복
  for (let row of boardData){
    lists.push(
      <tr key={row.id}>
        <td className="cen">
          <Link to={"/view/"+row.id+"/"+urlPage}>
            <img src={row.thumbnailUrl}/>
          </Link>
        </td>
        <td className="cen">
          <Link to={"/view/"+row.id+"/"+urlPage}>
            {row.title}
          </Link>  
        </td>
      </tr>
    );
  }

  // 선택 값 변경 핸들러
  const handleSelectChange = (event) => {
    setUrlPage(event.target.value);
  };

  let page = [];
  for (let i=1 ; i<=100 ; i++){
    page.push(
      <option value={i}>{i}</option>
    );
  }

  return(
    <>
      
      <div className="child scroll">
        <select id="number-select" name="number" value={urlPage} onChange={handleSelectChange}>
          {page}
        </select>
        <header>
          <h2>연락처 API 연동하기</h2>
        </header>
        {/* <nav>
          <Link to="/write">글쓰기</Link>
        </nav> */}
        <article>
          <table id="boardTable">
            <thead>
              <tr>
                <th>Photo</th>
                <th>title</th>
              </tr>
            </thead>
            <tbody>
              {/* api 내용 삽입 */}
              {lists}
            </tbody>
          </table>
        </article>
      </div>
    </>
  );
}

export default List;