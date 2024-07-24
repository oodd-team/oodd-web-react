//PostUploadModal/index.tsx
import React, { useState } from 'react';
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
	const [selectedHashtag, setSelectedHashtag] = useState<Hashtag | null>(null);
	const [isOOTD, setIsOOTD] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [isHashtagListOpen, setIsHashtagListOpen] = useState(false);

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

	const handleClothingInfoSelect = (clothings: ClothingInfo[]) => {
		setClothingInfos(clothings);
	};

	const handleTagSelect = (tag: Hashtag) => {
		setSelectedHashtag((prevSelected) => (prevSelected?.tag === tag.tag ? null : tag));
		setIsHashtagListOpen(false);
	};

	const handleToggle = () => {
		setIsOOTD(!isOOTD);
	};

	const handleSubmit = () => {
		const photo_url_list = selectedImages;
		const caption_text = caption;
		const hashtag_list = selectedHashtag ? [selectedHashtag.tag] : [];
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
					<div onClick={handleOpenSheet}>
						<img src={clothingTag} />
						<StyledText className="label" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
							옷 정보 태그
						</StyledText>
						{clothingInfos.length > 0 && (
							<StyledText className="count" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
								{clothingInfos.length}
							</StyledText>
						)}
						<img className="next" src={next} />
					</div>
					{clothingInfos.length > 0 && (
						<ClothingInfoList>
							{clothingInfos.map((clothingObj, index) => (
								<ClothingInfoItem key={index}>
									<img />
									<div className="infoContainer">
										<StyledText className="brand" $textTheme={{ style: 'body2-regular', lineHeight: 1 }}>
											{clothingObj.brand}
										</StyledText>
										<StyledText className="detail" $textTheme={{ style: 'body6-light', lineHeight: 1 }}>
											{clothingObj.model}/
										</StyledText>
									</div>
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
							<img className="next" src={next_up} />
						) : !selectedHashtag ? (
							<>
								<StyledText className="not_selected" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
									미지정
								</StyledText>
								<img className="next" src={next} />
							</>
						) : (
							<HashtagItem selected={false} color={selectedHashtag?.color}>
								<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 1 }}>{selectedHashtag?.tag}</StyledText>
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
									{tagObj.tag}
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
					<StyledText $textTheme={{ style: 'button1-medium', lineHeight: 2 }}>공유</StyledText>
				</Button>
			</Footer>
			{isSheetOpen && (
				<ClothingInfoBottomSheet
					onClose={handleCloseSheet}
					clothingInfos={clothingInfos}
					onSelectClothingInfos={handleClothingInfoSelect}
				/>
			)}
		</>
	);
};

export default PostUploadModal;
