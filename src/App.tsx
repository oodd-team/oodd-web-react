import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUP';
import UserProFile from './pages/UserProFile';
// import Home from './pages/Home';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="/users/:userId" element={<UserProFile />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
