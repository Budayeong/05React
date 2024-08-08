import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
/*
realtime Database는 API key 이외 databaseURL이 하나 더 필요.
콘솔상단에서 확인할 수 있다.
*/
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  databaseURL: "https://reactapp202408-572aa-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// APP초기화 및 Realtime 사용 준비
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);
export { realtime };
