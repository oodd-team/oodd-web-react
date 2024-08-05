import React from 'react';
import NavBar from '../../components/NavBar';
import { OODDFrame } from '../../components/Frame/Frame';

const Chats: React.FC = () => {
	return (
		<OODDFrame>
			{/* 각자 작업 height에 맞게 조절하여 ChatsContainer을 위치시킵니다. HomeContainer를 참고해주세요. */}
			채팅페이지입니다
			<NavBar />
		</OODDFrame>
	);
};

export default Chats;
