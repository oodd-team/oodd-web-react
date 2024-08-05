import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUP';
import ProfileViewer from './pages/ProfileViewer';
import Home from './pages/Home';
import Chats from './pages/Chats';
import Profile from './pages/Profile';
import BottomSheetTest from './pages/BottomSheetTest';
import ConfirmationModalTest from './pages/ConfirmationModalTest';

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
					<Route path="/bottomsheet-test" element={<BottomSheetTest />} />
					<Route path="/confirmation-modal-test" element={<ConfirmationModalTest />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
