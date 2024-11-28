import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	ProfileContainer,
	Header,
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
import PostItem from '../../components/PostItem';
import imageBasic from '../../assets/default/defaultProfile.svg';
import Loading from '../../components/Loading';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';
import button_plus from '../../assets/default/plus.svg';
import insta from '../../assets/default/insta.svg';
import photo from '../../assets/default/photo.svg';
import UserProfile from '../../components/UserProfile';

import { getUserPostListApi } from '../../apis/post';
import { GetUserPostListData } from '../../apis/post/dto';

const MyPage: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [posts, setPosts] = useState<GetUserPostListData['post']>([]);
	const [totalStats, setTotalStats] = useState<{
		totalPostsCount: number;
		totalPostCommentsCount: number;
		totalPostLikesCount: number;
	}>();
	const navigate = useNavigate();

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '인스타 피드 가져오기',
				action: () => {
					setIsBottomSheetOpen(false);
					navigate('/insta-connect');
				},
				icon: insta,
			},
			{
				text: '사진 올리기',
				action: () => {
					setIsBottomSheetOpen(false);
					navigate('/image-select');
				},
				icon: photo,
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

	//게시물 리스트 조회 api - 콘솔 삭제 예정!
	const fetchPostList = async () => {
		try {
			const storedUserId = localStorage.getItem('my_id'); // my_id로 변경되었음
			if (!storedUserId) {
				console.error('User ID not found in localStorage');
				return;
			}

			console.log('Fetching posts for user ID:', storedUserId); // 디버깅: User ID 확인

			// API 호출
			const response = await getUserPostListApi(1, 10, Number(storedUserId));
			console.log('API Response:', response); // 디버깅: API 응답 확인

			const { post, totalPostsCount, totalPostCommentsCount, totalPostLikesCount, meta } = response.data;

			console.log('Post List:', post); // 디버깅: 게시물 리스트 확인
			console.log('Pagination Meta:', meta); // 디버깅: 페이지네이션 정보 확인

			// 상태 업데이트
			setPosts(post);
			setTotalStats({ totalPostsCount, totalPostCommentsCount: totalPostCommentsCount ?? 0, totalPostLikesCount });

			if (totalPostsCount === 0) {
				console.log('No posts available for the user.');
			}
		} catch (error) {
			console.error('Error fetching post list:', error); // 디버깅: 에러 확인
		} finally {
			setIsLoading(false);
			console.log('Loading completed.'); // 디버깅: 로딩 완료 확인
		}
	};
	useEffect(() => {
		fetchPostList();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<OODDFrame>
			<ProfileContainer>
				<AddButton onClick={handleOpenSheet}>
					<img src={button_plus} alt="Add" />
				</AddButton>
				<BottomSheet {...bottomSheetProps} />
				<NavbarProfile />
				<Header>
					<UserProfile userImg={imageBasic} nickname={'김아무개...'} bio={'소개글이 없습니다.'} />
				</Header>
				<ButtonSecondary />
				<StatsContainer>
					<Stat>
						<StatLabel>OOTD</StatLabel>
						<StatNumber>{totalStats?.totalPostsCount}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>코멘트</StatLabel>
						<StatNumber>{totalStats?.totalPostCommentsCount}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>좋아요</StatLabel>
						<StatNumber>{totalStats?.totalPostLikesCount}</StatNumber>
					</Stat>
				</StatsContainer>
				<PostsContainer>
					{posts.length > 0 ? (
						posts
							.sort((a, b) => {
								if (b.isRepresentative && !a.isRepresentative) return 1;
								if (a.isRepresentative && !b.isRepresentative) return -1;
								return 0;
							})
							.map((post) => <PostItem key={post.postId} post={post} />)
					) : (
						<p>게시물이 없습니다.</p>
					)}
				</PostsContainer>
				<NavBar />
			</ProfileContainer>
		</OODDFrame>
	);
};

export default MyPage;
