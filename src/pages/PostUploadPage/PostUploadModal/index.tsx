//PostUploadModal/index.tsx
import React, { useState } from 'react';
import {
	Content,
	ImageContainer,
	Input,
	TagContainer,
	ClothingInfoList,
	ClothingInfoItem,
	HashtagList,
	HashtagItem,
	PinnedPostToggleContainer,
} from './styles';
import { Header, PrevButton, Text } from '../Header';
import { Footer, Button } from '../Footer';
import ClothingInfoBottomSheet from './ClothingInfoBottomSheet/index';
import ToggleSwitch from './ToggleSwitch';
import { useNavigate } from 'react-router-dom';
import back from '../assets/back.svg';
import clothingTag from './assets/clothingTag.svg';
import styleTag from './assets/styleTag.svg';
import pin from './assets/pin.svg';
import next from './assets/next.svg';
import next_up from './assets/next_up.svg';

interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
}

interface Hashtag {
	tag: string;
	color: string;
}

interface ClothingInfo {
	brand: string;
	model: string;
	url: string;
}

const PostUploadModal: React.FC<PostUploadModalProps> = ({ onPrev, selectedImages }) => {
	const [caption, setCaption] = useState('');
	const [clothingInfos, setClothingInfos] = useState<ClothingInfo[]>([]);
	const [hashtag, setHashtag] = useState<Hashtag | null>(null);
	const [isOOTD, setIsOOTD] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isHashtagListOpen, setIsHashtagListOpen] = useState(false);
	const [isHashtagSelected, setIsHashtagSelected] = useState(false);

	const hashtags = [
		{ tag: '#classic', color: 'rgba(255, 0, 0, 0.15)' },
		{ tag: '#street', color: 'rgba(255, 100, 0, 0.15)' },
		{ tag: '#hip', color: 'rgba(255, 255, 0, 0.15)' },
		{ tag: '#vintage', color: 'rgba(0, 255, 0, 0.15)' },
	];

	const navigate = useNavigate();

	const handleOpenSheet = () => {
		setIsSheetOpen(true);
	};

	const handleCloseSheet = () => {
		setIsSheetOpen(false);
	};

	const handleOpenStyleTagList = () => {
		setIsHashtagListOpen((prev) => !prev);
	};

	const handleToggle = () => {
		setIsOOTD(!isOOTD);
	};

	const handleTagSelect = (tag: Hashtag) => {
		setHashtag(tag);
		setIsHashtagSelected(true);
		setIsHashtagListOpen(false);
	};

	const handleSubmit = () => {
		const photo_url_list = selectedImages;
		const caption_text = caption;
		const hashtag_list = hashtag ? [hashtag.tag] : [];
		const clothing_info_list = clothingInfos;

		const postData = {
			photo_urls: photo_url_list,
			caption: caption_text,
			hashtags: hashtag_list,
			clothing_infos: clothing_info_list,
		};

		console.log(postData);
		navigate('/profile');
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
						<img src={image} alt={`Selected ${index}`} key={index} />
					))}
				</ImageContainer>
				<Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="문구를 작성하세요..." />
				<TagContainer className="clothingTag">
					<div onClick={handleOpenSheet}>
						<img src={clothingTag} />
						<label>옷 정보 태그</label>
						<img src={next} />
					</div>
					{clothingInfos.length > 0 && (
						<ClothingInfoList>
							{clothingInfos.map((clothingObj, index) => (
								<ClothingInfoItem key={index}>{clothingObj.brand}</ClothingInfoItem>
							))}
						</ClothingInfoList>
					)}
				</TagContainer>
				<TagContainer>
					<div onClick={handleOpenStyleTagList}>
						<img src={styleTag} />
						<label>스타일 태그</label>
						{isHashtagListOpen ? (
							<img src={next_up} />
						) : !isHashtagSelected ? (
							<img src={next} />
						) : (
							<HashtagItem color={hashtag?.color}>{hashtag?.tag}</HashtagItem>
						)}
					</div>
					{isHashtagListOpen && (
						<HashtagList>
							{hashtags.map((tagObj, index) => (
								<HashtagItem key={index} onClick={() => handleTagSelect(tagObj)} color={tagObj.color}>
									{tagObj.tag}
								</HashtagItem>
							))}
						</HashtagList>
					)}
				</TagContainer>
				<PinnedPostToggleContainer>
					<img src={pin} />
					<label>대표 OOTD 지정</label>
					<div>
						<ToggleSwitch checked={isOOTD} onChange={handleToggle} />
					</div>
				</PinnedPostToggleContainer>
			</Content>
			<Footer>
				<Button onClick={handleSubmit}>공유</Button>
			</Footer>
			{isSheetOpen && <ClothingInfoBottomSheet onClose={handleCloseSheet} />}
		</>
	);
};

export default PostUploadModal;
