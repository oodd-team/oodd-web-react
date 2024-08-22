import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import HomeTabBar from './HomeTabBar';
import HomeTopBar from './HomeTopBar';
import NavBar from '../../components/NavBar';
import { HomeContainer } from './styles';
import request from '../../apis/core';

interface UserResponse {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
}

// Home 페이지입니다.
const Home: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const userId = localStorage.getItem('id');
			const token = localStorage.getItem('jwt_token');

			if (!userId || !token) {
				// userId나 token이 없으면 로그인 페이지로 리다이렉트
				navigate('/login');
				return;
			}

			try {
				// JWT 토큰으로 사용자 정보 조회
				const response = await request.get<UserResponse>(`/users/${userId}`);
				if (!response || !response.id) {
					// 사용자 정보가 유효하지 않으면 로그인 페이지로 리다이렉트
					navigate('/login');
				}
			} catch (error) {
				// 에러 발생 시 로그인 페이지로 리다이렉트
				console.error('Failed to authenticate user:', error);
				navigate('/login');
			}
		};

		checkAuth();
	}, [navigate]);

	return (
		<OODDFrame>
			<HomeContainer>
				<HomeTopBar />
				<HomeTabBar />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
