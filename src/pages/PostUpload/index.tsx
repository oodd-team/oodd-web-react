//PostUploadModal/index.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import {
	postImagesAtom,
	postContentAtom,
	postClothingInfosAtom,
	postStyletagAtom,
	postIsRepresentativeAtom,
} from '../../recoil/PostUpload/PostUploadAtom';

import {
	UploadContainer,
	Content,
	StyledInput,
	TagContainer,
	ClothingInfoList,
	StyletagList,
	StyletagItem,
	PinnedPostToggleContainer,
} from './styles';

import { OODDFrame } from '../../components/Frame/Frame';
import TopBar from '../../components/TopBar';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomButton from '../../components/BottomButton';
import { StyledText } from '../../components/Text/StyledText';
import ClothingInfoItem from '../../components/ClothingInfoItem';
import ImageSwiper from './ImageSwiper';
import SearchBottomSheetContent from './SearchBottomSheetContent';
import ToggleSwitch from './ToggleSwitch';

import left from '../../assets/arrow/left.svg';
import clothingTag from '../../assets/Upload/clothingTag.svg';
import styleTag from '../../assets/Upload/styleTag.svg';
import pin from '../../assets/Upload/pin.svg';
import right from '../../assets/arrow/right.svg';
import up from '../../assets/arrow/up.svg';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
import request from '../../apis/core';

import { ClothingInfo } from '../../components/ClothingInfoItem/dto';
import { PostUploadModalProps, Styletag, Post } from './dto';
import { CreatePostResponse, UpdatePostResponse, GetPostDetailResponse } from '../../apis/Post/dto';

const PostUpload: React.FC<PostUploadModalProps> = ({ postId = null }) => {
	const [selectedImages, setSelectedImages] = useRecoilState(postImagesAtom);
	const [content, setContent] = useRecoilState(postContentAtom);
	const [clothingInfos, setClothingInfos] = useRecoilState(postClothingInfosAtom);
	const [selectedStyletag, setSelectedStyletag] = useRecoilState(postStyletagAtom);
	const [isRepresentative, setIsRepresentative] = useRecoilState(postIsRepresentativeAtom);
	const [isSearchBottomSheetOpen, setIsSearchBottomSheetOpen] = useState(false);
	const [isStyletagListOpen, setIsStyletagListOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const styletags: Styletag[] = [
		{ tag: 'classic' },
		{ tag: 'street' },
		{ tag: 'hip' },
		{ tag: 'casual' },
		{ tag: 'sporty' },
		{ tag: 'feminine' },
		{ tag: 'minimal' },
		{ tag: 'formal' },
		{ tag: 'outdoor' },
		{ tag: 'luxury' },
	];

	useEffect(() => {
		handleInitialModalState();
	}, []);

	const handleInitialModalState = async () => {
		const state = location.state as { mode?: string; postId?: number };

		if (state?.mode === 'edit' && state?.postId) {
			await fetchPostDetails(state.postId);
		}
	};

	const fetchPostDetails = async (postId: number) => {
		setIsLoading(true);

		try {
			const response = await request.get<GetPostDetailResponse>(`/posts/${postId}`);
			if (response.isSuccess && response.result) {
				const { photoUrls, content, styletags, clothingInfo, isRepresentative } = response.result;

				setSelectedImages(photoUrls);
				setContent(content || '');
				setClothingInfos(clothingInfo ?? []);
				setSelectedStyletag(styletags?.length ? { tag: styletags[0] } : null);
				setIsRepresentative(isRepresentative);

				console.log('Initial Post: ', response.result);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	/*
	const handlePrev = () => {
		navigate(-1);
	};
	*/

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

	const bottomSheetProps: BottomSheetProps = {
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

	const handleToggleIsRepresentative = () => {
		setIsRepresentative(!isRepresentative);
	};

	const uploadImageToFirebase = async (image: string) => {
		// Firebase URL 형식인지 확인
		if (image.startsWith('https://firebasestorage.googleapis.com/')) {
			return image; // 이미 업로드된 경우, URL을 그대로 반환
		}

		// 새로 업로드해야 하는 경우
		const response = await fetch(image);
		const blob = await response.blob();

		const storageRef = ref(storage, `ootd/images/${Date.now()}`);

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
				response = await request.patch<UpdatePostResponse>(`/posts/${postId}`, postData);
			} else {
				// 새 게시물 업로드 (POST)
				response = await request.post<CreatePostResponse>(`/posts`, postData);
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
		<OODDFrame>
			<UploadContainer>
				<TopBar text="OOTD 업로드" LeftButtonSrc={left} />
				<Content>
					<ImageSwiper images={selectedImages} />
					<StyledInput
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="문구를 작성하세요..."
					/>
					<TagContainer className="clothingTag">
						<div onClick={handleToggleSearchSheet}>
							<img src={clothingTag} />
							<StyledText className="label" $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>
								옷 정보 태그
							</StyledText>
							{clothingInfos.length > 0 && (
								<StyledText className="count" $textTheme={{ style: 'headline2-regular', lineHeight: 1 }}>
									{clothingInfos.length}
								</StyledText>
							)}
							<img src={right} />
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
							<StyledText className="label" $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>
								스타일 태그
							</StyledText>
							{isStyletagListOpen ? (
								<img src={up} />
							) : !selectedStyletag ? (
								<>
									<StyledText className="not_selected" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
										미지정
									</StyledText>
									<img src={right} />
								</>
							) : (
								<StyletagItem selected={true}>
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
									>
										<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }}>#{tagObj.tag}</StyledText>
									</StyletagItem>
								))}
							</StyletagList>
						)}
					</TagContainer>
					<PinnedPostToggleContainer>
						<img src={pin} />
						<StyledText $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>대표 OOTD 지정</StyledText>
						<div>
							<ToggleSwitch checked={isRepresentative} onChange={handleToggleIsRepresentative} />
						</div>
					</PinnedPostToggleContainer>
				</Content>

				<BottomButton content={postId ? '수정 완료' : '공유'} onClick={handleSubmit} disabled={isLoading} />

				<BottomSheet {...bottomSheetProps} />
			</UploadContainer>
		</OODDFrame>
	);
};

export default PostUpload;
