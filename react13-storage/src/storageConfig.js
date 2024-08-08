import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// APP초기화 및 Realtime 사용 준비
const app = initializeApp(firebaseConfig);
// Storage의 참조를 얻어올때는 아래와 같이 참조URL이 설정되어야 함
const storage = getStorage(app,"gs://reactapp202408-572aa.appspot.com");
export { storage };
