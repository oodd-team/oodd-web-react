import React, { useEffect, useState } from 'react';
import {
	UserDetails,
	UserInfoContainer,
	UserProfile,
	BioStyledText,
	UserImg,
	ButtonContainer,
	LongButton,
} from './styles';
import { useRecoilState } from 'recoil';
import { UserInfoAtom, isFriendAtom } from '../../../../recoil/ProfileViewer/userDetailsAtom';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import HeartSvg from '../../../../assets/default/white-heart.svg';
import RequestComponent from '../RequestComponent';
import BottomSheet from '../../../../components/BottomSheet';
import request from '../../../../apis/core';
import Modal from '../../../../components/Modal';
import { OpponentInfoAtom } from '../../../../recoil/util/OpponentInfo';
import { GetUserInfoResult } from '../../ResponseDto/GetUserInfoResult';
import { ChatRoomDto, Opponent } from '../../../Chats/RecentChat/dto';
import { useNavigate } from 'react-router-dom';

const UserInfo: React.FC = React.memo(() => {
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

	const fetchUserInfo = async () => {
		try {
			const response = await request.get<GetUserInfoResult>(`/users/${id}`);
			setFriend(response.result.isFriend);
		} catch (error) {
			console.error('사용자 정보 조회 오류:', error);
		}
	};

	useEffect(() => {
		fetchUserInfo();
	}, [id]);

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

	return (
		<UserInfoContainer>
			<UserProfile>
				<UserImg $imgUrl={userImg} />
				<UserDetails>
					<StyledText $textTheme={{ style: 'headline2-bold' }}>{nickname}</StyledText>
					<BioStyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.gray3}>
						{truncatedBio}
					</BioStyledText>
				</UserDetails>
			</UserProfile>
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
			<BottomSheet
				isOpenBottomSheet={isBottomSheetOpen}
				onCloseBottomSheet={handleBottomSheetClose}
				Component={() => (
					<RequestComponent
						userId={id}
						nickname={nickname}
						setFriend={setFriend}
						setIsBottomSheetOpen={setIsBottomSheetOpen}
						handleModalOpen={handleModalOpen}
					/>
				)}
			/>
			{isModalOpen && <Modal content={modalContent} onClose={handleModalClose} />}
		</UserInfoContainer>
	);
});

export default UserInfo;
