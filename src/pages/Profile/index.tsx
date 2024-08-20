// src/pages/ProfilePage/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContainer, AddButton } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import NavBar from '../../components/NavBar';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';

import button_plus from './assets/button_plus.svg';
import Insta from '../../assets/BottomSheetMenu/Insta.svg';
import Picture from '../../assets/BottomSheetMenu/Picture.svg';

const Profile: React.FC = () => {
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const navigate = useNavigate();

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '인스타 피드 가져오기',
				action: () => {
					setIsBottomSheetOpen(false);
					handleInstagramSelect();
				},
				icon: Insta,
			},
			{
				text: '사진 올리기',
				action: () => {
					setIsBottomSheetOpen(false);
					handlePhotoUploadSelect();
				},
				icon: Picture,
			},
		],
		marginBottom: '50px',
	};

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
		},
	};

	const handleOpenSheet = () => {
		setIsBottomSheetOpen(true);
	};

	const handleInstagramSelect = () => {
		navigate('/upload', { state: { mode: 'instagram' } });
	};

	const handlePhotoUploadSelect = () => {
		navigate('/upload', { state: { mode: 'image' } });
	};

	return (
		<OODDFrame>
			<ProfileContainer>
				<AddButton onClick={handleOpenSheet}>
					<img src={button_plus} />
				</AddButton>
				<NavBar />
				{isBottomSheetOpen && <BottomSheet {...bottomSheetProps} />}
			</ProfileContainer>
		</OODDFrame>
	);
};

export default Profile;
