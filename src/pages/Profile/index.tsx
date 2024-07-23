import React from 'react';
import Bottombar from '../../components/Bottombar';
import { OODDContainer, OODDFrame } from '../../components/Frame/Frame';

const Profile: React.FC = () => {
	return (
		<OODDFrame>
			<OODDContainer>프로필페이지입니다</OODDContainer>
			<Bottombar />
		</OODDFrame>
	);
};

export default Profile;
