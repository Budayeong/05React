import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit(props){
  // 페이지 이동을 위한 훅
  const navigate = useNavigate();

  // 중첩라우터로 처리된 경로에서 전달되는 idx값을 얻어오기 위해 Hook 생성
  let params = useParams();
  console.log("idx", params.idx);
  
  // 요청 URL과 쿼리스트링을 나눠서 정의 (그냥 길어서)
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_javascript&idx="+params.idx;

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [contents, setContents] = useState('');

  // API 요청
  useEffect(function(){
    fetch(requestUrl+"?"+parameter)
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        setWriter(json.name);
        setTitle(json.subject);
        setContents(json.content);
      });
      return ()=>{
        console.log('useEffect실행=>컴포넌트 언마운트');
      }
  },[]);

  return(
    <>
      <header>
        <h2>게시판 - 수정</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
      </nav>
      <article>
        <form onSubmit={(event)=>{
          event.preventDefault();

          let i = event.target.idx.value;
          let w = event.target.writer.value;
          let t = event.target.title.value;
          let c = event.target.contents.value;

          fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php', {
              // 전송방식
              method: 'POST',
              // enctype(전송 시 인코딩 방식)과 charset지정
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },

              body: new URLSearchParams({
                tname: 'nboard_javascript',
                id: 'jsonAPI',
                name: w,
                subject: t,
                content: c,
                idx: i,
              }),
            })
            .then((response)=> response.json())
            .then((json) => console.log(json));

            // 글쓰기가 완료되면 목록으로 이동
            navigate("/view/"+params.idx);
        }}> 
          <input type="hidden" name='idx' value={params.idx}/>
          <table id="boardTable">
            <tbody>
              <tr>
                <th>작성자</th>
                <td><input type="text" name="writer" value={writer} onChange={(event)=>{
                  setWriter(event.target.value);
                }}/></td>
              </tr>
              <tr>
                <th>제목</th>
                <td><input type="text" name="title" value={title} onChange={(event)=>{
                  setTitle(event.target.value);
                }}/></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea name="contents" cols="22" rows="3" value={contents} onChange={(event)=>{
                  setContents(event.target.value);
                }}></textarea></td>
              </tr>
            </tbody>
          </table>
          <input type="submit" value="전송"/>
        </form>
      </article>
    </>
  );
}

export default Edit;