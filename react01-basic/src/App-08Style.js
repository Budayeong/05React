import './App.css';

/*
JSX에서 스타일을 적용하는 방법
- class 속성은 className으로 변경. JS에서 이미 예약어로 사용되고 있기 때문
- id속성은 그대로 사용할 수 있다. 
- style속성을 통해 부여할때는 컬리브레이스(콧수염괄호)를 사용하여 JSON객체 형태로 기술한다
- 외부 css파일에 스타일시트를 정의한 후 적용할 수 있다.
- index.html / index.css / App.css파일을 사용할 수 있다.
*/

function App() {
  // JSON객체로 스타일 정의
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding:"10px",
    fontFamily:"Verdana"
  };

  return (
    <div className="App">
      <h2>React-Style지정하기</h2>    
      <ol>
        {/* style속성을 직접 부여할때는 아래와 같이 컬리브레이스 사용 */}
          <li style={{color:"red"}}>프론트앤드</li>
          {/* JSON객체로 정의한 속성을 부여 */}
          <ul style={mystyle}>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>Javascript</li>
              <li>jQuery</li>
          </ul>
          {/* App.css에 정의한 스타일시트 적용 */}
          <li className='backEnd'>백앤드</li>
          <ul>
              <li id='backEndSub'>Java</li>
              {/* class속성을 사용하면 에러가 발생하진 않으나 경고가 뜨므로
              권고사항대로 className 사용 */}
              <li class='warnings'>Oracle</li>
              <li>JSP</li>
              <li>Spring Boot &nbsp;
                <button className="btn btn-warning">Spring.io바로가기</button>
              </li>
          </ul>
      </ol> 
    </div>
  );
}

export default App;
