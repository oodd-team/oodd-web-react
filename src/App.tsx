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
					<Route path="/chats" element={<Chats />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/upload" element={<Upload />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
