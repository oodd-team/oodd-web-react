import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import PostItem from '../../components/PostItem';
import BottomSheet from '../../components/BottomSheet';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import ReportText from './components/ReportText';
import TopBar from '../../components/TopBar';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useRecoilState } from 'recoil';
import { UserInfoAtom } from '../../recoil/ProfileViewer/userDetailsAtom'; // Recoil atom 임포트
import MoreSvg from '../../assets/default/more.svg';
import BackSvg from '../../assets/arrow/left.svg';
import imageBasic from '../../assets/default/defaultProfile.svg';
import { UserInfoProps } from './UserInfoProps';
import { mainMenuItems, reportMenuItems } from './MenuItemDto';
import { ProfileViewerContainer, CounterContainer, Count, PostListContainer } from './style';
import { GetUserInfoResult } from './ResponseDto/GetUserInfoResult';
import request from '../../apis/core';
import { GetPostListResult } from './ResponseDto/GetPostListResult';
import { PostUserBlock } from './ResponseDto/PostUserBlockResult';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';

const ProfileViewer: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const [userDetails, setUserDetails] = useRecoilState(UserInfoAtom);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
	const [isInputVisible, setIsInputVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState<string>('');

	const localGetId = localStorage.getItem('id');
	const token = localStorage.getItem('jwt_token');

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const response = await request.get<GetUserInfoResult>(`/users/${userId}`);
				console.log('사용자 정보 조회: ', response);

				const postsResponse = await request.get<GetPostListResult>(`posts?userId=${userId}`, {});
				console.log('게시물 리스트 조회:', postsResponse);
				const storedUserDetails = JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}');
				const combinedData: UserInfoProps = {
					...response.result,
					status: storedUserDetails.status || 'blank',
					isFriend: response.result.isFriend,
					posts: postsResponse.result.posts,
					likesCount: postsResponse.result.totalLikes,
					postsCount: postsResponse.result.totalPosts,
					isInterested: storedUserDetails.isInterested || false,
					userImg: storedUserDetails.profilePictureUrl,
				};

				setUserDetails(combinedData);
			} catch (error) {
				console.error('Failed to fetch user details', error);
				// ProfileViewer 페이지 처음 들어왔을 때, 사용자 정보 조회를 함. 이때 응답을 얻어오지 못하면 (탈퇴나 미등록 등으로 사용자 정보가 없으면)
				const defaultUserDetails: UserInfoProps = {
					id: Number.parseInt(userId as string),
					nickname: '알 수 없음',
					bio: '',
					isFriend: false,
					userImg: imageBasic, // 기본 프로필 이미지 경로
					isInterested: false,
					posts: [],
					likesCount: 0,
					postsCount: 0,
					status: 'blank',
				};

				setUserDetails(defaultUserDetails); // 그 userId에 대한 userDetail 상태에 기본 정보가 저장 됨.
			}
		};

		getUserInfo();
	}, [userId, token, setUserDetails]);

	useEffect(() => {
		const storedUserDetails = localStorage.getItem(`userDetails_${userId}`);
		if (storedUserDetails) {
			setUserDetails(JSON.parse(storedUserDetails));
		}
	}, [setUserDetails, userId]);

	useEffect(() => {
		if (userDetails) {
			localStorage.setItem(`userDetails_${userId}`, JSON.stringify(userDetails));
		}
	}, [userDetails, userId]);

	if (!userDetails) {
		return <Loading />;
	} // 로딩 화면

	const posts = userDetails.posts || [];

	const representativePosts = posts.filter((post) => post.isRepresentative); // 대표 게시물인 것만 필터링
	const otherPosts = posts.filter((post) => !post.isRepresentative);

	const handleBottomSheetOpen = (type: string) => {
		setActiveBottomSheet(type);
		setIsBottomSheetOpen(true);
	};

	const handleBottomSheetClose = () => {
		setIsBottomSheetOpen(false);
		setActiveBottomSheet(null);
	};
	const handleModalOpen = (message: string) => {
		setModalContent(message);
		setIsModalOpen(true);
	};

	const handleConfirmationModalOpen = () => {
		if (localGetId == userId) {
			alert('자신을 차단할 수 없습니다.');
			return;
		}

		setIsConfirmationModalOpen(true);
		setConfirmAction(() => async () => {
			try {
				console.log(localGetId, userId);
				const response = await request.post<PostUserBlock>(`/block`, {
					userId: Number(localGetId),
					friendId: Number(userId),
					action: 'toggle',
				});
				if (response.message === 'OK') {
					const newStatus = userDetails.status === 'blocked' ? 'unblocked' : 'blocked';
					setUserDetails((prevState) => ({
						...prevState!,
						status: newStatus,
					}));
				}
				console.log(response);
			} catch (error) {
				console.error('Failed to toggle block status', error);
			}
			handleConfirmationModalClose();
			setIsModalOpen(true); // 차단/해제 후 모달 열기
			setModalContent(
				userDetails.status === 'blocked'
					? `${userDetails.nickname}님을 차단 해제했어요`
					: `${userDetails.nickname}님을 차단했어요.`,
			);
		});
		setIsBottomSheetOpen(false);
	};

	const handleConfirmationModalClose = () => {
		setIsConfirmationModalOpen(false);
	};

	const handleDirectInput = () => {
		setIsInputVisible(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false); // Modal 닫기
	};

	const postUserReport = async (text: string) => {
		try {
			await request.patch(`/user-report`, {
				fromUserId: Number.parseInt(localGetId as string),
				toUserId: Number.parseInt(userId as string),
				reason: text,
			});
			setIsModalOpen(true);
			setModalContent(`${userDetails.nickname}님을 \n'${text}' 사유로 신고했어요.`);
			setIsBottomSheetOpen(false);
		} catch (error) {
			console.error('Failed to fetch user details', error);
		}
	};

	return (
		<OODDFrame>
			<TopBar RightButtonSrc={MoreSvg} LeftButtonSrc={BackSvg} onRightClick={() => handleBottomSheetOpen('main')} />
			<ProfileViewerContainer>
				<UserInfo isFriend={userDetails.isFriend ?? false} />
				<CounterContainer>
					<Count>
						<StyledText $textTheme={{ style: 'caption2-medium' }} color={theme.colors.gray3}>
							OODD
						</StyledText>
						<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
							{userDetails.postsCount || 0}
						</StyledText>
					</Count>
					<Count>
						<StyledText $textTheme={{ style: 'caption2-medium' }} color={theme.colors.gray3}>
							좋아요
						</StyledText>
						<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
							{userDetails.likesCount || 0}
						</StyledText>
					</Count>
				</CounterContainer>
				<PostListContainer>
					{representativePosts.length > 0 &&
						representativePosts.map((post) => <PostItem post={post} key={post.postId} isMyPost={false} />)}
					{otherPosts.length > 0 &&
						otherPosts.map((post) => <PostItem key={post.postId} post={post} isMyPost={false} />)}
				</PostListContainer>
				{activeBottomSheet === 'main' && (
					<BottomSheet
						isOpenBottomSheet={isBottomSheetOpen}
						onCloseBottomSheet={handleBottomSheetClose}
						Component={() => (
							<BottomSheetMenu
								items={mainMenuItems(userDetails, handleBottomSheetOpen, handleConfirmationModalOpen)}
								marginBottom="4rem"
							/>
						)}
					/>
				)}
				{activeBottomSheet === 'report' && (
					<BottomSheet
						isOpenBottomSheet={isBottomSheetOpen}
						onCloseBottomSheet={handleBottomSheetClose}
						Component={() => (
							<>
								<BottomSheetMenu items={reportMenuItems(handleDirectInput, postUserReport)} marginBottom="1rem" />
								{isInputVisible && (
									<ReportText
										onCloseBottomSheet={handleBottomSheetClose}
										setIsInputVisible={setIsInputVisible}
										handleModalOpen={handleModalOpen}
									/>
								)}
							</>
						)}
					/>
				)}
				{isConfirmationModalOpen && (
					<Modal
						content={
							userDetails.status === 'blocked'
								? `${userDetails.nickname}님을 차단 해제하시겠습니까?`
								: `${userDetails.nickname}님을 정말로 차단하시겠습니까?`
						}
						isCloseButtonVisible={true} // 오른쪽 상단 X 버튼 표시 여부
						onClose={handleConfirmationModalClose}
						button={{
							content: userDetails.status === 'blocked' ? '차단 해제하기' : '차단하기',
							onClick: confirmAction,
						}}
					/>
				)}

				{isModalOpen && <Modal content={modalContent} onClose={handleModalClose} />}
			</ProfileViewerContainer>
		</OODDFrame>
	);
};

export default ProfileViewer;
