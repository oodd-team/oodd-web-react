import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import PostDetail from './pages/PostDetail';
import ProfileEdit from './pages/ProfileEdit';
import AccountSetting from './pages/AccountSetting';
import AccountEdit from './pages/AccountEdit';
import AccountCancel from './pages/AccountCancel';
import Verification from './pages/verification';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileViewer from './pages/ProfileViewer';
import Chats from './pages/Chats';
import Upload from './pages/Upload';

import KakaoCallback from './pages/Login/components/Kakao/KakaoCallback';
import NaverCallback from './pages/Login/components/Naver/NaverCallback';
import GoogleCallback from './pages/Login/components/Google/GoogleCallback';
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Mypage" element={<Mypage />} />
				<Route path="/post/:postId" element={<PostDetail />} />
				<Route path="/profile/edit/:userId" element={<ProfileEdit />} />

				<Route path="/account-setting" element={<AccountSetting />} />
				<Route path="/account-edit" element={<AccountEdit />} />
				<Route path="/account-cancel" element={<AccountCancel />} />
				<Route path="/Verification" element={<Verification />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/users/:userId" element={<ProfileViewer />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="/auth/kakao/callback" element={<KakaoCallback />}></Route>
				<Route path="/auth/naver/callback" element={<NaverCallback />}></Route>
				<Route path="/auth/google/callback" element={<GoogleCallback />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
