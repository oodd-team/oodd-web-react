import React, { useState } from 'react';
import { ImageSelectorContainer, ImagePlaceholder, HiddenFileInput } from './styles';
import { Header, PrevButton, Text } from '../Header';
import { Footer, Button } from '../Footer';
import close from '../assets/close.svg';
import picture from './assets/picture.svg';

interface ImageSelectModalProps {
	selectedImages: string[];
	onClose: () => void;
	onSelect: (images: string[]) => void;
}

const ImageSelectModal: React.FC<ImageSelectModalProps> = ({ selectedImages, onClose, onSelect }) => {
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
		<>
			<Header>
				<PrevButton onClick={onClose}>
					<img src={close} />
				</PrevButton>
				<Text>OOTD 업로드</Text>
			</Header>
			<ImageSelectorContainer>
				<img src={picture} />
				<ImagePlaceholder>사진을 여기에 끌어다 놓으세요</ImagePlaceholder>
				<HiddenFileInput type="file" onChange={handleFileUpload} ref={fileInputRef} multiple />
			</ImageSelectorContainer>
			<Footer>
				<Button onClick={handleButtonClick}>컴퓨터에서 사진 선택</Button>
			</Footer>
		</>
	);
};

export default ImageSelectModal;
