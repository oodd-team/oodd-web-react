import React, { useEffect, useState } from 'react';
import { UserInfoContainer, ButtonContainer, LongButton } from './styles';
import { useRecoilState } from 'recoil';
import { UserInfoAtom, isFriendAtom } from '../../../../recoil/ProfileViewer/userDetailsAtom';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import HeartSvg from '../../../../assets/default/white-heart.svg';
import imageBasic from '../../../../assets/imageBasic.svg';
import RequestComponent from '../RequestComponent';
import BottomSheet from '../../../../components/BottomSheet';
import request from '../../../../apis/core';
import Modal from '../../../../components/Modal';
import UserProfile from '../../../../components/UserProfile';
import { OpponentInfoAtom } from '../../../../recoil/util/OpponentInfo';
import { UserInfoDto } from '../../ResponseDto/UserInfoDto';
import { ChatRoomDto, Opponent } from '../../../Chats/RecentChat/dto';
import { useNavigate } from 'react-router-dom';

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
	const truncatedBio = bio && bio.length > 50 ? bio.substring(0, 50) + '...' : bio;
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

	const handleOpenBottomSheet = () => {
		setIsBottomSheetOpen(true);
	};

	const handleCloseBottomSheet = () => {
		setIsBottomSheetOpen(false);
	};

	const handleOpenModal = (message: string) => {
		setModalContent(message);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleMessageClick = async () => {
		try {
			const response = await request.get<UserInfoDto>(`/users/${id}`);
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

	return (
		<UserInfoContainer>
			<UserProfile userImg={user_img} bio={truncatedBio} nickname={nickname} />
			<ButtonContainer>
				{friend && (
					<LongButton onClick={handleMessageClick}>
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.white}>
							메세지 보내기
						</StyledText>
					</LongButton>
				)}
				{!friend && (
					<LongButton onClick={handleOpenBottomSheet} disabled={nickname == '알 수 없음'}>
						<img src={HeartSvg} alt="heart icon" />
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.white}>
							친구 신청
						</StyledText>
					</LongButton>
				)}
			</ButtonContainer>
			<BottomSheet
				isOpenBottomSheet={isBottomSheetOpen}
				onCloseBottomSheet={handleCloseBottomSheet}
				Component={() => (
					<RequestComponent
						userId={id}
						nickname={nickname}
						setFriend={setFriend}
						setIsBottomSheetOpen={setIsBottomSheetOpen}
						handleOpenModal={handleOpenModal}
					/>
				)}
			/>
			{isModalOpen && <Modal content={modalContent} onClose={handleCloseModal} />}
		</UserInfoContainer>
	);
});

export default UserInfo;
