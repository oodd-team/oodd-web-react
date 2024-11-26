import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	NavBarContainer,
	NavBarWrapper,
	IconImg,
	IconWrapper,
	SideNavBarContainer,
	SideNavBarList,
	SideNavBarItem,
	SideNavBarButton,
	SideNavBarHeader,
	SideNavBarFooter,
} from './styles';
import Chat_s from './../../assets/default/message-white.svg';
import Chat_f from './../../assets/default/message-fill.svg';
import Home_s from './../../assets/default/home.svg';
import Home_f from './../../assets/default/home-fill.svg';
import Profile_s from './../../assets/default/my-page-white.svg';
import Profile_f from './../../assets/default/my-page-fill.svg';
import logo from './../../assets/default/oodd.svg';
import alarm from './../../assets/default/alarm.svg';
// import clickedAlarm from './../../assets/default/alarm-on.svg';
import chatDesktopIcon from './../../assets/default/desktopNavBar/message.svg';
import chatFillDesktopIcon from './../../assets/default/desktopNavBar/message-fill.svg';
import homeDesktopIcon from './../../assets/default/desktopNavBar/home.svg';
import homeFillDesktopIcon from './../../assets/default/desktopNavBar/home-fill.svg';
import profileDesktopIcon from './../../assets/default/desktopNavBar/my-page.svg';
import profileFillDesktopIcon from './../../assets/default/desktopNavBar/my-page-fill.svg';
import logout from './../../assets/default/leave.svg';
import { StyledText } from '../Text/StyledText';
import Modal from '../Modal';
import { ModalProps } from '../Modal/dto';

const tabs = [
	{ name: 'Chats', iconSelected: Chat_f, iconUnselected: Chat_s, route: '/chats' },
	{ name: 'Home', iconSelected: Home_f, iconUnselected: Home_s, route: '/' },
	{ name: 'Profile', iconSelected: Profile_f, iconUnselected: Profile_s, route: '/mypage' },
];

const desktopTabs = [
	{ name: 'Home', iconSelected: homeFillDesktopIcon, iconUnselected: homeDesktopIcon, route: '/' },
	{ name: 'Chats', iconSelected: chatFillDesktopIcon, iconUnselected: chatDesktopIcon, route: '/chats' },
	{ name: 'Profile', iconSelected: profileFillDesktopIcon, iconUnselected: profileDesktopIcon, route: '/mypage' },
];

const NavBar: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState('');
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const currentTab = tabs.find((tab) => tab.route === location.pathname);
		if (currentTab) {
			setSelectedTab(currentTab.name);
		}
	}, [location.pathname]);

	const handleTabClick = (tab: (typeof tabs)[0]) => {
		setSelectedTab(tab.name);
		navigate(tab.route);
	};

	const handleConfirmLogout = () => {
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
			onClick: handleConfirmLogout,
		},
	};

	return (
		<>
			{isLogoutModalOpen && <Modal {...logoutModalProps} />}
			<NavBarContainer>
				<NavBarWrapper>
					{tabs.map((tab) => (
						<IconWrapper key={tab.name} onClick={() => handleTabClick(tab)}>
							<IconImg src={selectedTab === tab.name ? tab.iconSelected : tab.iconUnselected} />
							<p>{tab.name}</p>
						</IconWrapper>
					))}
				</NavBarWrapper>
			</NavBarContainer>
			<SideNavBarContainer>
				<SideNavBarHeader>
					<img src={logo} alt="oodd" className="logo" />
					<button className="alarm">
						<img src={alarm} alt="알림" />
					</button>
				</SideNavBarHeader>
				<SideNavBarList>
					{desktopTabs.map((tab) => (
						<SideNavBarItem key={tab.name} onClick={() => handleTabClick(tab)}>
							<SideNavBarButton>
								<button>
									<img src={selectedTab === tab.name ? tab.iconSelected : tab.iconUnselected} />
								</button>
								<StyledText
									className="styled-text"
									$textTheme={{ style: selectedTab === tab.name ? `heading2-bold` : 'heading2-medium' }}
									color="#1d1d1d"
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
							<img src={logout} alt="" />
						</button>
					</SideNavBarButton>
				</SideNavBarFooter>
			</SideNavBarContainer>
		</>
	);
};

export default NavBar;
