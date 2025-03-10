import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from '@pages/Home';
import Login from '@pages/Login';
import LoginComplete from '@pages/Login/LoginComplete';

import SignUp from '@pages/SignUp';
import TermsAgreement from '@pages/SignUp/TermsAgreement';
import PickMyStyle from '@pages/SignUp/PickMyStyle';

import Profile from '@pages/Profile';
import ProfileEdit from '@pages/Profile/ProfileEdit';

import AccountSetting from '@pages/Account/AccountSetting';
import AccountEdit from '@pages/Account/AccountEdit';
import AccountCancel from '@pages/Account/AccountCancel';
import Verification from '@pages/Account/Verification';

import Post from '@pages/Post';
import PostUpload from '@pages/Post/PostUpload';
import PostImageSelect from '@pages/Post/PostImageSelect';
import PostInstaConnect from '@pages/Post/PostInstaConnect';
import PostInstaFeedSelect from '@pages/Post/PostInstaFeedSelect';

import Chats from '@pages/Chats';
import ChatRoom from '@pages/Chats/ChatRoom';
import MatchingRoom from '@pages/Chats/MatchingRoom';

import NotFound from '@pages/NotFound';
import { getUserInfoApi } from '@apis/user';
import { getCurrentUserId } from '@utils/getCurrentUserId';
import Loading from '@components/Loading';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			const currentUserId = getCurrentUserId();
			const response = await getUserInfoApi(currentUserId);
			setIsAuthenticated(response.isSuccess);
		};
		checkAuth();
	}, []);

	if (isAuthenticated === null) {
		return <Loading />;
	}

	return isAuthenticated ? children : <Navigate to="/login" />;
};

// 인증이 필요한 페이지 배열
const protectedRoutes = [
	{ path: '/', element: <Home /> },

	// profile
	{ path: '/profile/:userId', element: <Profile /> },
	{ path: '/profile/edit', element: <ProfileEdit /> },

	// account
	{ path: '/account/setting', element: <AccountSetting /> },
	{ path: '/account/edit', element: <AccountEdit /> },
	{ path: '/account/cancel', element: <AccountCancel /> },
	{ path: '/account/verification', element: <Verification /> },

	{ path: '/post/:postId', element: <Post /> },
	{ path: '/post/upload/photo/select', element: <PostImageSelect /> },
	{ path: '/post/upload/instagram/connect', element: <PostInstaConnect /> },
	{ path: '/post/upload/instagram/select', element: <PostInstaFeedSelect /> },
	{ path: '/post/upload/content', element: <PostUpload /> },

	// 메시지/채팅
	{ path: '/chats', element: <Chats /> },
	{ path: '/chats/:chatRoomId', element: <ChatRoom /> },
	{ path: '/matching', element: <MatchingRoom /> },
];

// 인증이 필요 없는 페이지 배열
const publicRoutes = [
	{ path: '/login', element: <Login /> },
	{ path: '/login/complete', element: <LoginComplete /> },

	{ path: '/signup', element: <SignUp /> },
	{ path: '/signup/terms-agreement', element: <TermsAgreement /> },
	{ path: '/signup/pick-my-style', element: <PickMyStyle /> },
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
