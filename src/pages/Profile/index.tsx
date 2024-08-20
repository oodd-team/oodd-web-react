// src/pages/ProfilePage/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddButton } from './styles';

import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';

import button_plus from './assets/button_plus.svg';
import Insta from '../../assets/BottomSheetMenu/Insta.svg';
import Picture from '../../assets/BottomSheetMenu/Picture.svg';
import { OODDFrame } from '../../components/Frame/Frame';

//페이지에서 컴포넌트로 변경했음!

const ProfileActions: React.FC = () => {
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
		isBackgroundDimmed: true,
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
			<AddButton onClick={handleOpenSheet}>
				<img src={button_plus} />
			</AddButton>
			{isBottomSheetOpen && <BottomSheet {...bottomSheetProps} />}
		</OODDFrame>
	);
};

export default ProfileActions;
