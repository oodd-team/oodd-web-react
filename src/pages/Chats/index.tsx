import React from 'react';
import Bottombar from '../../components/Bottombar';
import { OODDContainer, OODDFrame } from '../../components/Frame/Frame';

const Chats: React.FC = () => {
	return (
		<OODDFrame>
			<OODDContainer>채팅페이지입니다</OODDContainer>
			<Bottombar />
		</OODDFrame>
	);
};

export default Chats;
