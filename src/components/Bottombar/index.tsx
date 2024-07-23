import React, { useState } from 'react';
import { BottombarContainer, BottombarLayout, IconImg, IconWrapper } from './styles';
import Chat_s from './../../assets/Bottombar/Chat_s.svg';
import Chat_f from './../../assets/Bottombar/Chat_f.svg';
import Home_s from './../../assets/Bottombar/Home_s.svg';
import Home_f from './../../assets/Bottombar/Home_f.svg';
import Profile_s from './../../assets/Bottombar/Profile_s.svg';
import Profile_f from './../../assets/Bottombar/Profile_f.svg';

const tabs = [
	{ name: 'Chats', iconSelected: Chat_f, iconUnselected: Chat_s },
	{ name: 'Home', iconSelected: Home_f, iconUnselected: Home_s },
	{ name: 'Profile', iconSelected: Profile_f, iconUnselected: Profile_s },
];

const Bottombar: React.FC = () => {
	const [selectedTab, setSelectedTab] = useState<string>('Home');

	return (
		<BottombarLayout>
			<BottombarContainer>
				{tabs.map((tab) => (
					<IconWrapper key={tab.name} onClick={() => setSelectedTab(tab.name)}>
						<IconImg src={selectedTab === tab.name ? tab.iconSelected : tab.iconUnselected} />
						<p>{tab.name}</p>
					</IconWrapper>
				))}
			</BottombarContainer>
		</BottombarLayout>
	);
};

export default Bottombar;
