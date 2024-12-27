import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import {
	postImagesAtom,
	postContentAtom,
	postClothingInfosAtom,
	postStyletagAtom,
	postIsRepresentativeAtom,
} from '../../recoil/PostUpload/PostUploadAtom';

import { UploadContainer, ImageDragDropContainer, Content } from './styles';

import { OODDFrame } from '../../components/Frame/Frame';
import { StyledText } from '../../components/Text/StyledText';
import TopBar from '../../components/TopBar';
import BottomButton from '../../components/BottomButton';
import ImageSwiper from './ImageSwiper';

import X from '../../assets/default/x.svg';
import Left from '../../assets/arrow/left.svg';
import PhotoBig from '../../assets/default/photo-big.svg';

import { ImageSelectModalProps } from './dto';
import heic2any from 'heic2any';

const PostImageSelect: React.FC<ImageSelectModalProps> = () => {
	const [images, setImages] = useRecoilState(postImagesAtom);
	const [, setContent] = useRecoilState(postContentAtom);
	const [, setClothingInfos] = useRecoilState(postClothingInfosAtom);
	const [, setStyletag] = useRecoilState(postStyletagAtom);
	const [, setIsRepresentative] = useRecoilState(postIsRepresentativeAtom);
	const [isActive, setActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const location = useLocation();
	const navigate = useNavigate();
	const userId = localStorage.getItem('my_id');

	const handleClose = () => {
		navigate(`/profile/${userId}`);
	};

	const handlePrev = () => {
		setImages([]);
		setContent('');
		setClothingInfos([]);
		setStyletag([]);
		setIsRepresentative(false);
	};

	const handleNext = () => {
		const state = location.state as { mode?: string; postId?: number };
		navigate('/upload', { state: { mode: state?.mode, postId: state?.postId } });
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
			// 파일 선택 후 input 값 초기화
			if (fileInputRef.current) {
				fileInputRef.current.value = ''; // input 값을 초기화하여 동일한 파일을 다시 추가할 수 있도록 함
			}
		}
	};

	const handleProcessFile = async (files: FileList) => {
		const filesArray = Array.from(files);
		for (const file of filesArray) {
			try {
				let fileBlob = file;

				// HEIC 파일인 경우 변환
				if (/\.(heic)$/i.test(fileBlob.name)) {
					const convertedBlob = await heic2any({ blob: fileBlob, toType: 'image/jpeg' });

					// Blob을 File로 변환
					const newFile = new File([convertedBlob as Blob], fileBlob.name.replace(/\.heic$/i, '.jpeg'), {
						type: 'image/jpeg',
						lastModified: new Date().getTime(),
					});
					fileBlob = newFile; // 변환된 파일을 다시 fileBlob으로 할당
				}

				const reader = new FileReader();
				reader.readAsDataURL(fileBlob);
				reader.onload = () => {
					if (reader.result) {
						handleAddImage(reader.result.toString());
					}
				};
			} catch (error) {
				alert('이미지 처리 중 오류가 발생했습니다.');
				console.error(error);
			}
		}
	};

	const handleAddImage = (newImage: string) => {
		setImages((prevImages) => {
			const maxOrderNum = prevImages.reduce((max, img) => (img.orderNum > max ? img.orderNum : max), -1);
			return [...prevImages, { url: newImage, orderNum: maxOrderNum + 1 }];
		});
	};

	const handleRemoveImage = (image: string) => {
		// 이미지가 1개일 때는 삭제 할 수 없음
		if (images.length > 1) {
			const newImages = images.filter((img) => img.url !== image);
			setImages(newImages.map((img, idx) => ({ ...img, orderNum: idx })));
		}
	};

	return (
		<OODDFrame>
			<UploadContainer>
				<TopBar
					text="OOTD 업로드"
					LeftButtonSrc={images.length === 0 ? X : Left}
					onClickLeftButton={images.length === 0 ? handleClose : handlePrev}
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
							<StyledText $textTheme={{ style: 'heading1-regular', lineHeight: 2 }}>
								사진을 여기에 끌어다 놓으세요
							</StyledText>
							<img src={PhotoBig} />
							<input type="file" onChange={handleFileInputChange} ref={fileInputRef} multiple accept="image/*,.heic" />
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
