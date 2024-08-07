import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function View(props){
  // 페이지 이동을 위한 훅
  const navigate = useNavigate();

  // 중첩라우터로 처리된 경로에서 전달되는 idx값을 얻어오기 위해 Hook 생성
  let params = useParams();
  console.log("idx", params.idx);

  // 빈 객체를 초기값으로 State생성
  let [boardData, setBoardData] = useState({});
  // 요청 URL과 쿼리스트링을 나눠서 정의 (그냥 길어서)
  let requestUrl = "http://nakja.co.kr/APIs/php7/boardViewJSON.php";
  let parameter = "tname=nboard_javascript&idx="+params.idx;

  // API 요청
  useEffect(function(){
    fetch(requestUrl+"?"+parameter)
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        // 콜백데이터로 State 변경
        setBoardData(json);
      });
      return ()=>{
        console.log('useEffect실행=>컴포넌트 언마운트');
      }
  },[]);


  return(
    <>
      <header>
        <h2>게시판 - 읽기</h2>
      </header>
      <nav>
        <Link to="/list">목록</Link>
        <Link to={"/edit/"+params.idx}>수정</Link>
        <Link to="/delete" onClick={()=>{
          if(window.confirm('삭제하시겠습니까?')){
            console.log('삭제idx', params.idx);
            fetch("http://nakja.co.kr/APIs/php7/boardDeleteJSON.php",{
              method: 'POST',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
              },
              body: new URLSearchParams({
                tname: 'nboard_javascript',
                idx : params.idx,
              }),
            })
            .then((result)=>{
              return result.json();
            })
            .then((json)=>{
              console.log(json);
              if(json.result==='success'){
                alert('삭제되었습니다.');
                navigate("/list");
              }
              else{
                alert('삭제에 실패했습니다');
              }
            });
          }
        }}>삭제</Link>
      </nav>
      <article>
        <table id="boardTable">
          <colgroup>
            <col width="30%" /><col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>작성자</th>
              <td>{boardData.name}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{boardData.subject}</td>
            </tr>
            <tr>
              <th>날짜</th>
              <td>{boardData.regdate}</td>
            </tr>
            <tr>
              <th>내용1</th>
              {/* HTML 태그가 그대로 출력됨 */}
              <td>{boardData.content}</td>
            </tr>
            <tr>
              <th>내용2</th>
              {/* 마크업이 적용된 상태로 출력됨 */}
              <td dangerouslySetInnerHTML={{__html: boardData.content}}></td>
            </tr>
          </tbody>
        </table>
      </article>
    </>
  );
}

export default View;