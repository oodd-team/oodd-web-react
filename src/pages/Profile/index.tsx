// src/pages/ProfilePage/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContainer, AddButton } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import NavBar from '../../components/NavBar';
import BottomSheet from './BottomSheet';
import button_plus from './assets/button_plus.svg';

const Profile: React.FC = () => {
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const navigate = useNavigate();

	const handleOpenSheet = () => {
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	const handleInstagramSelect = () => {
		handleCloseSheet();
		navigate('/upload', { state: { mode: 'instagram' } });
	};

	const handlePhotoUploadSelect = () => {
		handleCloseSheet();
		navigate('/upload', { state: { mode: 'image' } });
	};

	return (
		<OODDFrame>
			<ProfileContainer>
				<AddButton onClick={handleOpenSheet}>
					<img src={button_plus} />
				</AddButton>
				<NavBar />
				{isSheetOpen && (
					<BottomSheet
						onClose={handleCloseSheet}
						onInstagramSelect={handleInstagramSelect}
						onPhotoUploadSelect={handlePhotoUploadSelect}
					/>
				)}
			</ProfileContainer>
		</OODDFrame>
	);
};

export default Profile;
