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
import Profile from './pages/Profile';
import Upload from './pages/Upload';
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
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/upload" element={<Upload />} />
				<Route path="/users/:userId" element={<ProfileViewer />} />
				<Route path="signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
