import React, { useRef } from 'react';
import { Content, ImageContainer, ImageWrapper, RemoveButton, AddButton, HiddenFileInput } from './styles';
import { Header, PrevButton, Text } from '../Header';
import { Footer, Button } from '../Footer';
import back from '../assets/back.svg';
import plus from './assets/plus.svg';
import remove from './assets/remove.svg';

interface ImageReviewModalProps {
	onPrev: () => void;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onDeleteImages: (images: string[]) => void;
	onNext: () => void;
}

const ImageReviewModal: React.FC<ImageReviewModalProps> = ({
	onPrev,
	selectedImages,
	onAddImages,
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
							onAddImages(newImages);
						}
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const handleAddImageClick = () => {
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
		<>
			<Header>
				<PrevButton onClick={onPrev}>
					<img src={back} />
				</PrevButton>
				<Text>OOTD 업로드</Text>
			</Header>
			<Content>
				<ImageContainer>
					{selectedImages.map((image, index) => (
						<ImageWrapper key={index}>
							<img src={image} alt={`Selected ${index}`} />
							{selectedImages.length > 1 && (
								<RemoveButton onClick={() => handleRemoveImage(image)}>
									<img src={remove} />
								</RemoveButton>
							)}
						</ImageWrapper>
					))}
					<AddButton onClick={handleAddImageClick}>
						<img src={plus} />
					</AddButton>
					<HiddenFileInput type="file" onChange={handleFileUpload} ref={fileInputRef} multiple />
				</ImageContainer>
			</Content>
			<Footer>
				<Button onClick={onNext}>다음</Button>
			</Footer>
		</>
	);
};

export default ImageReviewModal;
