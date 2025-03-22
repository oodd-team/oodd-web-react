import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import { getUserInfoApi } from '@apis/user';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import back from '@assets/arrow/left.svg';
import imageBasic from '@assets/default/defaultProfile.svg';
import leave from '@assets/default/leave.svg';
import Profile_s from '@assets/default/my-page.svg';

import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal';
import Skeleton from '@components/Skeleton';
import { StyledText } from '@components/Text/StyledText';
import TopBar from '@components/TopBar/index';

import type { UserInfoData } from '@apis/user/dto';

import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Label, Row, List, ListItem } from './styles';

const AccountSetting: React.FC = () => {
	const navigate = useNavigate();
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const [userProfile, setUserProfile] = useState<UserInfoData | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const currentUserId = getCurrentUserId();
				if (!currentUserId) {
					console.error('User is not logged in');
					return;
				}

				const response = await getUserInfoApi(currentUserId);
				setUserProfile(response.data);
			} catch (error) {
				console.error('Error fetching user info:', error);
			} finally {
				setIsLoading(false);
			}
		};
		setTimeout(getUserInfo, 1000);
	}, []);

	const handleConfirmLogout = () => {
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
		navigate('/account/cancel');
	};

	if (isLoading) {
		return (
			<OODDFrame>
				<ProfileEditContainer>
					<TopBar text="계정 관리" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
					<ProfilePicWrapper>
						<ProfilePic>
							<Skeleton width={120} height={120} borderRadius={80} />
						</ProfilePic>{' '}
						<Row>
							<Skeleton width="60%" height={20} />
						</Row>
						<Row>
							<Skeleton width="100%" height={20} />
						</Row>
					</ProfilePicWrapper>

					<List>
						<ListItem>
							<Skeleton width="100%" height={40} />
						</ListItem>
						<ListItem>
							<Skeleton width="100%" height={40} />
						</ListItem>
					</List>
				</ProfileEditContainer>
			</OODDFrame>
		);
	}

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="계정 관리" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
				<ProfilePicWrapper>
					<ProfilePic>
						<img src={userProfile?.profilePictureUrl || imageBasic} alt="프로필 사진" />
					</ProfilePic>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.text.primary}>
								{userProfile?.nickname}
							</StyledText>
						</Label>
					</Row>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'caption1-regular' }} color={theme.colors.text.tertiary}>
								{userProfile?.name} | {userProfile?.email}
							</StyledText>
						</Label>
					</Row>
				</ProfilePicWrapper>

				<List>
					<ListItem onClick={handleLogoutClick}>
						<img src={leave} alt="로그아웃 아이콘" />
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.text.primary}>
							Logout
						</StyledText>
					</ListItem>
					<ListItem onClick={handleDeleteAccountClick}>
						<img src={Profile_s} alt="회원 탈퇴 아이콘" />
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.text.primary}>
							회원탈퇴
						</StyledText>
					</ListItem>
				</List>

				{isLogoutModalOpen && (
					<Modal
						content="이 기기에서 정말 로그아웃 할까요?"
						onClose={handleCloseModal}
						button={{ content: '확인', onClick: handleConfirmLogout }}
						isCloseButtonVisible={true}
					/>
				)}
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default AccountSetting;
