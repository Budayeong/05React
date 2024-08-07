// firestoreConfig.js: Firebase에서 생성한 API정보를 저장해놓은 파일

// 파이어베이스 초기화, 사용을 위한 함수 임포트
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 본인의 API key 관련 정보(.env파일 생성 전)
// const firebaseConfig = {
//   apiKey: "AIzaSyB5qbe9hcr-MS4d0s54a6huigeHgsD1cOk",
//   authDomain: "reactapp202408-572aa.firebaseapp.com",
//   projectId: "reactapp202408-572aa",
//   storageBucket: "reactapp202408-572aa.appspot.com",
//   messagingSenderId: "503049048495",
//   appId: "1:503049048495:web:c872dd166273e35a6e1f5a",
//   measurementId: "G-JXVNX70BQ7"
// };

// .env파일 생성 후
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);
// 파이어스토어 객체 생성 및 내보내기
const firestore = getFirestore(app);
export { firestore };

