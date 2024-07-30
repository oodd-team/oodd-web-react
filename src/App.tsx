import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileViewer from './pages/ProfileViewer';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Profile from './pages/Profile';

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
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
