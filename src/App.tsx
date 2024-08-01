import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';
import PostUploadPage from './pages/Upload';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/upload" element={<PostUploadPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
