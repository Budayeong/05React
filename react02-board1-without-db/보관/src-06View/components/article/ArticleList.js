import React from "react";

// 게시판 목록
function ArticleList(props){
  const lists = [];
  for(let i=0 ; i<props.boardDate.length ; i++){
    let row = props.boardDate[i];
    lists.push(
      <tr key={row.no}>
        <td className="cen">{row.no}</td>
        <td><a href={'/read/'+row.no} onClick={(event)=>{
          event.preventDefault();
          // 제목 클릭 시 게시물의 일련번호를 부모로 전달
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className='cen'>{row.writer}</td>
        <td className='cen'>{row.date}</td>
      </tr>
    );
  }

  return(
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
          {lists}
        </tbody>
      </table>
    </article>
  );
}

export default ArticleList;