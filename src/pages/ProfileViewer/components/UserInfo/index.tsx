import React, { useEffect, useState } from 'react';
import {
	UserDetails,
	UserInfoContainer,
	UserProfile,
	Bio,
	UserImg,
	ButtonContainer,
	Button,
	LongButton,
	Icon,
} from './styles';
import { useRecoilState } from 'recoil';
import { UserInfoAtom, isFriendAtom } from '../../../../recoil/ProfileViewer/userDetailsAtom';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import HeartSvg from '../../../../assets/ProfileViewer/heart.svg';
import StatSvg from '../../../../assets/ProfileViewer/star.svg';
import MsgSvg from '../../../../assets/ProfileViewer/message_send.svg';
import RequestComponent from '../RequestComponent';
import BottomSheet from '../../../../components/BottomSheet';
import request from '../../../../apis/core';
import { InterestDto } from './InterestDto';
import { UserInfoProps } from '../../dto';
import Modal from '../../../../components/Modal';
import { OpponentInfoAtom } from '../../../../recoil/util/OpponentInfo';
import { UserInfoDto } from '../../ResponseDto/UserInfoDto';
import { ChatRoomDto, Opponent } from '../../../Chats/RecentChat/dto';
import { useNavigate } from 'react-router-dom';

const UserInfo: React.FC = React.memo(() => {
	const [userDetails, setUserDetails] = useRecoilState(UserInfoAtom);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [interested, setInterested] = useState<boolean | undefined>(undefined);
	const [friend, setFriend] = useRecoilState(isFriendAtom);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [, setOpponentInfo] = useRecoilState(OpponentInfoAtom);
	const nav = useNavigate();

	if (!userDetails) return null;

	const { id, nickname, bio, userImg } = userDetails;
	const truncatedBio = bio && bio.length > 50 ? bio.substring(0, 50) + '...' : bio;
	const userId = localStorage.getItem('id');

	useEffect(() => {
		const storedUserDetails = localStorage.getItem(`userDetails_${id}`);
		if (storedUserDetails) {
			const parsedDetails = JSON.parse(storedUserDetails);
			setInterested(parsedDetails.isInterested);
		}
	}, [id]);

	const fetchUserInfo = async () => {
		try {
			const response = await request.get<UserInfoDto>(`/users/${id}`);
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
			const updatedUserDetails = { ...userDetails, isInterested: interested };
			localStorage.setItem(`userDetails_${userDetails.id}`, JSON.stringify(updatedUserDetails));
		}
	}, [userDetails, interested]);

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

	const handleInterestedClick = async () => {
		try {
			const response = await request.patch<InterestDto>(`/user-interests`, {
				userId: userId,
				friendId: id,
			});

			const isInterested = response.result.status === 'activated';

			const updatedUserDetails: UserInfoProps = {
				...userDetails,
				isInterested,
			};

			localStorage.setItem(`userDetails_${id}`, JSON.stringify(updatedUserDetails));

			setUserDetails(updatedUserDetails);
			setInterested(isInterested);

			handleOpenModal(
				isInterested ? `${userDetails.nickname}님을\n관심 친구로 등록했습니다!` : '관심 친구 등록이 해제되었습니다.',
			);
		} catch (error) {
			console.error('관심 친구 등록 오류:', error);
			alert('관심 친구 등록에 실패했습니다.');
		}
	};

	return (
		<UserInfoContainer>
			<UserProfile>
				<UserImg $imgUrl={userImg} />
				<UserDetails>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }}>{nickname}</StyledText>
					<Bio>
						<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1 }} color={theme.colors.gray4}>
							{truncatedBio}
						</StyledText>
					</Bio>
				</UserDetails>
			</UserProfile>
			<ButtonContainer>
				{!friend && !interested && (
					<>
						<Button $backgroundcolor="#000" onClick={handleOpenBottomSheet} disabled={nickname === '알 수 없음'}>
							<Icon src={HeartSvg} alt="heart icon" />
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
								친구 신청
							</StyledText>
						</Button>
						<Button $backgroundcolor="white" onClick={handleInterestedClick} disabled={nickname === '알 수 없음'}>
							<Icon src={StatSvg} alt="star icon" />
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>관심 친구</StyledText>
						</Button>
					</>
				)}
				{friend && !interested && (
					<>
						<Button $color="white" $backgroundcolor="#000" onClick={handleMessageClick}>
							<Icon src={MsgSvg} alt="message icon" />
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
								메세지 보내기
							</StyledText>
						</Button>
						<Button $color="#000" $backgroundcolor="white" onClick={handleInterestedClick}>
							<Icon src={StatSvg} alt="star icon" />
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>관심 친구</StyledText>
						</Button>
					</>
				)}
				{friend && interested && (
					<LongButton onClick={handleMessageClick}>
						<Icon src={MsgSvg} alt="message icon" />
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
							메세지 보내기
						</StyledText>
					</LongButton>
				)}
				{!friend && interested && (
					<LongButton onClick={handleOpenBottomSheet}>
						<Icon src={HeartSvg} alt="heart icon" />
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
							친구 신청
						</StyledText>
					</LongButton>
				)}
			</ButtonContainer>
			{isBottomSheetOpen && (
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
			)}
			{isModalOpen && <Modal content={modalContent} onClose={handleCloseModal} />}
		</UserInfoContainer>
	);
});

export default UserInfo;
