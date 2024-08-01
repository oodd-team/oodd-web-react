//PostUploadModal/index.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
	Content,
	ImageContainer,
	StyledInput,
	TagContainer,
	ClothingInfoList,
	ClothingInfoItem,
	HashtagList,
	HashtagItem,
	PinnedPostToggleContainer,
} from './styles';
import { Header, PrevButton } from '../Header';
import { Footer, Button } from '../Footer';
import { StyledText } from '../../../components/Text/StyledText';
import SearchBottomSheet from './SearchBottomSheet/index';
import ToggleSwitch from './ToggleSwitch';
import back from '../assets/back.svg';
import clothingTag from './assets/clothingTag.svg';
import styleTag from './assets/styleTag.svg';
import pin from './assets/pin.svg';
import next from './assets/next.svg';
import next_up from './assets/next_up.svg';
import close from './assets/close.svg';

interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
}

interface Hashtag {
	tag: string;
	color: string;
}

interface ClothingInfo {
	image: string;
	brand: string;
	model: string;
	url: string;
}

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

	const handleOpenSearchSheet = () => {
		setIsSearchSheetOpen((open) => !open);
	};

	const handleOpenStyleTagList = () => {
		setIsHashtagListOpen((prev) => !prev);
	};

	const handleAddClothingInfo = (newClothingInfo: ClothingInfo) => {
		setClothingInfos((clothingInfos) => [...clothingInfos, newClothingInfo]);
	};

	const handleDeleteClothingInfo = (deleteClothingInfo: ClothingInfo) => {
		const deletedClothingInfo = clothingInfos.filter((clothing) => clothing !== deleteClothingInfo);
		setClothingInfos(deletedClothingInfo);
	};

	const handleTagSelect = (tag: Hashtag) => {
		setSelectedHashtag((prevSelected) => (prevSelected?.tag === tag.tag ? null : tag));
		setIsHashtagListOpen(false);
	};

	const handleToggle = () => {
		setIsOOTD(!isOOTD);
	};

	const handleSubmit = async () => {
		const postData = {
			photo_urls: selectedImages,
			caption,
			hashtags: selectedHashtag ? [selectedHashtag.tag] : [],
			clothing_infos: clothingInfos,
		};

		console.log(postData);

		try {
			setIsLoading(true);
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
				<ImageContainer>
					{selectedImages.map((image, index) => (
						<img src={image} alt={`Selected ${index}`} key={index} />
					))}
				</ImageContainer>
				<StyledInput value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="문구를 작성하세요..." />
				<TagContainer className="clothingTag">
					<div onClick={handleOpenSearchSheet}>
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
					<div onClick={handleOpenStyleTagList}>
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
									onClick={() => handleTagSelect(tagObj)}
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
						<ToggleSwitch checked={isOOTD} onChange={handleToggle} />
					</div>
				</PinnedPostToggleContainer>
			</Content>

			<Footer>
				<Button onClick={handleSubmit}>
					<StyledText $textTheme={{ style: 'button1-medium', lineHeight: 2 }}>
						{isLoading ? '업로드 중...' : '공유'}
					</StyledText>
				</Button>
			</Footer>

			{isSearchSheetOpen && (
				<SearchBottomSheet onClose={handleOpenSearchSheet} onSelectClothingInfo={handleAddClothingInfo} />
			)}
		</>
	);
};

export default PostUploadModal;
