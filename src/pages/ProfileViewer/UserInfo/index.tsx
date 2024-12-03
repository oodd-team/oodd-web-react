import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import theme from '../../../styles/theme';

import { UserInfoAtom, isFriendAtom } from '../../../recoil/ProfileViewer/userDetailsAtom';
import { OpponentInfoAtom } from '../../../recoil/util/OpponentInfo';

import Modal from '../../../components/Modal';
import UserProfile from '../../../components/UserProfile';
import CommentBottomSheet from '../../../components/CommentBottomSheet';
import { CommentProps } from '../../../components/Comment/dto';

import { UserInfoContainer, ButtonContainer, LongButton } from './styles';
import { StyledText } from '../../../components/Text/StyledText';

import HeartSvg from '../../../assets/default/like-white.svg';
import imageBasic from '../../../assets/default/defaultProfile.svg';

import { useSocket } from '../../../context/SocketProvider';

import { ChatRoomData, OtherUserDto } from '../../../apis/chatting/dto';
import { createMatchingApi } from '../../../apis/matching';

const UserInfo: React.FC = React.memo(() => {
	const [chatRoomList, setChatRoomList] = useState<ChatRoomData[]>([]);

	const [userDetails] = useRecoilState(UserInfoAtom);
	const [friend, setFriend] = useRecoilState(isFriendAtom);

	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [, setOpponentInfo] = useRecoilState(OpponentInfoAtom);

	const nav = useNavigate();
	const socket = useSocket();

	if (!userDetails) return null;

	const { userId, nickname, bio, profilePictureUrl, isFriend = false } = userDetails;

	const my_id = Number(localStorage.getItem('my_id'));
	const user_img = profilePictureUrl || imageBasic;
	let roomId: number | null = null;

	useEffect(() => {
		setFriend(isFriend);
	}, [isFriend, setFriend]);

	const handleModalOpen = (message: string) => {
		setIsBottomSheetOpen(false);
		setModalContent(message);
		setIsModalOpen(true);
	};

	const checkPostCount = (): number => {
		// 자신의 게시물이 있는지 확인하는 함수
		const userDetails = localStorage.getItem(`userDetails_${my_id}`);
		if (userDetails) {
			const parsedDetails = JSON.parse(userDetails);
			return parsedDetails.postsCount || 0;
		}
		return 0;
	};

	// 친구 요청 sendComment 함수
	const createMatching = async (message: string) => {
		const postsCount = checkPostCount();
		if (postsCount === 0) {
			setIsBottomSheetOpen(false);
			handleModalOpen('게시물 등록 후 \n친구 요청을 보낼 수 있어요!');
			return;
		}
		const matchingRequestData = {
			requesterId: my_id,
			targetId: userDetails.userId,
			message: message,
		};

		try {
			const response = await createMatchingApi(matchingRequestData);

			handleModalOpen(`${nickname}님에게 대표 OOTD와 \n한 줄 메세지를 보냈어요!`);
			console.log(response);
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

	useEffect(() => {
		const getChatRooms = (data: ChatRoomData[]) => {
			setChatRoomList(data);
		};

		if (socket) {
			socket.emit('getChatRooms', { userId: my_id }); // 서버에 데이터 요청
			socket.on('chatRoomList', getChatRooms);
		}

		// cleanup 함수로 이벤트 리스너 정리
		return () => {
			if (socket) {
				socket.off('chatRoomList', getChatRooms);
			}
		};
	}, [socket, my_id]);

	const handleMessageClick = () => {
		const user: OtherUserDto = {
			id: userId,
			nickname: nickname,
			profilePictureUrl: user_img,
		};

		chatRoomList.forEach((chatRoom) => {
			if (chatRoom.otherUser.id === userId) {
				roomId = chatRoom.chatRoomId;
			}
		});

		console.log(roomId); // 왜 null이 뜨냐... 미띠겟다

		if (roomId !== null) {
			nav(`/chats/${roomId}`);
		} else {
			console.log('이 상대방과 관련된 채팅방이 존재하지 않습니다.');
		}

		setOpponentInfo(user);
	};

	// CommentBottomSheet에 전달할 Props
	const friendRequestCommentProps: CommentProps = {
		content: `${nickname}님에게 대표 OOTD와 함께 전달될\n 한 줄 메세지를 보내보세요!`,
		sendComment: createMatching,
	};

	return (
		<UserInfoContainer>
			<UserProfile userImg={user_img} bio={bio} nickname={nickname} />
			<ButtonContainer>
				<LongButton
					onClick={
						friend
							? handleMessageClick
							: () => {
									setIsBottomSheetOpen(true);
								}
					}
					disabled={nickname === '알 수 없음'}
				>
					{friend ? (
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.white}>
							메세지 보내기
						</StyledText>
					) : (
						<>
							<img src={HeartSvg} alt="heart icon" />
							<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.white}>
								친구 신청
							</StyledText>
						</>
					)}
				</LongButton>
			</ButtonContainer>
			<CommentBottomSheet
				isBottomSheetOpen={isBottomSheetOpen}
				commentProps={friendRequestCommentProps}
				handleCloseBottomSheet={() => {
					setIsBottomSheetOpen(false);
				}}
			/>
			{isModalOpen && (
				<Modal
					content={modalContent}
					onClose={() => {
						setIsModalOpen(false);
					}}
				/>
			)}
		</UserInfoContainer>
	);
});

export default UserInfo;
