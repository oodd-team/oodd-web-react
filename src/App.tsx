import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import BottomSheetTest from './pages/BottomSheetTest';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/chats" element={<Chats />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/upload" element={<Upload />} />
					<Route path="/bottomsheet-test" element={<BottomSheetTest />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
