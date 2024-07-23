import React, { useState } from 'react';
import {
	ModalContainer,
	Content,
	ImageContainer,
	TagContainer,
	TagSection,
	ToggleLabel,
	Input,
	OutfitTagList,
	OutfitTagItem,
	HashtagList,
	HashtagItem,
	ToggleSwitchWrapper,
} from './styles';
import { Header, PrevButton, Text } from '../Header';
import { Footer, Button } from '../Footer';
import ClothingInfoBottomSheet from './ClothingInfoBottomSheet/index';
import ToggleSwitch from './ToggleSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
		const photo_urls = selectedImages;
		const caption_text = caption;
		const hashtag_list = hashtag ? [hashtag.tag] : [];
		const clothing_info_list = clothingInfos;

		const postData = {
			photo_urls,
			caption: caption_text,
			hashtag: hashtag_list,
			clothing_infos: clothing_info_list,
		};

		console.log(postData);
		navigate('/profile');
	};

	return (
		<ModalContainer>
			<Header>
				<PrevButton onClick={onPrev}>
					<FontAwesomeIcon icon={faChevronLeft} />
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
				<TagContainer>
					<TagSection>
						<div onClick={handleOpenSheet}>
							<label>옷 정보 태그</label>
							<button>
								<FontAwesomeIcon icon={faChevronRight} />
							</button>
						</div>
						{clothingInfos.length > 0 && (
							<OutfitTagList>
								{clothingInfos.map((clothingObj, index) => (
									<OutfitTagItem key={index}>{clothingObj.brand}</OutfitTagItem>
								))}
							</OutfitTagList>
						)}
					</TagSection>
					<TagSection>
						<div onClick={handleOpenStyleTagList}>
							<label>스타일 태그</label>
							{isHashtagListOpen ? (
								<button>
									<FontAwesomeIcon icon={faChevronUp} />
								</button>
							) : !isHashtagSelected ? (
								<button>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
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
					</TagSection>
				</TagContainer>
				<ToggleLabel>
					<label>대표 OOTD 지정</label>
					<ToggleSwitchWrapper>
						<ToggleSwitch checked={isOOTD} onChange={handleToggle} />
					</ToggleSwitchWrapper>
				</ToggleLabel>
			</Content>
			<Footer>
				<Button onClick={handleSubmit}>공유</Button>
			</Footer>
			{isSheetOpen && <ClothingInfoBottomSheet onClose={handleCloseSheet} />}
		</ModalContainer>
	);
};

export default PostUploadModal;
