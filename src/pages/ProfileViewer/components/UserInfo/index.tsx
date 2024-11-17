import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfoContainer, ButtonContainer, LongButton } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { useRecoilState } from 'recoil';
import { UserInfoAtom, isFriendAtom } from '../../../../recoil/ProfileViewer/userDetailsAtom';
import { OpponentInfoAtom } from '../../../../recoil/util/OpponentInfo';
import request from '../../../../apis/core';
import Modal from '../../../../components/Modal';
import UserProfile from '../../../../components/UserProfile';
import CommentBottomSheet from '../../../../components/CommentBottomSheet';
import { CommentProps } from '../../../../components/Comment/dto';
import { GetUserInfoResult } from '../../ResponseDto/GetUserInfoResult';
import { ChatRoomDto, Opponent } from '../../../Chats/RecentChat/dto';
import { PostFriendRequestResult } from '../../ResponseDto/PostFriendRequestResult';
import HeartSvg from '../../../../assets/default/like-white.svg';
import imageBasic from '../../../../assets/defaultProfile.svg';

interface UserInfoProps {
	isFriend: boolean;
}

const UserInfo: React.FC<UserInfoProps> = React.memo(({ isFriend }) => {
	const [userDetails] = useRecoilState(UserInfoAtom);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [friend, setFriend] = useRecoilState(isFriendAtom);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [, setOpponentInfo] = useRecoilState(OpponentInfoAtom);
	const nav = useNavigate();

	if (!userDetails) return null;

	const { id, nickname, bio, userImg } = userDetails;
	const userId = localStorage.getItem('id');
	const user_img = userImg || imageBasic;

	useEffect(() => {
		setFriend(isFriend);
	}, [isFriend, setFriend]);

	useEffect(() => {
		if (userDetails) {
			const updatedUserDetails = { ...userDetails };
			localStorage.setItem(`userDetails_${userDetails.id}`, JSON.stringify(updatedUserDetails));
		}
	}, [userDetails]);

	const handleBottomSheetOpen = () => {
		setIsBottomSheetOpen(true);
	};

	const handleBottomSheetClose = () => {
		setIsBottomSheetOpen(false);
	};

	const handleModalOpen = (message: string) => {
		setModalContent(message);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleMessageClick = async () => {
		try {
			const response = await request.get<GetUserInfoResult>(`/users/${id}`);
			const User: Opponent = {
				id: response.result.id,
				nickname: response.result.nickname,
				profilePictureUrl: response.result.profilePictureUrl,
				name: response.result.name,
			};

			const chatRoomResponse = await request.get<{
				isSuccess: boolean;
				code: number;
				message: string;
				result: ChatRoomDto[];
			}>(`/chat-rooms/${userId}`);

			let roomId: number | null = null;

			if (Array.isArray(chatRoomResponse.result)) {
				chatRoomResponse.result.forEach((room) => {
					if (room.opponent.id === User.id) {
						roomId = room.id;
					}
				});
			} else {
				console.error('chatRoomResponse.result is not an array:', chatRoomResponse.result);
			}

			if (roomId !== null) {
				nav(`/chats/${roomId}`);
			} else {
				console.log('이 상대방과 관련된 채팅방이 존재하지 않습니다.');
			}

			setOpponentInfo(User);
		} catch (error) {
			console.error('메세지 보내기 오류:', error);
			alert('사용자 정보를 불러오지 못했습니다.');
		}
	};

	const checkPostCount = (): number => {
		// 자신의 게시물이 있는지 확인하는 함수
		const userId = localStorage.getItem('id');
		const userDetails = localStorage.getItem(`userDetails_${userId}`);
		if (userDetails) {
			const parsedDetails = JSON.parse(userDetails);
			return parsedDetails.postsCount || 0;
		}
		return 0;
	};

	// 친구 요청 관련 sendComment 함수 정의
	const sendComment = async (message: string) => {
		const postsCount = checkPostCount();
		if (postsCount === 0) {
			setIsBottomSheetOpen(false);
			handleModalOpen('게시물 등록 후 \n친구 요청을 보낼 수 있어요!🩷');
			return;
		}

		try {
			await request.post<PostFriendRequestResult>(`/user-relationships`, {
				requesterId: Number.parseInt(localStorage.getItem('id') as string),
				targetId: userId,
				message: message,
			});

			handleModalOpen(`${nickname}님에게 대표 OOTD와 \n한 줄 메세지를 보냈어요!`);
		} catch (error: any) {
			console.error('친구 신청 오류:', error);
			if (error.response?.data?.message === '이미 요청한 관계입니다.') {
				setFriend(false);
				handleModalOpen('이미 친구 신청을 보냈습니다!');
			} else {
				handleModalOpen('친구 신청에 실패했습니다.\n다시 시도해 주세요.');
			}
		}
	};

	// CommentBottomSheet에 전달할 Props
	const friendRequestCommentProps: CommentProps = {
		content: `${nickname}님에게 대표 OOTD와 함께 전달될\n 한 줄 메세지를 보내보세요!`,
		sendComment: sendComment,
	};

	return (
		<UserInfoContainer>
			<UserProfile userImg={user_img} bio={bio} nickname={nickname} />
			<ButtonContainer>
				{friend && (
					<LongButton onClick={handleMessageClick}>
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.white}>
							메세지 보내기
						</StyledText>
					</LongButton>
				)}
				{!friend && (
					<LongButton onClick={handleBottomSheetOpen} disabled={nickname == '알 수 없음'}>
						<img src={HeartSvg} alt="heart icon" />
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.white}>
							친구 신청
						</StyledText>
					</LongButton>
				)}
			</ButtonContainer>
			<CommentBottomSheet
				isBottomSheetOpen={isBottomSheetOpen}
				commentProps={friendRequestCommentProps}
				handleCloseBottomSheet={handleBottomSheetClose}
			/>
			{isModalOpen && <Modal content={modalContent} onClose={handleModalClose} />}
		</UserInfoContainer>
	);
});

export default UserInfo;
