import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from './components/UserInfo';
import PostItem from './components/PostItem';
import BottomSheet from '../../components/BottomSheet';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import ConfirmationModal from '../../components/ConfirmationModal';
import ReportText from './components/ReportText';
import TopBar from '../../components/TopBar';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useRecoilState } from 'recoil';
import { userDetailsState } from '../../recoil/atoms'; // Recoil atom 임포트
import MoreSvg from '../../assets/ProfileViewer/moreIcon.svg';
import BackSvg from '../../assets/ProfileViewer/backIcon.svg';
import imageBasic from '../../assets/imageBasic.svg';
import { mainMenuItems, reportMenuItems, UserInfoProps } from './dto';
import { ProfileViewerContainer, Vector, CounterContainer, Count, PostListContainer } from './style';
import { UserInfoDto } from './ResponseDto/UserInfoDto';
import request from '../../apis/core';
import { PostListDto } from './ResponseDto/PostListDto';
import { BlockDto } from './ResponseDto/BlockDto';
import Modal from '../../components/Modal'; // Modal 컴포넌트 임포트
import Loading from '../../components/Loading';

const ProfileViewer: React.FC = () => {
	const { userId } = useParams<{ userId: string }>();
	const [userDetails, setUserDetails] = useRecoilState(userDetailsState);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(null);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});
	const [isInputVisible, setIsInputVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal 상태 추가
	const [modalContent, setModalContent] = useState<string>('');

	const token = localStorage.getItem('jwt_token');
	const myid = localStorage.getItem('id');

	useEffect(() => {
		const fetchUserDetails = async () => {
			try {
				const response = await request.get<UserInfoDto>(`/users/${userId}`);
				console.log('사용자 정보 조회: ', response);

				const postsResponse = await request.get<PostListDto>(`posts?userId=${userId}`, {});
				console.log('게시물 리스트 조회:', postsResponse);
				const storedUserDetails = JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}');
				const combinedData: UserInfoProps = {
					...response.result,
					status: storedUserDetails.status || 'blank',
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

		fetchUserDetails();
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
	}

	const posts = userDetails.posts || [];

	const representativePosts = posts.filter((post) => post.isRepresentative);
	const otherPosts = posts.filter((post) => !post.isRepresentative);

	const isBlockingAllowed = myid !== userId;

	const handleOpenBottomSheet = (type: string) => {
		setActiveBottomSheet(type);
		setIsBottomSheetOpen(true);
	};

	const handleCloseBottomSheet = () => {
		setIsBottomSheetOpen(false);
		setActiveBottomSheet(null);
	};
	const handleOpenModal = (message: string) => {
		setModalContent(message);
		setIsModalOpen(true);
	};

	const handleOpenConfirmationModal = () => {
		if (!isBlockingAllowed) {
			alert('자신을 차단할 수 없습니다.');
			return;
		}

		setIsConfirmationModalOpen(true);
		setConfirmAction(() => async () => {
			try {
				console.log(myid, userId);
				const response = await request.post<BlockDto>(`/block`, {
					userId: Number(myid),
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
			handleCloseConfirmationModal();
			setIsModalOpen(true); // 차단/해제 후 모달 열기
			setModalContent(
				userDetails.status === 'blocked'
					? `${userDetails.nickname}님을 차단 해제했어요`
					: `${userDetails.nickname}님을 차단했어요.`,
			);
		});
		setIsBottomSheetOpen(false);
	};

	const buttonText = userDetails.status === 'blocked' ? '차단 해제하기' : '차단하기';
	const confirmationMessage =
		userDetails.status === 'blocked'
			? `${userDetails.nickname}님을 차단 해제하시겠습니까?`
			: `${userDetails.nickname}님을 정말로 차단하시겠습니까?`;

	const handleCloseConfirmationModal = () => {
		setIsConfirmationModalOpen(false);
	};

	const handleDirectInput = () => {
		setIsInputVisible(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false); // Modal 닫기
	};

	const Report = async (text: string) => {
		try {
			await request.patch(`/user-report`, {
				fromUserId: Number.parseInt(myid as string),
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
			<ProfileViewerContainer>
				<TopBar
					text={userDetails.nickname}
					RightButtonSrc={MoreSvg}
					LeftButtonSrc={BackSvg}
					onRightClick={() => handleOpenBottomSheet('main')}
				/>
				<UserInfo />
				<Vector />
				<CounterContainer>
					<Count>
						<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
							OODD
						</StyledText>
						<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
							{userDetails.postsCount || 0}
						</StyledText>
					</Count>
					<Count>
						<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
							좋아요
						</StyledText>
						<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.gray4}>
							{userDetails.likesCount || 0}
						</StyledText>
					</Count>
				</CounterContainer>
				<PostListContainer>
					{representativePosts.length > 0 &&
						representativePosts.map((post) => (
							<PostItem firstPhoto={post.firstPhoto} key={post.postId} post={post} isRepresentative={true} />
						))}
					{otherPosts.length > 0 &&
						otherPosts.map((post) => (
							<PostItem firstPhoto={post.firstPhoto} key={post.postId} post={post} isRepresentative={false} />
						))}
				</PostListContainer>
				{isBottomSheetOpen && activeBottomSheet === 'main' && (
					<BottomSheet
						isOpenBottomSheet={isBottomSheetOpen}
						onCloseBottomSheet={handleCloseBottomSheet}
						Component={() => (
							<BottomSheetMenu
								items={mainMenuItems(userDetails, handleOpenBottomSheet, handleOpenConfirmationModal)}
								marginBottom="4rem"
							/>
						)}
					/>
				)}
				{isBottomSheetOpen && activeBottomSheet === 'report' && (
					<BottomSheet
						isOpenBottomSheet={isBottomSheetOpen}
						onCloseBottomSheet={handleCloseBottomSheet}
						Component={() => (
							<>
								<BottomSheetMenu items={reportMenuItems(handleDirectInput, Report)} marginBottom="1rem" />
								{isInputVisible && (
									<ReportText
										onCloseBottomSheet={handleCloseBottomSheet}
										setIsInputVisible={setIsInputVisible}
										handleOpenModal={handleOpenModal}
									/>
								)}
							</>
						)}
					/>
				)}
				{isConfirmationModalOpen && (
					<ConfirmationModal
						content={confirmationMessage}
						isCancelButtonVisible={true}
						confirm={{ text: buttonText, action: confirmAction }}
						onCloseModal={handleCloseConfirmationModal}
					/>
				)}
				{isModalOpen && <Modal content={modalContent} onClose={handleCloseModal} />}
			</ProfileViewerContainer>
		</OODDFrame>
	);
};

export default ProfileViewer;
