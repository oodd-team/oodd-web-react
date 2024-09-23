import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postImagesState } from '../../recoil/atoms';
import { Content } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import TopBar from '../../components/TopBar';
import BottomButton from '../../components/BottomButton';
import back from '../../assets/Upload/back.svg';
import { ImageReviewModalProps } from './dto';
import ImageSwiper from './ImageSwiper';

const PostImageReview: React.FC<ImageReviewModalProps> = () => {
	const navigate = useNavigate();
	const [selectedImages, setSelectedImages] = useRecoilState(postImagesState);

	const handlePrev = () => {
		navigate(-1);
	};

	const handleNext = () => {
		navigate('/upload');
	};

	const handleRemoveImage = (image: string) => {
		if (selectedImages.length > 1) {
			const newImages = selectedImages.filter((img) => img !== image);
			setSelectedImages(newImages);
		}
	};

	const handleAddImages = (newImages: string[]) => {
		setSelectedImages([...selectedImages, ...newImages]); // Recoil 상태 업데이트
	};

	return (
		<OODDFrame>
			<TopBar text="OOTD 업로드" LeftButtonSrc={back} onLeftClick={handlePrev} />
			<Content>
				<ImageSwiper images={selectedImages} onRemove={handleRemoveImage} onAddImages={handleAddImages} />
			</Content>
			<BottomButton content="다음" onClick={handleNext} />
		</OODDFrame>
	);
};

export default PostImageReview;
