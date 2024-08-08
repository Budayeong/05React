import './App.css';
import { useState, useEffect } from 'react';
import { storage } from './storageConfig';
import { ref, listAll, deleteObject } from 'firebase/storage';

function App() {
  const listRef = ref(storage, '');

  // State: 파일목록, 삭제이후 렌더링을 위한 변수
  const [fileLists, setFileLists] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);

  useEffect(()=>{
    let fileRows = [];
    // 생성된 참조에서 모든 폴더와 파일명 인출
    listAll(listRef)
      .then((res)=>{
        res.prefixes.forEach((folderRef)=>{
          console.log('폴더', folderRef);
        });
        // 이미지 출력
        res.items.forEach((itemRef)=>{
          // 이미지 삭제를 위한 참조를 얻어옴
          const deleteRef = ref(storage, itemRef.fullPath);
          // 파일 목록 추가
          fileRows.push(
            <tr key={itemRef.name}>
              <td>{itemRef.bucket}</td>
              <td>{itemRef.fullPath}</td>
              <td>{itemRef.name}</td>
              <td><button type='button' onClick={(e)=>{
                if(window.confirm('삭제할까요?')){
                  // 삭제를 위한 참조값을 통해 삭제처리
                  deleteObject(deleteRef).then(()=>{
                    console.log('파일 삭제 성공');
                    // 삭제가 완료되면 새롭게 렌더링
                    setRenderFlag(!renderFlag);
                  })
                  .catch((error)=>{
                    console.log('파일 삭제 실패');
                  });
                }
              }}>삭제</button></td>
            </tr>
          );
        });
        // 파일목록을 얻어온 후 State 변경
        setFileLists(fileRows);
      })
      .catch((error)=>{
        console.log('에러발생', error);
      });
  },[renderFlag]);
  /* 파일삭제가 완료된 후 renderFlag를 변경하면 새롭게 렌더링되면서 
  useEffect()도 재실행되어 목록을 새롭게 가져옴 */

  console.log('렌더링');

  return (
    <div className="App">
      <h2>Firebase - storage App</h2>
      <h3>파일 목록 및 삭제</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>bucket</th>
            <th>fullPath</th>
            <th>name</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {fileLists}
        </tbody>
      </table>
    </div>
  );
}

export default App;
