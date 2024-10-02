//PostUploadModal/index.tsx
import React, { useState, useEffect } from 'react';
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
import TopBar from '../../../components/TopBar';
import BottomSheet from '../../../components/BottomSheet';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import BottomButton from '../../../components/BottomButton';
import { StyledText } from '../../../components/Text/StyledText';
import ImageSwiper from './ImageSwiper';
import ClothingInfoItem from './ClothingInfoItem';
import SearchBottomSheetContent from './SearchBottomSheetContent';
import ToggleSwitch from './ToggleSwitch';
import back from '../../../assets/Upload/back.svg';
import clothingTag from '../../../assets/Upload/clothingTag.svg';
import styleTag from '../../../assets/Upload/styleTag.svg';
import pin from '../../../assets/Upload/pin.svg';
import next from '../../../assets/Upload/next.svg';
import next_up from '../../../assets/Upload/next_up.svg';
import { PostUploadModalProps, ClothingInfo } from '../dto';
import { Styletag, Post, SearchBottomSheetProps } from './dto';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import request, { BaseResponse } from '../../../apis/core';

const PostUploadModal: React.FC<PostUploadModalProps> = ({
	onPrev,
	selectedImages,
	initialContent = '',
	initialClothingInfos = [],
	initialStyletag = null,
	initialRepresentative = false,
	postId = null,
}) => {
	const [content, setContent] = useState<string>(initialContent);
	const [clothingInfos, setClothingInfos] = useState<ClothingInfo[]>(initialClothingInfos);
	const [selectedStyletag, setSelectedStyletag] = useState<Styletag | null>(initialStyletag);
	const [isRepresentative, setIsRepresentative] = useState(initialRepresentative);
	const [isSearchBottomSheetOpen, setIsSearchBottomSheetOpen] = useState(false);
	const [isStyletagListOpen, setIsStyletagListOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const styletags: Styletag[] = [
		{ tag: 'classic', color: 'rgba(255, 0, 0, 0.15)' }, // 레드
		{ tag: 'street', color: 'rgba(255, 100, 0, 0.15)' }, // 오렌지
		{ tag: 'hip', color: 'rgba(255, 255, 0, 0.15)' }, // 옐로우
		{ tag: 'casual', color: 'rgba(0, 255, 0, 0.15)' }, // 그린
		{ tag: 'sporty', color: 'rgba(30, 144, 255, 0.15)' }, // 블루
		{ tag: 'feminine', color: 'rgba(255, 20, 147, 0.15)' }, // 핑크
		{ tag: 'minimal', color: 'rgba(128, 128, 128, 0.15)' }, // 그레이
		{ tag: 'formal', color: 'rgba(148, 0, 211, 0.15)' }, // 바이올렛
		{ tag: 'outdoor', color: 'rgba(34, 139, 34, 0.15)' }, // 그린
		{ tag: 'luxury', color: 'rgba(255, 215, 0, 0.15)' }, // 골드
	];

	// intialStyletag에 color 추가
	useEffect(() => {
		if (selectedStyletag && !selectedStyletag.color) {
			const foundTag = styletags.find((tag) => tag.tag === selectedStyletag.tag);
			if (foundTag) {
				setSelectedStyletag({ ...selectedStyletag, color: foundTag.color });
			}
		}
	}, [selectedStyletag]);

	const handleToggleSearchSheet = () => {
		setIsSearchBottomSheetOpen((open) => !open);
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

	const bottomSheetProps: BottomSheetProps<SearchBottomSheetProps> = {
		isOpenBottomSheet: isSearchBottomSheetOpen,
		isHandlerVisible: false,
		Component: SearchBottomSheetContent,
		onCloseBottomSheet: () => {
			setIsSearchBottomSheetOpen(false);
		},
		componentProps: {
			onClose: () => setIsSearchBottomSheetOpen(false),
			onSelectClothingInfo: handleAddClothingInfo,
		},
	};

	const handleSelectStyletag = (tag: Styletag) => {
		setSelectedStyletag((prevSelected) => (prevSelected?.tag === tag.tag ? null : tag));
		setIsStyletagListOpen(false);
	};

	const handleToggleOOTD = () => {
		setIsRepresentative(!isRepresentative);
	};

	const uploadImageToFirebase = async (image: string) => {
		// Firebase URL 형식인지 확인
		if (image.startsWith('https://firebasestorage.googleapis.com/')) {
			return image; // 이미 업로드된 경우, URL을 그대로 반환
		}
		console.log(1);
		// 새로 업로드해야 하는 경우
		const response = await fetch(image);
		const blob = await response.blob();
		console.log(2);
		const storageRef = ref(storage, `ootd/images/${Date.now()}`);
		console.log(3);
		await uploadBytes(storageRef, blob)
			.then(() => {
				console.log('success');
			})
			.catch((error) => {
				console.log(JSON.stringify(error));
			});
		console.log(4);
		return getDownloadURL(storageRef);
	};

	const handleSubmit = async () => {
		if (!selectedStyletag) {
			alert('스타일 태그를 지정해주세요.');
			return;
		}

		setIsLoading(true);

		try {
			const uploadedImages = await Promise.all(selectedImages.map(uploadImageToFirebase));

			const postData: Post = {
				photoUrls: uploadedImages,
				content,
				styletags: selectedStyletag ? [selectedStyletag.tag] : [],
				clothingInfo: clothingInfos,
				isRepresentive: isRepresentative,
			};

			let response;
			if (postId) {
				// 게시물 수정 (PATCH)
				response = await request.patch<BaseResponse>(`/posts/${postId}`, postData);
			} else {
				// 새 게시물 업로드 (POST)
				response = await request.post<BaseResponse>(`/posts`, postData);
			}

			if (!response.isSuccess) {
				throw new Error(response.message || 'Failed');
			}

			navigate('/mypage');
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<TopBar text="OOTD 업로드" LeftButtonSrc={back} onLeftClick={onPrev} />
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
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>#{selectedStyletag?.tag}</StyledText>
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
									<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>#{tagObj.tag}</StyledText>
								</StyletagItem>
							))}
						</StyletagList>
					)}
				</TagContainer>
				<PinnedPostToggleContainer>
					<img src={pin} />
					<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>대표 OOTD 지정</StyledText>
					<div>
						<ToggleSwitch checked={isRepresentative} onChange={handleToggleOOTD} />
					</div>
				</PinnedPostToggleContainer>
			</Content>

			<BottomButton content={postId ? '수정 완료' : '공유'} onClick={handleSubmit} disabled={isLoading} />

			<BottomSheet {...bottomSheetProps} />
		</>
	);
};

export default PostUploadModal;
