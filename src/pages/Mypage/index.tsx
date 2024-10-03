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
	AddButton,
} from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import NavbarProfile from '../../components/NavbarProfile';
import NavBar from '../../components/NavBar';
import ButtonSecondary from './ButtonSecondary';
import Post from './Post';
import request, { BaseResponse } from '../../apis/core';
import { PostItem, PostsResponse, UserResponse } from './dto';
import imageBasic from '../../assets/imageBasic.svg';
import Loading from '../../components/Loading';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';
import button_plus from '../../assets/Profile/button_plus.svg';
import Insta from '../../assets/BottomSheetMenu/Insta.svg';
import Picture from '../../assets/BottomSheetMenu/Picture.svg';

const MyPage: React.FC = () => {
	const [user, setUser] = useState<UserResponse | null>(null);
	const [posts, setPosts] = useState<PostItem[]>([]);
	const [totalPosts, setTotalPosts] = useState(0);
	const [totalLikes, setTotalLikes] = useState(0);
	const [totalComments, setTotalComments] = useState(0); // Comments count
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const navigate = useNavigate();

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '인스타 피드 가져오기',
				action: () => {
					setIsBottomSheetOpen(false);
					navigate('/insta-connect');
				},
				icon: Insta,
			},
			{
				text: '사진 올리기',
				action: () => {
					setIsBottomSheetOpen(false);
					navigate('/image-select');
				},
				icon: Picture,
			},
		],
		marginBottom: '50px',
	};

	const bottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
		},
	};

	const handleOpenSheet = () => {
		setIsBottomSheetOpen(true);
	};

	const handlePostClick = (postId: string) => {
		navigate(`/my-post/${postId}`);
	};

	// 사용자 정보 가져오기 함수
	const fetchUserData = async () => {
		try {
			const storedUserId = localStorage.getItem('id');

			if (!storedUserId) {
				console.error('User is not logged in');
				return;
			}

			const response = await request.get<BaseResponse<UserResponse>>(`/users/${storedUserId}`);
			setUser(response.result);
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	// API에서 포스트 리스트를 가져오는 함수
	const handlePostList = async () => {
		try {
			const storedUserId = localStorage.getItem('id');
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
				const totalComments = posts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);
				setTotalComments(totalComments);
			} else {
				console.error('Unexpected response:', response.message);
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			setIsLoading(false); // 로딩 완료 후 로딩 상태 false로 설정
		}
	};

	useEffect(() => {
		fetchUserData();
		handlePostList();
	}, []);

	if (isLoading) {
		return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
	}

	return (
		<OODDFrame>
			<ProfileContainer>
				<AddButton onClick={handleOpenSheet}>
					<img src={button_plus} />
				</AddButton>
				<BottomSheet {...bottomSheetProps} />
				<NavbarProfile />
				<Header>
					<AvatarWrapper>
						<Avatar src={user?.profilePictureUrl || imageBasic} alt="User Avatar" />
					</AvatarWrapper>
					<UserInfo>
						<Username>{user?.nickname || '김아무개...'}</Username>
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
							if (b.isRepresentative && !a.isRepresentative) return 1;
							if (a.isRepresentative && !b.isRepresentative) return -1;
							return 0;
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
				<NavBar />
			</ProfileContainer>
		</OODDFrame>
	);
};

export default MyPage;
