import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import { getCurrentUserId } from '@utils/getCurrentUserId';

import logout from '@assets/default/leave.svg';
import logo from '@assets/default/oodd.svg';

import Alarm from '@components/Icons/Alarm';
import Home from '@components/Icons/Home';
import Message from '@components/Icons/Message';
import MyPage from '@components/Icons/MyPage';

import Modal from '@components/Modal';
import { StyledText } from '@components/Text/StyledText';

import type { ModalProps } from '@components/Modal/dto';

import {
	NavBarContainer,
	NavBarWrapper,
	IconWrapper,
	SideNavBarContainer,
	SideNavBarList,
	SideNavBarItem,
	SideNavBarButton,
	SideNavBarHeader,
	SideNavBarFooter,
	Icon,
} from './styles';

const NavBar: React.FC = () => {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const [selectedTab, setSelectedTab] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const currentUserId = getCurrentUserId();

	const tabs = [
		{
			name: 'Chats',
			Icon: (isSelected: boolean, isDesktop: boolean) => (
				<Message isFilled={isSelected} color={isDesktop ? 'black' : 'white'} width="16" height="16" />
			),
			route: '/chats',
		},
		{
			name: 'Home',
			Icon: (isSelected: boolean, isDesktop: boolean) => (
				<Home isFilled={isSelected} color={isDesktop ? 'black' : 'white'} width="18" height="18" />
			),
			route: '/',
		},
		{
			name: 'Profile',
			Icon: (isSelected: boolean, isDesktop: boolean) => (
				<MyPage isFilled={isSelected} color={isDesktop ? 'black' : 'white'} />
			),
			route: `/profile/${currentUserId}`,
		},
	];

	useEffect(() => {
		const currentTab = tabs.find((tab) => tab.route === location.pathname);
		if (currentTab) {
			setSelectedTab(currentTab.name);
		}
	}, [location.pathname]);

	const handleTabClick = (tab: (typeof tabs)[0]) => {
		setSelectedTab(tab.name);
		navigate(tab.route);
		if (tab.name === 'Home') {
			sessionStorage.setItem('scrollPosition', '0');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleLogoutConfirmButtonClick = () => {
		localStorage.clear();
		setIsLogoutModalOpen(false);

		navigate('/login');
	};

	const handleLogoutButtonClick = () => {
		setIsLogoutModalOpen(true);
	};

	const logoutModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => {
			setIsLogoutModalOpen(false);
		},
		content: '이 기기에서 정말 로그아웃 할까요?',
		button: {
			content: '로그아웃',
			onClick: handleLogoutConfirmButtonClick,
		},
	};

	return (
		<>
			<NavBarContainer>
				<NavBarWrapper>
					{tabs.map((tab) => (
						<IconWrapper key={tab.name} onClick={() => handleTabClick(tab)}>
							<Icon>{tab.Icon(selectedTab === tab.name, false)}</Icon>
							<p>{tab.name}</p>
						</IconWrapper>
					))}
				</NavBarWrapper>
			</NavBarContainer>
			<SideNavBarContainer>
				<SideNavBarHeader>
					<img src={logo} alt="oodd" className="logo" />
					<button className="alarm">
						<Alarm></Alarm>
					</button>
				</SideNavBarHeader>
				<SideNavBarList>
					{tabs.map((tab) => (
						<SideNavBarItem key={tab.name} onClick={() => handleTabClick(tab)}>
							<SideNavBarButton>
								<button>{tab.Icon(selectedTab === tab.name, true)}</button>
								<StyledText
									className="styled-text"
									$textTheme={{ style: selectedTab === tab.name ? `heading2-bold` : 'heading2-medium' }}
									color={theme.colors.text.primary}
								>
									{tab.name}
								</StyledText>
							</SideNavBarButton>
						</SideNavBarItem>
					))}
				</SideNavBarList>
				<SideNavBarFooter>
					<SideNavBarButton onClick={handleLogoutButtonClick}>
						<button>
							<img src={logout} alt="로그아웃" />
						</button>
					</SideNavBarButton>
				</SideNavBarFooter>
			</SideNavBarContainer>
			{isLogoutModalOpen && <Modal {...logoutModalProps} />}
		</>
	);
};

export default NavBar;
