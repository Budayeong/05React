import React, { useState, useRef } from "react";

export default function Stopwatch(props) {

  // 현재 스탑워치의 동작 여부
  const [timerFlag, setTimerFlag] = useState(false);
  // 타이머에서 사용할 시간
  let [ticker, setTicker] = useState(0);

  // sudvInterval 함수의 참조값을 저장후 clearInterval에서 중지할때 사용 저장한 후
  let timerRef = useRef(0);
  // 스탕ㅂ워치 시작
  const startTimer = () => {
    ticker++;
    // 1초에 한번씩 State를 변경
    timerRef.current = setInterval(()=>{
      console.log('틱톡');
      setTicker(ticker++);
    },1000);
  }

  // 스탑워치 중지(Timer변수를 이용. 여기서는 Ref를 사용함)
  const stopTimer = () => {
    clearInterval(timerRef.current);
  }
  console.log('timerRef', timerRef);
  
  return (<>
    <div className="stopwatch">
      <h1 className="h1">StopWatch</h1>
      <span className="stopwatch-time">{ticker}</span>
      {/* 시작/중지 버튼 */}
      <button onClick={()=>{ 
        // 시작/중지를 토글해서 State에적용
        setTimerFlag(!timerFlag) ;
        (timerFlag === true) ? stopTimer() : startTimer();
      }}>{(timerFlag === false) ? 'Start' : 'Stop'}</button>
      {/* Reset버튼 */}
      <button onClick={()=>{ 
        if(timerFlag===true) {
          // 타이머가 동작중이면 경고창을 띄움
          alert('StopWatch가 동작중입니다');
        }
        else 
          setTicker(0);
      }}>Reset</button>
    </div>
  </>);
}