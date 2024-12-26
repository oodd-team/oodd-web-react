import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Label, Row, List, ListItem } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import ConfirmationModal from '../../components/ConfirmationModal';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import TopBar from '../../components/TopBar';
import back from '../../assets/arrow/left.svg';
import imageBasic from '../../assets/default/defaultProfile.svg';
import Profile_s from './../../assets/default/my-page.svg';
import leave from '../../assets/default/leave.svg';
import { getUserInfoApi } from '../../apis/user';
import { UserInfoData } from '../../apis/user/dto';
import Loading from '../../components/Loading';

const AccountSetting: React.FC = () => {
	const navigate = useNavigate();
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const [userProfile, setUserProfile] = useState<UserInfoData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// 사용자 정보 가져오기
	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const storedUserId = Number(localStorage.getItem('my_id'));
				if (!storedUserId) {
					console.error('User is not logged in');
					return;
				}

				const userId = Number(storedUserId);
				const response = await getUserInfoApi(userId);
				setUserProfile(response.data);
			} catch (error) {
				console.error('Error fetching user info:', error);
			} finally {
				setIsLoading(false);
			}
		};

		getUserInfo();
	}, []);

	const handleConfirmLogout = () => {
		// localStorage 비우기
		localStorage.clear();
		console.log('Logout confirmed');
		setIsLogoutModalOpen(false);

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

	if (isLoading) {
		return <Loading />;
	}

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="계정 관리" LeftButtonSrc={back} onLeftButtonClick={() => navigate(-1)} />

				<ProfilePicWrapper>
					<ProfilePic>
						<img src={userProfile?.profilePictureUrl || imageBasic} alt="프로필 사진" />
					</ProfilePic>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 0 }} color={theme.colors.black}>
								{userProfile?.nickname}
							</StyledText>
						</Label>
					</Row>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 0 }} color={theme.colors.gray3}>
								{userProfile?.name} | {userProfile?.email}
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
