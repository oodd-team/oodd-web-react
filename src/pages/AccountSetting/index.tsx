import React, { useState } from 'react';
import { ProfileEditContainer, ProfilePic, ProfilePicWrapper, Label, Row, List, ListItem } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';

import ConfirmationModal from '../../components/ConfirmationModal';
import avatar from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import useredit from './assets/useredit.svg';
import exit from './assets/exit.svg';
import cancleaccount from './assets/cancleaccount.svg';
import next from './assets/next.svg';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';

const AccountSetting: React.FC = () => {
	const navigate = useNavigate();
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const handleEditProfileClick = () => {
		navigate('/account-edit');
	};

	const handleLogoutClick = () => {
		setIsLogoutModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsLogoutModalOpen(false);
	};

	const handleConfirmLogout = () => {
		// Logout 로직 추가
		console.log('Logout confirmed');
		setIsLogoutModalOpen(false);
	};

	const handleDeleteAccountClick = () => {
		// 회원 탈퇴 로직 추가
		navigate('/account-cancel');
	};

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="계정 관리" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<ProfilePicWrapper>
					<ProfilePic>
						<img src={avatar} alt="프로필 사진" />
					</ProfilePic>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 0 }} color={theme.colors.black}>
								IDID
							</StyledText>
						</Label>
					</Row>
					<Row>
						<Label>
							<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 0 }} color={theme.colors.gray3}>
								이름 | thscks000@naver.com
							</StyledText>
						</Label>
					</Row>
				</ProfilePicWrapper>
				<List>
					<ListItem onClick={handleEditProfileClick}>
						<img src={useredit} alt="회원 정보 수정 아이콘" />
						<StyledText $textTheme={{ style: 'body2-Light', lineHeight: 0 }} color={theme.colors.black}>
							회원 정보 수정
						</StyledText>
						<img src={next} alt="다음 아이콘" />
					</ListItem>
					<ListItem onClick={handleLogoutClick}>
						<img src={exit} alt="로그아웃 아이콘" />
						<StyledText $textTheme={{ style: 'body2-Light', lineHeight: 0 }} color={theme.colors.black}>
							Logout
						</StyledText>
						<img src={next} alt="다음 아이콘" />
					</ListItem>
					<ListItem onClick={handleDeleteAccountClick}>
						<img src={cancleaccount} alt="회원 탈퇴 아이콘" />
						<StyledText $textTheme={{ style: 'body2-Light', lineHeight: 0 }} color={theme.colors.black}>
							회원탈퇴
						</StyledText>
						<img src={next} alt="다음 아이콘" />
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
