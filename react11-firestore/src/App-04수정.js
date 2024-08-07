import './App.css';
import { firestore } from './firestoreConfig';
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

function App() {
  // console.log("firestore", firestore);

  // 날짜 생성 함수
  const nowDate = () => {
    let dateObj = new Date();
    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let day = ('0' + dateObj.getDate()).slice(-2);
    return year + '-' + month  + '-' + day;
  }

  // 도큐먼트 수정을 위한 함수(쓰기와 동일. 내용이 바뀌면 자동으로 수정처리)
  const memberEdit = async (p_collection, p_id, p_pass, p_name) => {
    await setDoc(doc(firestore, p_collection, p_id), {
      /*
      doc(파이어스토어, 컬렉션명, 도큐먼트명), { 수정할 내용을 JSON객체로 기술 }
      */
      id: p_id,
      pass: p_pass,
      name: p_name,
      regdate: nowDate(),
    });
    console.log("수정성공");
  }

  // <select> 태그의 내용을 추가하기위한 State
  const [showData, setShowData] = useState([]);

  // useEffect: 화면의 렌더링이 완료된 후 호출되는 훅
  useEffect(()=>{
    const getCollection = async () => {
      let trArray = [];
      // 컬렉션 members를 가져옴.
      const querySnapshot = await getDocs(collection(firestore, "members"));
      // 도큐먼트의 개수만큼 반복해서 <option>태그 추가
      querySnapshot.forEach((doc)=>{
        let memberInfo = doc.data();
        // <option>의 value는 아이디, text는 이름으로 설정
        trArray.push(
          <option key={doc.id} value={doc.id}>{memberInfo.name}</option>
        );
      });
      return trArray;
    }
    // 함수 호출 후 콜백된 데이터를 then절에서 처리
    getCollection().then((result)=>{
      console.log('result', result);
      // State를 변경해 <select>태그에 <option>추가
      setShowData(result);
    });
  },[]);

  // <input>에 설정된 값은 State를 통해 변경해야하므로 input 개수만큼 추가
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 수정하기</h3>
      {/* 항목 하나를 선택하면 change이벤트가 발생함 */}
      <select onChange={async (e)=>{
        // 선택항목의 value(=아이디) 얻어옴
        let user_id = e.target.value;
        console.log("선택", user_id);

        // 컬렉션명과 아이디(도큐먼트)를 통해 값을 얻어옴
        const docRef = doc(firestore, "members", user_id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          // 해당 도큐먼트가 존재하면 데이터 인출 후
          console.log("Document data:", docSnap.data());
          let callData = docSnap.data();
          // State를 변경해 <input>에 내용 설정
          setId(user_id);
          setPass(callData.pass);
          setName(callData.name);
        }
        else {
          console.log("No such document!");
        }
      }}>
        <option value="">선택하세요</option>
        {showData}
      </select>
      <form onSubmit={(event)=>{
        event.preventDefault();

        // submit 이벤트가 발생하면 폼값을 얻어옴
        let collection = event.target.collection.value;
        let id = event.target.id.value;
        let pass = event.target.pass.value;
        let name = event.target.name.value;

        // 빈값에 대한 검증
        if(id===''){alert('사용자를 먼저 선택해주세요'); return;}

        // 수정을 위한 함수 호출
        memberEdit(collection, id, pass, name);

        // 수정 완료 후 입력폼 비움
        event.target.id.value='';
        event.target.pass.value='';
        event.target.name.value='';
      }}>
        <table className='table table-bordered table-striped'>
          <tr>
            <td>컬렉션(테이블)</td>
            <td><input type="text" name='collection' value="members"/></td>
          </tr>
          <tr>
            <td>아이디(변경불가)</td>
            <td><input type="text" name='id' value={id} onChange={(event)=>{
              setId(event.target.value);
            }} readOnly/></td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td><input type="text" name='pass' value={pass} onChange={(event)=>{
              setPass(event.target.value);
            }}/></td>
          </tr>
          <tr>
            <td>이름</td>
            <td><input type="text" name='name' value={name} onChange={(event)=>{
              setName(event.target.value);
            }}/></td>
          </tr>
        </table>
        <button type='submit'>수정</button>
      </form>
    </div>
  );
}

export default App;
