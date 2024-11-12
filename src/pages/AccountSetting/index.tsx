import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Label, Row, List, ListItem } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import ConfirmationModal from '../../components/ConfirmationModal';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';
import request, { BaseResponse } from '../../apis/core';
import { UserProfileResponse } from '../ProfileEdit/dto';
import imageBasic from '../../assets/imageBasic.svg';
import Loading from '../../components/Loading';
import Profile_s from './../../assets/default/my-page-white.svg';
import leave from "../../assets/default/leave.svg"


const AccountSetting: React.FC = () => {
	const navigate = useNavigate();
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const storedUserId = localStorage.getItem('id'); // 로그인된 사용자 ID 가져오기

				if (!storedUserId) {
					console.error('User is not logged in');
					return;
				}

				const response = await request.get<BaseResponse<UserProfileResponse>>(`/users/${storedUserId}`);
				setUserProfile(response.result);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchUserProfile();
	}, []);

	const handleConfirmLogout = () => {
		// localStorage 비우기
		localStorage.clear();
		console.log('Logout confirmed');
		setIsLogoutModalOpen(false);
		// 로그인 페이지로 이동
		navigate('/login');
	};

	const handleLogoutClick = () => {
		setIsLogoutModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsLogoutModalOpen(false);
	};

	const handleDeleteAccountClick = () => {
		// 회원 탈퇴 로직 추가
		navigate('/account-cancel');
	};

	if (!userProfile) {
		return <Loading/>; // 로딩 상태
	}

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="계정 관리" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<ProfilePicWrapper>
					<ProfilePic>
						<img src={userProfile.profilePictureUrl || imageBasic} alt="프로필 사진" />
					</ProfilePic>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 0 }} color={theme.colors.black}>
								{userProfile.nickname}
							</StyledText>
						</Label>
					</Row>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 0 }} color={theme.colors.gray3}>
								이름 | {userProfile.email}							
							</StyledText>
						</Label>
					</Row>
				</ProfilePicWrapper>
				
				<List>
					<ListItem onClick={handleLogoutClick}>
						<img src={leave} alt="로그아웃 아이콘" />
						<StyledText $textTheme={{ style: 'body2-Light', lineHeight: 0 }} color={theme.colors.black}>
							Logout
						</StyledText>
					</ListItem>
					<ListItem onClick={handleDeleteAccountClick}>
						<img src={Profile_s} alt="회원 탈퇴 아이콘" />
						<StyledText $textTheme={{ style: 'body2-Light', lineHeight: 0 }} color={theme.colors.black}>
							회원탈퇴
						</StyledText>
					</ListItem>
				</List>
				{isLogoutModalOpen && (
					<ConfirmationModal
						content="이 기기에서 정말 로그아웃 할까요?"
						isCancelButtonVisible={true}
						confirm={{ text: '로그아웃', action: handleConfirmLogout }}
						onCloseModal={handleCloseModal}
					/>
				)}
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default AccountSetting;
