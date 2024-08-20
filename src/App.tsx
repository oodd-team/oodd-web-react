import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileViewer from './pages/ProfileViewer';
import Home from './pages/Home';
import Chats from './pages/Chats';
import ChatRoom from './pages/Chats/ChatRoom';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import KakaoCallback from './pages/Login/components/Kakao/KakaoCallback';
import NaverCallback from './pages/Login/components/Naver/NaverCallback';
import GoogleCallback from './pages/Login/components/Google/GoogleCallback';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="signup" element={<SignUp />} />
					<Route path="/users/:userId" element={<ProfileViewer />} />
					<Route path="/" element={<Home />} />
					<Route path="/chats/:roomId" element={<ChatRoom />} />
					<Route path="/login" element={<Login />} />
					<Route path="/auth/kakao/callback" element={<KakaoCallback/>}></Route>
					<Route path="/auth/naver/callback" element={<NaverCallback/>}></Route>
					<Route path="/auth/google/callback" element={<GoogleCallback/>}></Route>
					<Route path="/upload" element={<Upload />} />
					<Route path="/chats" element={<Chats />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
