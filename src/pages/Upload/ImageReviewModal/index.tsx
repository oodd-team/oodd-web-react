import React from 'react';
import { Content } from './styles';
import TopBar from '../../../components/TopBar';
import BottomButton from '../../../components/BottomButton';
import back from '../../../assets/Upload/back.svg';
import { ImageReviewModalProps } from '../dto';
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
			<TopBar text="OOTD 업로드" LeftButtonSrc={back} onLeftClick={onPrev} />
			<Content>
				<ImageSwiper images={selectedImages} onRemove={handleRemoveImage} onAddImages={onAddImages} />
			</Content>
			<BottomButton content="다음" onClick={onNext} />
		</>
	);
};

export default ImageReviewModal;
