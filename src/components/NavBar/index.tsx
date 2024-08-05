import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBarContainer, NavBarWrapper, IconImg, IconWrapper } from './styles';
import Chat_s from './../../assets/NavBar/Chat_s.svg';
import Chat_f from './../../assets/NavBar/Chat_f.svg';
import Home_s from './../../assets/NavBar/Home_s.svg';
import Home_f from './../../assets/NavBar/Home_f.svg';
import Profile_s from './../../assets/NavBar/Profile_s.svg';
import Profile_f from './../../assets/NavBar/Profile_f.svg';

const tabs = [
	{ name: 'Chats', iconSelected: Chat_f, iconUnselected: Chat_s, route: '/chats' },
	{ name: 'Home', iconSelected: Home_f, iconUnselected: Home_s, route: '/' },
	{ name: 'Profile', iconSelected: Profile_f, iconUnselected: Profile_s, route: '/profile' },
];

const NavBar: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<string>('');
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

	return (
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
	);
};

export default NavBar;
