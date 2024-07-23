import React from 'react';
import { SheetContainer, SheetContent, HandleBar, OptionButton } from './styles';
import insta from './assets/insta.svg';
import picture from './assets/picture.svg';

interface BottomSheetProps {
	onClose: () => void;
	onInstagramSelect: () => void;
	onPhotoUploadSelect: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose, onInstagramSelect, onPhotoUploadSelect }) => {
	const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
		onClose();
	};

	return (
		<SheetContainer onClick={handleBackgroundClick}>
			<SheetContent>
				<HandleBar />
				<OptionButton onClick={onInstagramSelect}>
					<img src={insta} />
					<span>인스타 피드 가져오기</span>
				</OptionButton>
				<OptionButton onClick={onPhotoUploadSelect}>
					<img src={picture} />
					<span>사진 올리기</span>
				</OptionButton>
			</SheetContent>
		</SheetContainer>
	);
};

export default BottomSheet;
