import React from 'react';
import NavBar from '../../components/NavBar';
import { OODDFrame } from '../../components/Frame/Frame';

const Profile: React.FC = () => {
	return (
		<OODDFrame>
			{/* 각자 작업 height에 맞게 조절하여 ProfileContainer을 위치시킵니다. HomeContainer를 참고해주세요. */}
			프로필페이지입니다
			<NavBar />
		</OODDFrame>
	);
};

export default Profile;
