import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LoginComplete from './pages/Login/components/LoginComplete';
import TermsAgreement from './pages/TermsAgreement';

import MyPage from './pages/MyPage';
import ProfileEdit from './pages/ProfileEdit';
import AccountSetting from './pages/AccountSetting';
import AccountEdit from './pages/AccountEdit';
import AccountCancel from './pages/AccountCancel';
import Verification from './pages/verification';

import ProfileViewer from './pages/ProfileViewer';

import Post from './pages/Post';
import MyPost from './pages/MyPost';
import PostUpload from './pages/PostUpload';
import PostImageSelect from './pages/PostImageSelect';
import PostInstaConnect from './pages/PostInstaConnect';
import PostInstaFeedSelect from './pages/PostInstaFeedSelect';

import Chats from './pages/Chats';
import ChatRoom from './pages/Chats/ChatRoom';

import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const isAuthenticated = Boolean(localStorage.getItem('new_jwt_token'));
	return isAuthenticated ? children : <Navigate to="/login" />;
};

// 인증이 필요한 페이지 배열
const protectedRoutes = [
	{ path: '/', element: <Home /> },

	// 사용자 프로필 및 계정 관리
	{ path: '/mypage', element: <MyPage /> },
	{ path: '/profile/edit', element: <ProfileEdit /> },
	{ path: '/account-setting', element: <AccountSetting /> },
	{ path: '/account-edit', element: <AccountEdit /> },
	{ path: '/account-cancel', element: <AccountCancel /> },
	{ path: '/verification', element: <Verification /> },
	{ path: '/users/:userId', element: <ProfileViewer /> },

	{ path: '/post/:postId', element: <Post /> },
	{ path: '/my-post/:postId', element: <MyPost /> },
	{ path: '/upload', element: <PostUpload /> },
	{ path: '/image-select', element: <PostImageSelect /> },
	{ path: '/insta-connect', element: <PostInstaConnect /> },
	{ path: '/insta-feed-select', element: <PostInstaFeedSelect /> },

	// 메시지/채팅
	{ path: '/chats', element: <Chats /> },
	{ path: '/chats/:chatRoomId', element: <ChatRoom /> },
];

// 인증이 필요 없는 페이지 배열
const publicRoutes = [
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <SignUp /> },
	{ path: '/login/complete', element: <LoginComplete /> },
	{ path: '/terms-agreement', element: <TermsAgreement /> },
];

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* 인증이 필요한 페이지 */}
				{protectedRoutes.map(({ path, element }) => (
					<Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
				))}

				{/* 인증이 필요 없는 페이지 */}
				{publicRoutes.map(({ path, element }) => (
					<Route key={path} path={path} element={element} />
				))}

				{/* 없는 페이지에 대한 처리 */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
