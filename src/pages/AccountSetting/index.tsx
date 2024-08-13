import React, { useState } from 'react';
import {
	ProfileEditContainer,
	ProfilePic,
	ProfilePicWrapper,
	Label,
	Row,
	List,
	ListItem,
	ModalOverlay,
	ModalContent,
	ModalButtonContainer,
	ModalButton,
} from './styles';
import { OODDFrame } from '../../components/Frame/Frame';

import avatar from '../../assets/avatar.png';
import NavbarAccSetting from '../../components/NavbarAccSetting';
import { useNavigate } from 'react-router-dom';
import useredit from './assets/useredit.svg';
import exit from './assets/exit.svg';
import cancleaccount from './assets/cancleaccount.svg';
import next from './assets/next.svg';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

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
				<NavbarAccSetting />
				<ProfilePicWrapper>
					<ProfilePic>
						<img src={avatar} alt="프로필 사진" />
					</ProfilePic>
					<Row>
						<Label>IDID</Label>
					</Row>
					<Row>
						<Label>이름 | thscks000@naver.com</Label>
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
					<ModalOverlay>
						<ModalContent>
							<Label>이 기기에서 정말 로그아웃 할까요?</Label>
							<ModalButtonContainer>
								<ModalButton onClick={handleCloseModal}>취소</ModalButton>
								<ModalButton onClick={handleConfirmLogout} style={{ color: 'red' }}>
									로그아웃
								</ModalButton>
							</ModalButtonContainer>
						</ModalContent>
					</ModalOverlay>
				)}
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default AccountSetting;
