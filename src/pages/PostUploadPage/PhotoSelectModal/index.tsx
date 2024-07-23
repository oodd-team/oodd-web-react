import React, { useState } from 'react';
import { ModalContainer, ImageSelectorContainer, ImagePlaceholder, HiddenFileInput } from './styles';
import { Header, PrevButton, Text } from '../Header/styles';
import { Footer, Button } from '../Footer/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

interface PhotoSelectModalProps {
	selectedImages: string[];
	onClose: () => void;
	onSelect: (images: string[]) => void;
}

const PhotoSelectModal: React.FC<PhotoSelectModalProps> = ({ selectedImages, onClose, onSelect }) => {
	const [images, setImages] = useState<string[]>(selectedImages);
	const fileInputRef = React.createRef<HTMLInputElement>();

	const handleImageClick = (image: string) => {
		const newImages = [...images, image];
		setImages(newImages);
		onSelect(newImages);
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			filesArray.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						handleImageClick(reader.result.toString());
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<ModalContainer>
			<Header>
				<PrevButton onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} />
				</PrevButton>
				<Text>OOTD 업로드</Text>
			</Header>
			<ImageSelectorContainer>
				<FontAwesomeIcon icon={faImage} />
				<ImagePlaceholder>사진을 여기에 끌어다 놓으세요</ImagePlaceholder>
				<HiddenFileInput type="file" onChange={handleFileUpload} ref={fileInputRef} multiple />
			</ImageSelectorContainer>
			<Footer>
				<Button onClick={handleButtonClick}>컴퓨터에서 사진 선택</Button>
			</Footer>
		</ModalContainer>
	);
};

export default PhotoSelectModal;
