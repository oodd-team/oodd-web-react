import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Profile from './pages/Profile';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/home" element={<Home />} />
					<Route path="/chats" element={<Chats />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
