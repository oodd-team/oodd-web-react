import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileViewer from './pages/ProfileViewer';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import BottomSheetTest from './pages/BottomSheetTest';
import ConfirmationModalTest from './pages/ConfirmationModalTest';
import Post from './pages/Post';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="signup" element={<SignUp />} />
					<Route path="/users/:userId" element={<ProfileViewer />} />
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/chats" element={<Chats />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/upload" element={<Upload />} />
					<Route path="/post" element={<Post />} />
					<Route path="/bottomsheet-test" element={<BottomSheetTest />} />
					<Route path="/confirmation-modal-test" element={<ConfirmationModalTest />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
