import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postImagesState, postContentState, postClothingInfosState, postStyletagState } from '../../recoil/atoms';
import { ImageDragDropContainer } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import TopBar from '../../components/TopBar';
import BottomButton from '../../components/BottomButton';
import { StyledText } from '../../components/Text/StyledText';
import close from '../../assets/Upload/close.svg';
import picture from '../../assets/Upload/picture.svg';
import { ImageSelectModalProps } from './dto';

const PostImageSelect: React.FC<ImageSelectModalProps> = () => {
	const [images, setImages] = useRecoilState(postImagesState);
	const [content, setContent] = useRecoilState(postContentState); // Recoil 상태로 관리
	const [clothingInfos, setClothingInfos] = useRecoilState(postClothingInfosState); // Recoil 상태로 관리
	const [styletag, setStyletag] = useRecoilState(postStyletagState); // Recoil 상태로 관리
	const [isActive, setActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();

	const handleClose = () => {
		setImages([]);
		setContent('');
		setClothingInfos([]);
		setStyletag(null);
		navigate('/mypage');
	};

	const handleAddImage = (image: string) => {
		const newImages = [...images, image];
		setImages(newImages);
	};

	const handleProcessFiles = (files: FileList) => {
		const filesArray = Array.from(files);
		filesArray.forEach((file) => {
			if (file.type.startsWith('image/')) {
				// 이미지 파일인지 확인
				const reader = new FileReader();
				reader.onloadend = () => {
					if (reader.result) {
						handleAddImage(reader.result.toString());
					}
				};
				reader.readAsDataURL(file);
			} else {
				alert('이미지 파일만 업로드할 수 있습니다.');
			}
		});
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
			handleProcessFiles(event.dataTransfer.files);
		}
	};

	// 파일 선택기에서 사진 업로드
	const handleFileSelectClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (event.target.files) {
			handleProcessFiles(event.target.files);
		}
	};

	return (
		<OODDFrame>
			<TopBar text="OOTD 업로드" LeftButtonSrc={close} onLeftClick={handleClose} />
			<ImageDragDropContainer
				className={`${isActive ? ' active' : ''}`}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<StyledText $textTheme={{ style: 'heading2-light', lineHeight: 2 }}>사진을 여기에 끌어다 놓으세요</StyledText>
				<img src={picture} />
				<input type="file" onChange={handleFileInputChange} ref={fileInputRef} multiple accept="image/*" />
			</ImageDragDropContainer>
			<BottomButton content="컴퓨터에서 사진 선택" onClick={handleFileSelectClick} />
		</OODDFrame>
	);
};

export default PostImageSelect;
