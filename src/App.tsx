import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chats from './pages/Chats';
import ChatRoom from './pages/ChatRoom';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/chats" element={<Chats />}></Route>
					<Route path="/chats/:id" element={<ChatRoom />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
