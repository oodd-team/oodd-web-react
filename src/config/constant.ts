//firebase 추가

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// JWT를 로컬 스토리지에 저장할 때 사용하는 키. 추후 수정

export const JWT_KEY = 'jwt_token';
export const NEW_JWT_KEY = 'new_jwt_token';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: import.meta.env.VITE_MEASURENMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
