//PostUploadModal/index.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRecoilState } from 'recoil';

import { getPostDetailApi, createPostApi, modifyPostApi } from '@apis/post';
import { PostBase } from '@apis/post/dto';
import { handleError } from '@apis/util/handleError';
import { storage } from '@config/firebaseConfig';
import {
	postImagesAtom,
	postContentAtom,
	postClothingInfosAtom,
	postStyletagAtom,
	postIsRepresentativeAtom,
	modeAtom,
} from '@recoil/PostUpload/PostUploadAtom';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import Left from '@assets/arrow/left.svg';
import Right from '@assets/arrow/right.svg';
import Up from '@assets/arrow/up.svg';
import ClothingTag from '@assets/default/clothes-tag.svg';
import Pin from '@assets/default/pin.svg';
import StyleTag from '@assets/default/style-tag.svg';

import BottomButton from '@components/BottomButton';
import BottomSheet from '@components/BottomSheet';
import ClothingInfoItem from '@components/ClothingInfoItem';
import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal';
import { StyledText } from '@components/Text/StyledText';
import TopBar from '@components/TopBar';

import type { BottomSheetProps } from '@components/BottomSheet/dto';
import type { ClothingInfo } from '@components/ClothingInfoItem/dto';
import type { ModalProps } from '@components/Modal/dto';

import type { PostUploadModalProps } from './dto';

import ImageSwiper from './ImageSwiper/index';
import SearchBottomSheetContent from './SearchBottomSheetContent/index';

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
import ToggleSwitch from './ToggleSwitch';

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
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');
	const location = useLocation();
	const navigate = useNavigate();
	const userId = getCurrentUserId();

	const styletags = [
		'classic',
		'street',
		'hip',
		'casual',
		'sporty',
		'feminine',
		'minimal',
		'formal',
		'outdoor',
		'luxury',
	];

	const handlePrev = () => {
		const state = location.state as { mode?: string; postId?: number };
		if (mode === 'edit') {
			setMode('edit2');
		}
		navigate('/post/upload/photo/select', { state: { mode: mode, postId: state.postId } });
	};

	const handleSearchSheetToggle = () => {
		setIsSearchBottomSheetOpen((open) => !open);
	};

	const handleStyleTagListToggle = () => {
		setIsStyletagListOpen((open) => !open);
	};

	const handleIsRepresentativeToggle = () => {
		setIsRepresentative((isRepresentative) => !isRepresentative);
	};

	const handleClothingInfoAdd = (newClothingInfo: ClothingInfo) => {
		setClothingInfos((clothingInfos) => {
			// 중복 확인 (새로운 의류 정보가 이미 존재하지 않을 경우 추가)
			const isDuplicate = clothingInfos.some(
				(info) => info.modelName === newClothingInfo.modelName && info.brandName === newClothingInfo.brandName,
			);
			if (!isDuplicate) {
				return [...clothingInfos, newClothingInfo];
			} else {
				return clothingInfos; // 중복이면 기존 리스트 그대로 반환
			}
		});
	};

	const handleClothingInfoDelete = (deleteClothingInfo: ClothingInfo) => {
		const deletedClothingInfo = clothingInfos.filter((clothing) => clothing !== deleteClothingInfo);
		setClothingInfos(deletedClothingInfo);
	};

	const handleStyletagSelect = (tag: string) => {
		setSelectedStyletag((prev) => {
			// 선택된 태그가 이미 존재하면 제거
			if (prev.includes(tag)) {
				return prev.filter((t) => t !== tag);
			}
			// 선택된 태그 추가
			return [...prev, tag];
		});
		setIsStyletagListOpen(false);
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
		//Firebase URL 형식인지 확인
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
		if (selectedStyletag.length === 0) {
			setModalContent('*스타일 태그를 지정해주세요*');
			setIsStatusModalOpen(true);
			return;
		}

		setIsLoading(true);

		try {
			// 업로드된 이미지 URL과 함께 orderNum을 추가
			const uploadedImages = await Promise.all(
				selectedImages.map(async (image, index) => {
					const imageUrl = await uploadImageToFirebase(image.url);
					return { url: imageUrl, orderNum: index + 1 }; // orderNum 추가
				}),
			);

			const postData: PostBase = {
				postImages: uploadedImages,
				content,
				postStyletags: selectedStyletag || [],
				postClothings: clothingInfos,
				isRepresentative: isRepresentative,
			};

			let response;
			if (mode === 'edit' || mode === 'edit2') {
				// 게시물 수정 (PATCH)
				const state = location.state as { mode: string; postId: number };
				response = await modifyPostApi(state.postId, postData);
			} else {
				// 새 게시물 업로드 (POST)
				response = await createPostApi(postData);
			}
			console.log(response);

			//초기화
			setSelectedImages([]);
			setClothingInfos([]);
			setContent('');
			setIsRepresentative(false);
			setSelectedStyletag([]);
			setMode('');

			navigate(`/profile/${userId}`);
		} catch (error) {
			const errorMessage = handleError(error, 'post');
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const getPost = async (postId: number) => {
		setIsLoading(true);

		try {
			const response = await getPostDetailApi(postId);

			const { postImages, content, postStyletags, postClothings, isRepresentative } = response.data;

			setSelectedImages(postImages);
			setContent(content);
			setClothingInfos(postClothings ?? []);
			setSelectedStyletag(postStyletags);
			setIsRepresentative(isRepresentative);
		} catch (error) {
			const errorMessage = handleError(error, 'post');
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	// 게시물 업로드인지 수정인지 모드 확인
	useEffect(() => {
		const handleMode = async () => {
			const state = location.state as { mode?: string; postId?: number };
			if (state?.mode) {
				setMode(state.mode); // 모드 상태를 설정
			}
			if (state.mode === 'edit' && state?.postId && selectedImages.length === 0) {
				await getPost(state.postId);
			}
		};

		handleMode();
	}, []);

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isSearchBottomSheetOpen,
		isHandlerVisible: false,
		Component: SearchBottomSheetContent,
		onCloseBottomSheet: () => {
			setIsSearchBottomSheetOpen(false);
		},
		componentProps: {
			onClose: () => setIsSearchBottomSheetOpen(false),
			onSelectClothingInfo: handleClothingInfoAdd,
		},
	};

	// api 처리 상태 모달 (성공/실패)
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<OODDFrame>
			<UploadContainer>
				<TopBar text="OOTD 업로드" LeftButtonSrc={Left} onClickLeftButton={handlePrev} />
				<Content>
					<ImageSwiper images={selectedImages} />
					<StyledInput
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="문구를 작성하세요..."
					/>
					<TagContainer className="clothingTag">
						<div onClick={handleSearchSheetToggle}>
							<img src={ClothingTag} />
							<StyledText className="label" $textTheme={{ style: 'headline2-bold' }}>
								옷 정보 태그
							</StyledText>
							{clothingInfos.length > 0 && (
								<StyledText className="count" $textTheme={{ style: 'headline2-regular' }}>
									{clothingInfos.length}
								</StyledText>
							)}
							<img src={Right} />
						</div>
						{clothingInfos.length > 0 && (
							<ClothingInfoList>
								{clothingInfos.map((clothingObj, index) => (
									<ClothingInfoItem key={index} clothingObj={clothingObj} onDelete={handleClothingInfoDelete} />
								))}
							</ClothingInfoList>
						)}
					</TagContainer>
					<TagContainer>
						<div onClick={handleStyleTagListToggle}>
							<img src={StyleTag} />
							<StyledText className="label" $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>
								스타일 태그
							</StyledText>
							{isStyletagListOpen ? (
								<img src={Up} />
							) : selectedStyletag.length === 0 ? (
								<>
									<StyledText className="not_selected" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
										미지정
									</StyledText>
									<img src={Right} />
								</>
							) : (
								<StyletagItem selected={false}>
									<StyledText className="tag" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
										#{selectedStyletag[0]}
									</StyledText>
								</StyletagItem>
							)}
						</div>
						{isStyletagListOpen && (
							<StyletagList>
								{styletags.map((tag) => (
									<StyletagItem
										key={tag}
										onClick={() => handleStyletagSelect(tag)}
										selected={selectedStyletag[0] === tag}
									>
										<StyledText className="tag" $textTheme={{ style: 'body2-light', lineHeight: 1 }}>
											#{tag}
										</StyledText>
									</StyletagItem>
								))}
							</StyletagList>
						)}
					</TagContainer>
					<PinnedPostToggleContainer>
						<img src={Pin} />
						<StyledText $textTheme={{ style: 'headline2-bold', lineHeight: 1 }}>대표 OOTD 지정</StyledText>
						<div>
							<ToggleSwitch checked={isRepresentative} onChange={handleIsRepresentativeToggle} />
						</div>
					</PinnedPostToggleContainer>
				</Content>

				<BottomButton
					content={mode === 'edit' || mode === 'edit2' ? '수정 완료' : '공유'}
					onClick={handleSubmit}
					disabled={isLoading}
				/>

				<BottomSheet {...bottomSheetProps} />
			</UploadContainer>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</OODDFrame>
	);
};

export default PostUpload;
