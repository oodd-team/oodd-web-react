import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	ProfileContainer,
	Header,
	StatsContainer,
	Stat,
	StatNumber,
	StatLabel,
	PostsContainer,
	AddButton,
	NoPostWrapper,
	Button,
} from './styles';
import NavbarProfile from './NavbarProfile/index'; // 상대 경로 index 명시
import ButtonSecondary from './ButtonSecondary/index'; // 상대 경로 index 명시
import { OODDFrame } from '@components/Frame/Frame';
import NavBar from '@components/NavBar';
import PostItem from '@components/PostItem';
import imageBasic from '@assets/default/defaultProfile.svg';
import Loading from '@components/Loading';
import UserProfile from '@components/UserProfile';
import { StyledText } from '@components/Text/StyledText';
import Modal from '@components/Modal';
import CommentBottomSheet from '@components/BottomSheet/CommentBottomSheet';
import OptionsBottomSheet from '@components/BottomSheet/OptionsBottomSheet';

import { getUserPostListApi } from '@apis/post';
import { getUserInfoApi } from '@apis/user';
import { createMatchingApi } from '@apis/matching';
import type { UserPostSummary } from '@apis/post/dto'; // type 명시
import type { UserInfoData } from '@apis/user/dto'; // type 명시
import button_plus from '@assets/default/plus.svg';
import TopBar from '@components/TopBar';
import MoreSvg from '@assets/default/more.svg';
import BackSvg from '@assets/arrow/left.svg';
import theme from '@styles/theme';

const Profile: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const profileUserId = Number(userId);
	const loggedInUserId = Number(localStorage.getItem('current_user_id'));

	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [posts, setPosts] = useState<UserPostSummary[]>([]);
	const [totalPosts, setTotalPosts] = useState<number>(0);
	const [userInfo, setUserInfo] = useState<UserInfoData | null>(null);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false); // 추가
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const navigate = useNavigate();

	const isMyPage = loggedInUserId === profileUserId;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getUserInfoApi(profileUserId);
				const postResponse = await getUserPostListApi(1, 10, profileUserId);
				setUserInfo(response.data);
				setPosts(postResponse.data.post);
				setTotalPosts(postResponse.data.totalPostsCount);
			} catch (error) {
				console.error('데이터 가져오기 실패:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [profileUserId]);

	const createMatching = async (message: string) => {
		const matchingRequestData = {
			requesterId: loggedInUserId,
			targetId: profileUserId,
			message: message,
		};

		try {
			await createMatchingApi(matchingRequestData);
			handleModalOpen(`${userInfo?.nickname}님에게 대표 OOTD와 \n한 줄 메세지를 보냈어요!`);
		} catch (error: any) {
			console.error('매칭 신청 오류:', error);
			handleModalOpen(error.response?.data?.message || '매칭 신청에 실패했습니다.');
		}
	};

	const handleModalOpen = (message: string) => {
		setIsBottomSheetOpen(false);
		setModalContent(message);
		setIsModalOpen(true);
	};

	if (isLoading) return <Loading />;

	return (
		<OODDFrame>
			<ProfileContainer>
				{isMyPage && (
					<AddButton onClick={() => navigate('/post/upload/photo/select')}>
						<img src={button_plus} alt="Add" />
					</AddButton>
				)}

				{isMyPage ? (
					<NavbarProfile />
				) : (
					<TopBar
						RightButtonSrc={MoreSvg}
						LeftButtonSrc={BackSvg}
						onClickLeftButton={() => navigate(-1)}
						onClickRightButton={() => setIsOptionsBottomSheetOpen(true)}
					/>
				)}

				<Header>
					<UserProfile
						userImg={userInfo?.profilePictureUrl || imageBasic}
						nickname={userInfo?.nickname || '알수없음'}
						bio={userInfo?.bio || '소개글이 없습니다.'}
					/>
				</Header>

				{isMyPage ? <ButtonSecondary /> : <Button onClick={() => setIsBottomSheetOpen(true)}>매칭신청</Button>}

				<StatsContainer>
					<Stat>
						<StatLabel>OOTD</StatLabel>
						<StatNumber>{totalPosts || 0}</StatNumber>
					</Stat>
					{isMyPage && (
						<Stat>
							<StatLabel>코멘트</StatLabel>
							<StatNumber>{posts.reduce((sum, post) => sum + (post.postCommentsCount || 0), 0)}</StatNumber>
						</Stat>
					)}
					<Stat>
						<StatLabel>좋아요</StatLabel>
						<StatNumber>{posts.reduce((sum, post) => sum + (post.postLikesCount || 0), 0)}</StatNumber>
					</Stat>
				</StatsContainer>

				<PostsContainer>
					{posts.length > 0 ? (
						posts.map((post) => <PostItem key={post.id} post={post} />)
					) : (
						<NoPostWrapper>
							<StyledText $textTheme={{ style: 'headline1-medium' }} color={theme.colors.gray[400]}>
								게시물이 없어요.
							</StyledText>
						</NoPostWrapper>
					)}
				</PostsContainer>

				{isMyPage && <NavBar />}

				<CommentBottomSheet
					isBottomSheetOpen={isBottomSheetOpen}
					commentProps={{
						content: `${userInfo?.nickname}님에게 대표 OOTD와 함께 전달될\n 한 줄 메세지를 보내보세요!`,
						sendComment: createMatching,
					}}
					handleCloseBottomSheet={() => setIsBottomSheetOpen(false)}
				/>

				<OptionsBottomSheet
					domain="user"
					targetId={{ userId: profileUserId || -1 }}
					targetNickname={userInfo?.nickname || '알 수 없음'}
					isBottomSheetOpen={isOptionsBottomSheetOpen}
					onClose={() => setIsOptionsBottomSheetOpen(false)}
				/>

				{isModalOpen && <Modal content={modalContent} onClose={() => setIsModalOpen(false)} />}
			</ProfileContainer>
		</OODDFrame>
	);
};

export default Profile;
