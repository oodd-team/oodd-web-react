import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
	postImagesAtom,
	postContentAtom,
	postClothingInfosAtom,
	postStyletagAtom,
	postIsRepresentativeAtom,
} from '../../recoil/PostUpload/PostAtom';
import { UploadContainer, ImageDragDropContainer, Content } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import TopBar from '../../components/TopBar';
import BottomButton from '../../components/BottomButton';
import { StyledText } from '../../components/Text/StyledText';
import close from '../../assets/Upload/close.svg';
import back from '../../assets/Upload/back.svg';
import picture from '../../assets/Upload/picture.svg';
import ImageSwiper from '../PostImageSelect/ImageSwiper';
import { ImageSelectModalProps } from './dto';

const PostImageSelect: React.FC<ImageSelectModalProps> = () => {
	const [images, setImages] = useRecoilState(postImagesAtom);
	const [, setContent] = useRecoilState(postContentAtom);
	const [, setClothingInfos] = useRecoilState(postClothingInfosAtom);
	const [, setStyletag] = useRecoilState(postStyletagAtom);
	const [, setIsRepresentative] = useRecoilState(postIsRepresentativeAtom);
	const [isActive, setActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	const handleClose = () => {
		navigate('/mypage');
	};

	const handlePrev = () => {
		setImages([]);
		setContent('');
		setClothingInfos([]);
		setStyletag(null);
		setIsRepresentative(false);
	};

	const handleNext = () => {
		navigate('/upload');
	};

	// 파일 선택기에서 사진 업로드
	const handleSelectImage = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// 드래그 앤 드롭으로 사진 업로드
	const handleDragEnter = () => setActive(true);
	const handleDragLeave = () => setActive(false);
	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // 파일을 드래그했을 때, 브라우저 기본 동작에 의해 새 창이 뜨는 것 방지
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault(); // 파일을 드롭했을 때, 브라우저 기본 동작에 의해 새 창이 뜨는 것 방지

		setActive(false);

		if (event.dataTransfer.files) {
			handleProcessFile(event.dataTransfer.files);
		}
	};

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (event.target.files) {
			handleProcessFile(event.target.files);
		}
	};

	const handleProcessFile = (files: FileList) => {
		const filesArray = Array.from(files);
		filesArray.forEach((file) => {
			if (file.type.startsWith('image/')) {
				// 이미지 파일인지 확인
				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						handleAddImage([reader.result.toString()]);
					}
				};
				reader.readAsDataURL(file);
			} else {
				alert('이미지 파일만 업로드할 수 있습니다.');
			}
		});
	};

	const handleAddImage = (newImages: string[]) => {
		setImages([...images, ...newImages]);
	};

	const handleRemoveImage = (image: string) => {
		if (images.length > 1) {
			const newImages = images.filter((img) => img !== image);
			setImages(newImages);
		}
	};

	return (
		<OODDFrame>
			<UploadContainer>
				<TopBar
					text="OOTD 업로드"
					LeftButtonSrc={images.length === 0 ? close : back}
					onLeftClick={images.length === 0 ? handleClose : handlePrev}
				/>
				<Content>
					{images.length === 0 ? (
						<ImageDragDropContainer
							className={`${isActive ? ' active' : ''}`}
							onDragEnter={handleDragEnter}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>
								사진을 여기에 끌어다 놓으세요
							</StyledText>
							<img src={picture} />
							<input type="file" onChange={handleFileInputChange} ref={fileInputRef} multiple accept="image/*" />
						</ImageDragDropContainer>
					) : (
						<ImageSwiper images={images} onRemoveImage={handleRemoveImage} onProcessFile={handleProcessFile} />
					)}
				</Content>

				<BottomButton
					content={images.length === 0 ? '컴퓨터에서 사진 선택' : '다음'}
					onClick={images.length === 0 ? handleSelectImage : handleNext}
				/>
			</UploadContainer>
		</OODDFrame>
	);
};

export default PostImageSelect;
