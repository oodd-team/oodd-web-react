import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { OODDFrame } from '../../components/Frame/Frame';
import { UploadContainer } from './styles';
import PostUploadModal from './PostUploadModal';
import InstaConnectModal from './InstaConnectModal';
import InstaFeedSelectModal from './InstaFeedSelectModal';
import ImageSelectModal from './ImageSelectModal';
import ImageReviewModal from './ImageReviewModal';
import { Post } from './dto';

const Upload: React.FC = () => {
	const location = useLocation();
	const [isImageSelectModalOpen, setIsImageSelectModalOpen] = useState(false);
	const [isImageReviewModalOpen, setIsImageReviewModalOpen] = useState(false);
	const [isInstaConnectModalOpen, setIsInstaConnectModalOpen] = useState(false);
	const [isInstaFeedSelectModalOpen, setIsInstaFeedSelectModalOpen] = useState(false);
	const [isPostUploadModalOpen, setIsPostUploadModalOpen] = useState(false);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [instagramPosts, setInstagramPosts] = useState<Post[]>([]);

	const navigate = useNavigate();

	/*
	useEffect(() => {
		const state = location.state as { mode?: string };
		if (state?.mode === 'image') {
			setIsImageSelectModalOpen(true);
		} else if (state?.mode === 'instagram') {
			setIsInstaConnectModalOpen(true);
		}
	}, [location.state]);
	*/

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const accessToken = queryParams.get('access_token');

		if (accessToken) {
			fetchInstagramData(accessToken);
		} else {
			const state = location.state as { mode?: string };
			if (state?.mode === 'image') {
				setIsImageSelectModalOpen(true);
			} else if (state?.mode === 'instagram') {
				setIsInstaConnectModalOpen(true);
			}
		}
	}, [location.search, location.state]);

	const fetchInstagramData = async (accessToken: string) => {
		try {
			const response = await axios.get(`https://localhost:3001/instagram-import`, {
				params: {
					access_token: accessToken,
				},
			});
			const fetchedPosts = response.data as Post[];
			handleOpenInstaFeedSelect(fetchedPosts);
		} catch (error) {
			console.error('Failed to fetch Instagram media:', error);
		}
	};

	const handleCloseModals = () => {
		setSelectedImages([]);
		navigate('/profile');
	};

	const handleSelectImages = (images: string[]) => {
		handleAddImages(images);
		setIsImageSelectModalOpen(false);
		setIsImageReviewModalOpen(true);
	};

	const handleAddImages = (images: string[]) => {
		setSelectedImages((prevImages) => [...prevImages, ...images]);
	};

	const handleDeleteImages = (images: string[]) => {
		setSelectedImages([...images]);
	};

	const handleReviewPrev = () => {
		const state = location.state as { mode?: string };
		setIsImageReviewModalOpen(false);

		if (state?.mode === 'image') {
			setIsImageSelectModalOpen(true);
		} else if (state?.mode === 'instagram') {
			setIsInstaFeedSelectModalOpen(true);
		}
		setSelectedImages([]);
	};

	const handleOpenInstaFeedSelect = (fetchedPosts: Post[]) => {
		setInstagramPosts(fetchedPosts);
		setIsInstaConnectModalOpen(false);
		setIsImageReviewModalOpen(false);
		setIsInstaFeedSelectModalOpen(true);
	};

	const handleOpenImageReview = () => {
		setIsInstaFeedSelectModalOpen(false);
		setIsPostUploadModalOpen(false);
		setIsImageReviewModalOpen(true);
	};

	const handleOpenPostUpload = () => {
		setIsImageReviewModalOpen(false);
		setIsPostUploadModalOpen(true);
	};

	return (
		<OODDFrame>
			<UploadContainer>
				{isImageSelectModalOpen && (
					<ImageSelectModal selectedImages={selectedImages} onClose={handleCloseModals} onSelect={handleSelectImages} />
				)}
				{isImageReviewModalOpen && selectedImages.length > 0 && (
					<ImageReviewModal
						selectedImages={selectedImages}
						onAddImages={handleAddImages}
						onDeleteImages={handleDeleteImages}
						onPrev={handleReviewPrev}
						onNext={handleOpenPostUpload}
					/>
				)}
				{isInstaConnectModalOpen && <InstaConnectModal onClose={handleCloseModals} />}
				{isInstaFeedSelectModalOpen && (
					<InstaFeedSelectModal
						posts={instagramPosts}
						onAddImages={handleAddImages}
						onNext={handleOpenImageReview}
						onClose={handleCloseModals}
					/>
				)}
				{isPostUploadModalOpen && selectedImages.length > 0 && (
					<PostUploadModal onPrev={handleOpenImageReview} selectedImages={selectedImages} />
				)}
			</UploadContainer>
		</OODDFrame>
	);
};

export default Upload;
