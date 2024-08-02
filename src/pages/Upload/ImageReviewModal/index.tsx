import React, { useRef } from 'react';
import { Content } from './styles';
import { Header, PrevButton } from '../Header';
import BottomButton from '../../../components/BottomButton';
import { StyledText } from '../../../components/Text/StyledText';
import back from '../assets/back.svg';
import { ImageReviewModalProps } from './dto';
import ImageSwiper from './ImageSwiper';

const ImageReviewModal: React.FC<ImageReviewModalProps> = ({
	onPrev,
	selectedImages,
	onAddImages,
	onDeleteImages,
	onNext,
}) => {
	const handleRemoveImage = (image: string) => {
		if (selectedImages.length > 1) {
			const newImages = selectedImages.filter((img) => img !== image);
			onDeleteImages(newImages);
		}
	};

	return (
		<>
			<Header>
				<PrevButton onClick={onPrev}>
					<img src={back} />
				</PrevButton>
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 2 }}>OOTD 업로드</StyledText>
			</Header>
			<Content>
				<ImageSwiper images={selectedImages} onRemove={handleRemoveImage} onAddImages={onAddImages} />
			</Content>
			<BottomButton content="다음" onClick={onNext} />
		</>
	);
};

export default ImageReviewModal;
