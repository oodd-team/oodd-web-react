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
	StyleTagList,
	StyleTagItem,
	ToggleSwitchWrapper,
} from './styles';
import { Header, PrevButton, Text } from '../Header/styles';
import { Footer, Button } from '../Footer/styles';
import OutfitLinkBottomSheet from '../OutfitLinkBottomSheet';
import ToggleSwitch from '../ToggleSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
}

interface StyleTag {
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
	const [clothingInfo, setClothingInfo] = useState<ClothingInfo[]>([]);
	const [hashtag, setHashtag] = useState<StyleTag | null>(null);
	const [isOOTD, setIsOOTD] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isStyleTagListOpen, setIsStyleTagListOpen] = useState(false);
	const [isStyleTagSelected, setIsStyleTagSelected] = useState(false);

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
		setIsStyleTagListOpen((prev) => !prev);
	};

	const handleToggle = () => {
		setIsOOTD(!isOOTD);
	};

	const handleTagSelect = (tag: StyleTag) => {
		setHashtag(tag);
		setIsStyleTagSelected(true);
		setIsStyleTagListOpen(false);
	};

	const handleSubmit = () => {
		const photo_urls = selectedImages;
		const caption_text = caption;
		const hashtag_list = hashtag ? [hashtag.tag] : [];
		const clothing_info_list = clothingInfo;

		const postData = {
			photo_urls,
			caption: caption_text,
			hashtags: hashtag_list,
			clothing_info: clothing_info_list,
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
						{clothingInfo.length > 0 && (
							<OutfitTagList>
								{clothingInfo.map((clothingObj, index) => (
									<OutfitTagItem key={index}>{clothingObj.brand}</OutfitTagItem>
								))}
							</OutfitTagList>
						)}
					</TagSection>
					<TagSection>
						<div onClick={handleOpenStyleTagList}>
							<label>스타일 태그</label>
							{isStyleTagListOpen ? (
								<button>
									<FontAwesomeIcon icon={faChevronUp} />
								</button>
							) : !isStyleTagSelected ? (
								<button>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							) : (
								<StyleTagItem color={hashtag?.color}>{hashtag?.tag}</StyleTagItem>
							)}
						</div>
						{isStyleTagListOpen && (
							<StyleTagList>
								{hashtags.map((tagObj, index) => (
									<StyleTagItem key={index} onClick={() => handleTagSelect(tagObj)} color={tagObj.color}>
										{tagObj.tag}
									</StyleTagItem>
								))}
							</StyleTagList>
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
			{isSheetOpen && <OutfitLinkBottomSheet onClose={handleCloseSheet} />}
		</ModalContainer>
	);
};

export default PostUploadModal;
