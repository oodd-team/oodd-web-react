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
	modeAtom,
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
import { StyledText } from '../../components/Text/StyledText';
import TopBar from '../../components/TopBar';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomButton from '../../components/BottomButton';
import ClothingInfoItem from '../../components/ClothingInfoItem';
import ImageSwiper from './ImageSwiper';
import SearchBottomSheetContent from './SearchBottomSheetContent';
import ToggleSwitch from './ToggleSwitch';

import Left from '../../assets/arrow/left.svg';
import Right from '../../assets/arrow/right.svg';
import Up from '../../assets/arrow/up.svg';
import ClothingTag from '../../assets/default/clothes-tag.svg';
import StyleTag from '../../assets/default/style-tag.svg';
import Pin from '../../assets/default/pin.svg';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebaseConfig';
import request from '../../apis/core';

import { ClothingInfo } from '../../components/ClothingInfoItem/dto';
import { PostUploadModalProps, Styletag, Post } from './dto';
import { CreatePostResponse, UpdatePostResponse, GetPostDetailResponse } from '../../apis/Post/dto';

const PostUpload: React.FC<PostUploadModalProps> = () => {
	const [selectedImages, setSelectedImages] = useRecoilState(postImagesAtom);
	const [content, setContent] = useRecoilState(postContentAtom);
	const [clothingInfos, setClothingInfos] = useRecoilState(postClothingInfosAtom);
	const [selectedStyletag, setSelectedStyletag] = useRecoilState(postStyletagAtom);
	const [isRepresentative, setIsRepresentative] = useRecoilState(postIsRepresentativeAtom);
	const [mode, setMode] = useRecoilState(modeAtom);
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
		const state = location.state as { mode?: string; postId?: number };
		if (state?.mode) {
			setMode(state.mode); // 모드 상태를 설정
		}
		handleInitialModalState();
	}, []);

	const handleInitialModalState = async () => {
		const state = location.state as { mode?: string; postId?: number };

		if (state.mode === 'edit' && state?.postId) {
			await fetchPostDetails(state.postId);
		}
	};

	const handlePrev = () => {
		const state = location.state as { mode?: string; postId?: number };
		if (mode === 'edit') {
			setMode('edit2');
		}
		navigate('/image-select', { state: { mode: mode, postId: state.postId } });
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

	const cropImage = (imageUrl: string): Promise<Blob> => {
		return new Promise((resolve) => {
			const img = new Image();
			img.src = imageUrl;
			img.onload = () => {
				const aspectRatio = 4 / 5;
				let width = img.width;
				let height = img.height;
				let startX = 0;
				let startY = 0;

				// 이미지의 비율이 원하는 비율과 다른 경우, 자르기
				if (width / height > aspectRatio) {
					// 이미지가 더 넓은 경우, 좌우를 잘라냄
					width = height * aspectRatio;
					startX = (img.width - width) / 2; // 좌우 균등하게 자름
				} else {
					// 이미지가 더 높은 경우, 상하를 잘라냄
					height = width / aspectRatio;
					startY = (img.height - height) / 2; // 상하 균등하게 자름
				}

				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext('2d');
				if (ctx) {
					ctx.drawImage(img, startX, startY, width, height, 0, 0, width, height);
				}

				// Blob으로 변환
				canvas.toBlob((blob) => {
					if (blob) resolve(blob);
				}, 'image/jpeg');
			};
		});
	};

	const uploadImageToFirebase = async (imageUrl: string) => {
		// Firebase URL 형식인지 확인
		if (imageUrl.startsWith('https://firebasestorage.googleapis.com/')) {
			return imageUrl; // 이미 업로드된 경우, URL을 그대로 반환
		}

		// 새로 업로드해야 하는 경우
		const croppedBlob = await cropImage(imageUrl);

		const storageRef = ref(storage, `ootd/images/${Date.now()}`);
		await uploadBytes(storageRef, croppedBlob)
			.then(() => {
				console.log('success');
			})
			.catch((error) => {
				console.log(JSON.stringify(error));
			});

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
			if (mode === ('edit' || 'edit2')) {
				// 게시물 수정 (PATCH)
				const state = location.state as { mode?: string; postId?: number };
				response = await request.patch<UpdatePostResponse>(`/posts/${state.postId}`, postData);
			} else {
				// 새 게시물 업로드 (POST)
				response = await request.post<CreatePostResponse>(`/posts`, postData);
			}

			if (!response.isSuccess) {
				throw new Error(response.message || 'Failed');
			}

			//초기화
			setSelectedImages([]);
			setClothingInfos([]);
			setContent('');
			setIsRepresentative(false);
			setSelectedStyletag(null);
			setMode('');

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
				<TopBar text="OOTD 업로드" LeftButtonSrc={Left} onLeftClick={handlePrev} />
				<Content>
					<ImageSwiper images={selectedImages} />
					<StyledInput
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="문구를 작성하세요..."
					/>
					<TagContainer className="clothingTag">
						<div onClick={handleToggleSearchSheet}>
							<img src={ClothingTag} />
							<StyledText className="label" $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>
								옷 정보 태그
							</StyledText>
							{clothingInfos.length > 0 && (
								<StyledText className="count" $textTheme={{ style: 'headline2-regular', lineHeight: 1 }}>
									{clothingInfos.length}
								</StyledText>
							)}
							<img src={Right} />
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
							<img src={StyleTag} />
							<StyledText className="label" $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>
								스타일 태그
							</StyledText>
							{isStyletagListOpen ? (
								<img src={Up} />
							) : !selectedStyletag ? (
								<>
									<StyledText className="not_selected" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
										미지정
									</StyledText>
									<img src={Right} />
								</>
							) : (
								<StyletagItem selected={false}>
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
						<img src={Pin} />
						<StyledText $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>대표 OOTD 지정</StyledText>
						<div>
							<ToggleSwitch checked={isRepresentative} onChange={handleToggleIsRepresentative} />
						</div>
					</PinnedPostToggleContainer>
				</Content>

				<BottomButton
					content={mode === ('edit' || 'edit2') ? '수정 완료' : '공유'}
					onClick={handleSubmit}
					disabled={isLoading}
				/>

				<BottomSheet {...bottomSheetProps} />
			</UploadContainer>
		</OODDFrame>
	);
};

export default PostUpload;
