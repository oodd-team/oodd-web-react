import React, { useRef } from 'react';
import {
	ModalContainer,
	Content,
	ImageContainer,
	ImageWrapper,
	RemoveButton,
	AddButton,
	HiddenFileInput,
} from './styles';
import { Header, PrevButton, Text } from '../Header/styles';
import { Footer, Button } from '../Footer/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

interface PhotoReviewModalProps {
	onPrev: () => void;
	selectedImages: string[];
	onAddMoreImages: (images: string[]) => void;
	onDeleteImages: (images: string[]) => void;
	onNext: () => void;
}

const PhotoReviewModal: React.FC<PhotoReviewModalProps> = ({
	onPrev,
	selectedImages,
	onAddMoreImages,
	onDeleteImages,
	onNext,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			const newImages: string[] = [];
			filesArray.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						newImages.push(reader.result.toString());
						if (newImages.length === filesArray.length) {
							onAddMoreImages(newImages);
						}
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const handleAddMoreClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleRemoveImage = (image: string) => {
		if (selectedImages.length > 1) {
			const newImages = selectedImages.filter((img) => img !== image);
			onDeleteImages(newImages);
		}
	};

	return (
		<ModalContainer>
			<Header>
				<PrevButton onClick={onPrev}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</PrevButton>
				<Text>OOTD 업로드</Text>
			</Header>
			<Content>
				<ImageContainer>
					{selectedImages.map((image, index) => (
						<ImageWrapper key={index}>
							<img src={image} alt={`Selected ${index}`} />
							{selectedImages.length > 1 && <RemoveButton onClick={() => handleRemoveImage(image)}>×</RemoveButton>}
						</ImageWrapper>
					))}
					<AddButton onClick={handleAddMoreClick}>
						<FontAwesomeIcon icon={faPlus} />
					</AddButton>
					<HiddenFileInput type="file" onChange={handleFileUpload} ref={fileInputRef} multiple />
				</ImageContainer>
			</Content>
			<Footer>
				<Button onClick={onNext}>다음</Button>
			</Footer>
		</ModalContainer>
	);
};

export default PhotoReviewModal;
