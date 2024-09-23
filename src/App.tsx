import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/Mypage';
import MyPost from './pages/MyPost';
import ProfileEdit from './pages/ProfileEdit';
import AccountSetting from './pages/AccountSetting';
import AccountEdit from './pages/AccountEdit';
import AccountCancel from './pages/AccountCancel';
import Verification from './pages/verification';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProfileViewer from './pages/ProfileViewer';
import Chats from './pages/Chats';
import ChatRoom from './pages/Chats/ChatRoom';
import PostImageSelect from './pages/PostImageSelect';
import PostImageReview from './pages/PostImageReview';
import PostInstaConnect from './pages/PostInstaConnect';
import PostInstaFeedSelect from './pages/PostInstaFeedSelect';
import PostUpload from './pages/PostUpload';
import Post from './pages/Post';
import KakaoCallback from './pages/Login/components/Kakao/KakaoCallback';
import NaverCallback from './pages/Login/components/Naver/NaverCallback';
import GoogleCallback from './pages/Login/components/Google/GoogleCallback';
const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/chats/:roomId" element={<ChatRoom />} />
				<Route path="/mypage" element={<MyPage />} />
				<Route path="/my-post/:postId" element={<MyPost />} />
				<Route path="/profile/edit" element={<ProfileEdit />} />
				<Route path="/account-setting" element={<AccountSetting />} />

				<Route path="/account-edit" element={<AccountEdit />} />
				<Route path="/account-cancel" element={<AccountCancel />} />
				<Route path="/Verification" element={<Verification />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chats" element={<Chats />} />

				<Route path="/image-select" element={<PostImageSelect />} />
				<Route path="/image-review" element={<PostImageReview />} />
				<Route path="/insta-connect" element={<PostInstaConnect />} />
				<Route path="/insta-feed-select" element={<PostInstaFeedSelect />} />
				<Route path="/upload" element={<PostUpload />} />

				<Route path="/post/:postId" element={<Post />} />
				<Route path="/users/:userId" element={<ProfileViewer />} />
				<Route path="signup" element={<SignUp />} />

				<Route path="/auth/kakao/callback" element={<KakaoCallback />}></Route>
				<Route path="/auth/naver/callback" element={<NaverCallback />}></Route>
				<Route path="/auth/google/callback" element={<GoogleCallback />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
