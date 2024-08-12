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
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import BottomSheetTest from './pages/BottomSheetTest';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/Mypage" element={<Mypage />} />
				<Route path="/post/:id" element={<PostDetail />} />
				<Route path="/post/:id/:type" element={<PostDetail />} />
				<Route path="/edit-profile" element={<ProfileEdit />} />
				<Route path="/account-setting" element={<AccountSetting />} />
				<Route path="/account-edit" element={<AccountEdit />} />
				<Route path="/account-cancel" element={<AccountCancel />} />
				<Route path="/Verification" element={<Verification />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chats" element={<Chats />} />
				<Route path="/bottomsheet-test" element={<BottomSheetTest />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
