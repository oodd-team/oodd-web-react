import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	ProfileContainer,
	Header,
	AvatarWrapper,
	Avatar,
	UserInfo,
	Username,
	Bio,
	StatsContainer,
	Stat,
	StatNumber,
	StatLabel,
	PostsContainer,
} from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import NavbarProfile from '../../components/NavbarProfile';
import NavBar from '../../components/NavBar';
import avatarImage from '../../assets/avatar.png';
import ButtonSecondary from './ButtonSecondary';
import Post from './Post';
import request from '../../apis/core';

import ProfileActions from '../Profile';

// API 응답에 맞는 타입 정의
type PostItem = {
	postId: number;
	userId: number;
	likes: number;
	firstPhoto: string;
	isRepresentative: boolean;
	commentsCount?: number; // Optional since it might not be included for other users
};

type PostsResponse = {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		totalPosts: number;
		totalLikes: number;
		posts: PostItem[];
	};
};

type UserResponse = {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
};

const Mypage: React.FC = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserResponse | null>(null);
	const [posts, setPosts] = useState<PostItem[]>([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [totalLikes, setTotalLikes] = useState(0);
	const [totalComments, setTotalComments] = useState(0); // Comments count

	const handlePostClick = (postId: string) => {
		navigate(`/post/${postId}`);
	};

	// 사용자 정보 가져오기 함수
	const fetchUserData = async () => {
		try {
			// userId를 localStorage에서 가져옴
			const storedUserId = localStorage.getItem('userId'); // 또는 상태관리에서 가져오기

			if (!storedUserId) {
				console.error('User is not logged in');
				return;
			}

			const response = await request.get<UserResponse>(`/users/${storedUserId}`);
			setUser(response);
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	// API에서 포스트 리스트를 가져오는 함수
	const handlePostList = async () => {
		try {
			const storedUserId = localStorage.getItem('userId');
			if (!storedUserId) {
				console.error('User is not logged in');
				return;
			}

			const response = await request.get<PostsResponse>(`/posts?userId=${storedUserId}`);
			if (response.isSuccess) {
				const { totalPosts, totalLikes, posts } = response.result;
				setTotalPosts(totalPosts);
				setTotalLikes(totalLikes);
				setPosts(posts);

				// 코멘트 수 합산
				const totalComments = posts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);
				setTotalComments(totalComments);
			} else {
				console.error('Unexpected response:', response.message);
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	};

	// 컴포넌트가 마운트될 때 사용자 정보와 포스트 리스트를 가져옴
	useEffect(() => {
		fetchUserData();
		handlePostList();
	}, []);

	return (
		<OODDFrame>
			<ProfileContainer>
				<NavbarProfile />
				<Header>
					<AvatarWrapper>
						<Avatar src={user?.profilePictureUrl || avatarImage} alt="User Avatar" />
					</AvatarWrapper>
					<UserInfo>
						<Username>{user?.name || 'Loading...'}</Username>
						<Bio>{user?.bio || '소개글이 없습니다.'}</Bio>
					</UserInfo>
				</Header>
				<ButtonSecondary />
				<StatsContainer>
					<Stat>
						<StatLabel>OOTD</StatLabel>
						<StatNumber>{totalPosts}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>코멘트</StatLabel>
						<StatNumber>{totalComments}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>좋아요</StatLabel>
						<StatNumber>{totalLikes}</StatNumber>
					</Stat>
				</StatsContainer>
				<PostsContainer>
					{posts
						.sort((a, b) => {
							if (b.isRepresentative && !a.isRepresentative) return 1; // b가 대표 포스트일 때 a보다 앞에 위치
							if (a.isRepresentative && !b.isRepresentative) return -1; // a가 대표 포스트일 때 b보다 앞에 위치
							return 0; // 둘 다 대표 포스트가 아니거나 둘 다 대표 포스트일 경우, 순서를 유지
						})
						.map((post) => (
							<Post
								key={post.postId}
								imgUrl={post.firstPhoto}
								likes={post.likes}
								comments={post.commentsCount || 0}
								onClick={() => handlePostClick(post.postId.toString())}
								isFirst={post.isRepresentative}
							/>
						))}
				</PostsContainer>
				<ProfileActions /> {/* ProfileActions 컴포넌트 추가 */}
				<NavBar />
			</ProfileContainer>
		</OODDFrame>
	);
};

export default Mypage;
