import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { SheetContainer, SheetContent, HandleBar, OptionButton } from './styles';

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
					<FontAwesomeIcon icon={faInstagram} />
					<span>인스타 피드 가져오기</span>
				</OptionButton>
				<OptionButton onClick={onPhotoUploadSelect}>
					<FontAwesomeIcon icon={faImage} className="icon-image" />
					<span>사진 올리기</span>
				</OptionButton>
			</SheetContent>
		</SheetContainer>
	);
};

export default BottomSheet;
