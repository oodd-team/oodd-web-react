// src/pages/ProfilePage/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Overlay, PageOverlay, AddButton } from './styles';
import BottomSheet from './BottomSheet';
import button_plus from './assets/button_plus.svg';

const ProfilePage: React.FC = () => {
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
		<Overlay>
			<PageOverlay>
				<AddButton onClick={handleOpenSheet}>
					<img src={button_plus} />
				</AddButton>
				{isSheetOpen && (
					<BottomSheet
						onClose={handleCloseSheet}
						onInstagramSelect={handleInstagramSelect}
						onPhotoUploadSelect={handlePhotoUploadSelect}
					/>
				)}
			</PageOverlay>
		</Overlay>
	);
};

export default ProfilePage;
