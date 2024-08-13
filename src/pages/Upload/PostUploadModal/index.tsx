//PostUploadModal/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Content,
	StyledInput,
	TagContainer,
	ClothingInfoList,
	StyletagList,
	StyletagItem,
	PinnedPostToggleContainer,
} from './styles';
import { Header, PrevButton } from '../styles';
import BottomButton from '../../../components/BottomButton';
import { StyledText } from '../../../components/Text/StyledText';
import ImageSwiper from './ImageSwiper';
import ClothingInfoItem from './ClothingInfoItem';
import SearchBottomSheet from './SearchBottomSheet/index';
import ToggleSwitch from './ToggleSwitch';
import back from '../assets/back.svg';
import clothingTag from '../assets/clothingTag.svg';
import styleTag from '../assets/styleTag.svg';
import pin from '../assets/pin.svg';
import next from '../assets/next.svg';
import next_up from '../assets/next_up.svg';
import { PostUploadModalProps, ClothingInfo, Styletag } from './dto';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import request, { BaseResponse } from '../../../apis/core';

const PostUploadModal: React.FC<PostUploadModalProps> = ({ onPrev, selectedImages }) => {
	const [content, setContent] = useState('');
	const [clothingInfos, setClothingInfos] = useState<ClothingInfo[]>([]);
	const [selectedStyletag, setSelectedStyletag] = useState<Styletag | null>(null);
	const [isOOTD, setIsOOTD] = useState(false);
	const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
	const [isStyletagListOpen, setIsStyletagListOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const styletags: Styletag[] = [
		{ tag: '#classic', color: 'rgba(255, 0, 0, 0.15)' },
		{ tag: '#street', color: 'rgba(255, 100, 0, 0.15)' },
		{ tag: '#hip', color: 'rgba(255, 255, 0, 0.15)' },
		{ tag: '#vintage', color: 'rgba(0, 255, 0, 0.15)' },
	];

	const navigate = useNavigate();

	const handleToggleSearchSheet = () => {
		setIsSearchSheetOpen((open) => !open);
	};

	const handleToggleStyleTagList = () => {
		setIsStyletagListOpen((open) => !open);
	};

	const handleAddClothingInfo = (newClothingInfo: ClothingInfo) => {
		setClothingInfos((clothingInfos) => [...clothingInfos, newClothingInfo]);
	};

	const handleDeleteClothingInfo = (deleteClothingInfo: ClothingInfo) => {
		const deletedClothingInfo = clothingInfos.filter((clothing) => clothing !== deleteClothingInfo);
		setClothingInfos(deletedClothingInfo);
	};

	const handleSelectStyletag = (tag: Styletag) => {
		setSelectedStyletag((prevSelected) => (prevSelected?.tag === tag.tag ? null : tag));
		setIsStyletagListOpen(false);
	};

	const handleToggleOOTD = () => {
		setIsOOTD(!isOOTD);
	};

	const uploadImageToFirebase = async (image: string) => {
		const response = await fetch(image);
		const blob = await response.blob();
		const storageRef = ref(storage, `ootd/images/${Date.now()}`);
		await uploadBytes(storageRef, blob);
		return getDownloadURL(storageRef);
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		try {
			const uploadedImages = await Promise.all(selectedImages.map(uploadImageToFirebase));

			const postData = {
				photoUrls: uploadedImages,
				content,
				styletags: selectedStyletag ? [selectedStyletag.tag] : [],
				clothingInfo: clothingInfos,
			};
			//console.log(postData);

			// 서버에 게시물 데이터 업로드
			const response = await request.post<BaseResponse>('posts', postData);

			if (!response.isSuccess) {
				throw new Error(response.message || 'Failed');
			}

			console.log(response.result);
			navigate('/profile');
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
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
				<ImageSwiper images={selectedImages} />
				<StyledInput value={content} onChange={(e) => setContent(e.target.value)} placeholder="문구를 작성하세요..." />
				<TagContainer className="clothingTag">
					<div onClick={handleToggleSearchSheet}>
						<img src={clothingTag} />
						<StyledText className="label" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
							옷 정보 태그
						</StyledText>
						{clothingInfos.length > 0 && (
							<StyledText className="count" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
								{clothingInfos.length}
							</StyledText>
						)}
						<img src={next} />
					</div>
					{clothingInfos.length > 0 && (
						<ClothingInfoList>
							{clothingInfos.map((clothingObj, index) => (
								<ClothingInfoItem key={index} clothingObj={clothingObj} onDelete={handleDeleteClothingInfo} />
							))}
						</ClothingInfoList>
					)}
				</TagContainer>
				<TagContainer>
					<div onClick={handleToggleStyleTagList}>
						<img src={styleTag} />
						<StyledText className="label" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
							스타일 태그
						</StyledText>
						{isStyletagListOpen ? (
							<img src={next_up} />
						) : !selectedStyletag ? (
							<>
								<StyledText className="not_selected" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
									미지정
								</StyledText>
								<img src={next} />
							</>
						) : (
							<StyletagItem selected={false} color={selectedStyletag?.color}>
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>{selectedStyletag?.tag}</StyledText>
							</StyletagItem>
						)}
					</div>
					{isStyletagListOpen && (
						<StyletagList>
							{styletags.map((tagObj, index) => (
								<StyletagItem
									key={index}
									onClick={() => handleSelectStyletag(tagObj)}
									selected={selectedStyletag?.tag === tagObj.tag}
									color={tagObj.color}
								>
									<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>{tagObj.tag}</StyledText>
								</StyletagItem>
							))}
						</StyletagList>
					)}
				</TagContainer>
				<PinnedPostToggleContainer>
					<img src={pin} />
					<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>대표 OOTD 지정</StyledText>
					<div>
						<ToggleSwitch checked={isOOTD} onChange={handleToggleOOTD} />
					</div>
				</PinnedPostToggleContainer>
			</Content>

			<BottomButton content="공유" onClick={handleSubmit} disabled={isLoading} />

			{isSearchSheetOpen && (
				<SearchBottomSheet onClose={handleToggleSearchSheet} onSelectClothingInfo={handleAddClothingInfo} />
			)}
		</>
	);
};

export default PostUploadModal;
