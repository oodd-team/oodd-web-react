import React from 'react';
import { SheetContainer, SheetContent, HandleBar, OptionButton } from './styles';
import { StyledText } from '../../../components/Text/StyledText';
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
					<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 2 }}>인스타 피드 가져오기</StyledText>
				</OptionButton>
				<OptionButton onClick={onPhotoUploadSelect}>
					<img src={picture} />
					<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 2 }}>사진 올리기</StyledText>
				</OptionButton>
			</SheetContent>
		</SheetContainer>
	);
};

export default BottomSheet;
