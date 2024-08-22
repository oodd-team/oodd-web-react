import React from 'react';
import { BottomNavContainer, NavItem } from './styles';
import { Link } from 'react-router-dom';
import Home from './assets/Home.svg';
import Chat from './assets/Chat.svg';
import Profile from './assets/Profile.svg';

const BottomNav: React.FC = () => {
	return (
		<BottomNavContainer>
			<NavItem>
				<img src={Chat} alt="채팅" />

				<span>Chats</span>
			</NavItem>
			<NavItem>
				<Link to="/">
					<img src={Home} alt="홈" />
				</Link>
				<span>Home</span>
			</NavItem>
			<NavItem>
				<Link to="/Mypage">
					<img src={Profile} alt="프로필" />
				</Link>
				<span>Profile</span>
			</NavItem>
		</BottomNavContainer>
	);
};

export default BottomNav;
