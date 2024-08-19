import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import Loading from '../../components/Loading';
import { UploadContainer } from './styles';
import PostUploadModal from './PostUploadModal';
import InstaConnectModal from './InstaConnectModal';
import InstaFeedSelectModal from './InstaFeedSelectModal';
import ImageSelectModal from './ImageSelectModal';
import ImageReviewModal from './ImageReviewModal';
import { Post, ClothingInfo, Styletag, PostResponse } from './dto';
import request from '../../apis/core';

const Upload: React.FC = () => {
	const location = useLocation();
	const [modals, setModals] = useState({
		imageSelect: false,
		imageReview: false,
		instaConnect: false,
		instaFeedSelect: false,
		postUpload: false,
	});
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [content, setContent] = useState<string>('');
	const [clothingInfos, setClothingInfos] = useState<ClothingInfo[]>([]);
	const [selectedStyletag, setSelectedStyletag] = useState<Styletag | null>(null);
	const [instagramPosts, setInstagramPosts] = useState<Post[]>([]);
	const [postId, setPostId] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const accessToken = queryParams.get('access_token');

		if (accessToken) {
			setModals({ ...modals, instaConnect: true });
		} else {
			handleInitialModalState();
		}
	}, [location.search, location.state]);

	const handleInitialModalState = async () => {
		const state = location.state as { mode?: string; postId?: number };

		if (state?.mode === 'image') {
			setModals({ ...modals, imageSelect: true });
		} else if (state?.mode === 'instagram') {
			setModals({ ...modals, instaConnect: true });
		} else if (state?.mode === 'edit' && state?.postId) {
			await fetchPostDetails(state.postId);
			setModals({ ...modals, postUpload: true });
			setPostId(state.postId);
		}
	};

	const fetchPostDetails = async (postId: number) => {
		setIsLoading(true);

		try {
			const response = await request.get<PostResponse>(`/posts/${postId}`);
			if (response.isSuccess && response.result) {
				const { photoUrls, content, styletags, clothingInfo } = response.result;

				setSelectedImages(photoUrls);
				setContent(content || '');
				setClothingInfos(clothingInfo);
				setSelectedStyletag(styletags?.length ? { tag: styletags[0], color: '' } : null);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCloseModals = () => {
		setModals({
			imageSelect: false,
			imageReview: false,
			instaConnect: false,
			instaFeedSelect: false,
			postUpload: false,
		});
		setSelectedImages([]);
		setContent('');
		setClothingInfos([]);
		setSelectedStyletag(null);
		navigate('/mypage');
	};

	const handleSelectImages = (images: string[]) => {
		setSelectedImages((prevImages) => [...prevImages, ...images]);
		setModals({ ...modals, imageSelect: false, imageReview: true });
	};

	const handleAddImages = (images: string[]) => {
		setSelectedImages((prevImages) => [...prevImages, ...images]);
	};

	const handleDeleteImages = (images: string[]) => {
		setSelectedImages([...images]);
	};

	const handleReviewPrev = () => {
		const state = location.state as { mode?: string };

		if (state?.mode === 'image') {
			setModals({ ...modals, imageSelect: true, imageReview: false });
		} else if (state?.mode === 'instagram') {
			setModals({ ...modals, instaFeedSelect: true, imageReview: false });
		} else if (state?.mode === 'edit') {
			setModals({ ...modals, imageReview: false });
			navigate('/mypage');
		}
		setSelectedImages([]);
	};

	const handleOpenInstaFeedSelect = (fetchedPosts: Post[]) => {
		setInstagramPosts(fetchedPosts);
		setModals({ ...modals, instaConnect: false, instaFeedSelect: true });
	};

	const handleOpenImageReview = () => {
		setModals({ ...modals, instaFeedSelect: false, postUpload: false, imageReview: true });
	};

	const handleOpenPostUpload = () => {
		setModals({ ...modals, imageReview: false, postUpload: true });
	};

	return (
		<OODDFrame>
			<UploadContainer>
				{isLoading && <Loading />}

				{modals.imageSelect && (
					<ImageSelectModal selectedImages={selectedImages} onClose={handleCloseModals} onSelect={handleSelectImages} />
				)}
				{modals.imageReview && selectedImages.length > 0 && (
					<ImageReviewModal
						selectedImages={selectedImages}
						onAddImages={handleAddImages}
						onDeleteImages={handleDeleteImages}
						onPrev={handleReviewPrev}
						onNext={handleOpenPostUpload}
					/>
				)}
				{modals.instaConnect && (
					<InstaConnectModal
						onClose={handleCloseModals}
						onNext={handleOpenInstaFeedSelect}
						accessToken={new URLSearchParams(location.search).get('access_token') || ''}
					/>
				)}
				{modals.instaFeedSelect && (
					<InstaFeedSelectModal
						posts={instagramPosts}
						onAddImages={handleAddImages}
						onNext={handleOpenImageReview}
						onClose={handleCloseModals}
					/>
				)}
				{modals.postUpload && selectedImages.length > 0 && (
					<PostUploadModal
						onPrev={handleOpenImageReview}
						selectedImages={selectedImages}
						initialContent={content}
						initialClothingInfos={clothingInfos}
						initialStyletag={selectedStyletag}
						postId={postId}
					/>
				)}
			</UploadContainer>
		</OODDFrame>
	);
};

export default Upload;
