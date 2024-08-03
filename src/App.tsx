import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import ConfirmationModalTest from './pages/ConfirmationModalTest';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/chats" element={<Chats />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/confirmation-modal-test" element={<ConfirmationModalTest />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
