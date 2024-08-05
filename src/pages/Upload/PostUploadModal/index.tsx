//PostUploadModal/index.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	Content,
	StyledInput,
	TagContainer,
	ClothingInfoList,
	ClothingInfoItem,
	HashtagList,
	HashtagItem,
	PinnedPostToggleContainer,
} from './styles';
import { Header, PrevButton } from '../styles';
import BottomButton from '../../../components/BottomButton';
import { StyledText } from '../../../components/Text/StyledText';
import ImageSwiper from './ImageSwiper';
import SearchBottomSheet from './SearchBottomSheet/index';
import ToggleSwitch from './ToggleSwitch';
import back from '../assets/back.svg';
import clothingTag from '../assets/clothingTag.svg';
import styleTag from '../assets/styleTag.svg';
import pin from '../assets/pin.svg';
import next from '../assets/next.svg';
import next_up from '../assets/next_up.svg';
import close from '../assets/close2.svg';
import { PostUploadModalProps, ClothingInfo, Hashtag } from './dto';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const PostUploadModal: React.FC<PostUploadModalProps> = ({ onPrev, selectedImages }) => {
	const [caption, setCaption] = useState('');
	const [clothingInfos, setClothingInfos] = useState<ClothingInfo[]>([]);
	const [selectedHashtag, setSelectedHashtag] = useState<Hashtag | null>(null);
	const [isOOTD, setIsOOTD] = useState(false);
	const [isSearchSheetOpen, setIsSearchSheetOpen] = useState(false);
	const [isHashtagListOpen, setIsHashtagListOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const hashtags: Hashtag[] = [
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
		setIsHashtagListOpen((open) => !open);
	};

	const handleAddClothingInfo = (newClothingInfo: ClothingInfo) => {
		setClothingInfos((clothingInfos) => [...clothingInfos, newClothingInfo]);
	};

	const handleDeleteClothingInfo = (deleteClothingInfo: ClothingInfo) => {
		const deletedClothingInfo = clothingInfos.filter((clothing) => clothing !== deleteClothingInfo);
		setClothingInfos(deletedClothingInfo);
	};

	const handleSelectTag = (tag: Hashtag) => {
		setSelectedHashtag((prevSelected) => (prevSelected?.tag === tag.tag ? null : tag));
		setIsHashtagListOpen(false);
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
				photo_urls: uploadedImages,
				caption,
				hashtags: selectedHashtag ? [selectedHashtag.tag] : [],
				clothing_infos: clothingInfos,
			};

			console.log(postData);

			const response = await axios.post('http://localhost:3001/posts', postData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.status !== 201) {
				throw new Error('Failed');
			}

			const result = response.data;

			console.log(result);
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
				<StyledInput value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="문구를 작성하세요..." />
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
								<ClothingInfoItem key={index}>
									<img src={clothingObj.image} />
									<div className="infoContainer">
										<StyledText className="brand" $textTheme={{ style: 'body2-regular', lineHeight: 1.2 }}>
											{clothingObj.brand}
										</StyledText>
										<StyledText className="detail" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
											{clothingObj.model}
										</StyledText>
									</div>
									<button onClick={() => handleDeleteClothingInfo(clothingObj)}>
										<img src={close} />
									</button>
								</ClothingInfoItem>
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
						{isHashtagListOpen ? (
							<img src={next_up} />
						) : !selectedHashtag ? (
							<>
								<StyledText className="not_selected" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
									미지정
								</StyledText>
								<img src={next} />
							</>
						) : (
							<HashtagItem selected={false} color={selectedHashtag?.color}>
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>{selectedHashtag?.tag}</StyledText>
							</HashtagItem>
						)}
					</div>
					{isHashtagListOpen && (
						<HashtagList>
							{hashtags.map((tagObj, index) => (
								<HashtagItem
									key={index}
									onClick={() => handleSelectTag(tagObj)}
									selected={selectedHashtag?.tag === tagObj.tag}
									color={tagObj.color}
								>
									<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>{tagObj.tag}</StyledText>
								</HashtagItem>
							))}
						</HashtagList>
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

			<BottomButton content="공유" onClick={handleSubmit} />

			{isSearchSheetOpen && (
				<SearchBottomSheet onClose={handleToggleSearchSheet} onSelectClothingInfo={handleAddClothingInfo} />
			)}
		</>
	);
};

export default PostUploadModal;
