import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
	const [modals, setModals] = useState({
		imageSelect: false,
		imageReview: false,
		instaConnect: false,
		instaFeedSelect: false,
		postUpload: false,
	});
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [instagramPosts, setInstagramPosts] = useState<Post[]>([]);
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

	const handleInitialModalState = () => {
		const state = location.state as { mode?: string };
		if (state?.mode === 'image') {
			setModals({ ...modals, imageSelect: true });
		} else if (state?.mode === 'instagram') {
			setModals({ ...modals, instaConnect: true });
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
		navigate('/profile');
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
					<PostUploadModal onPrev={handleOpenImageReview} selectedImages={selectedImages} />
				)}
			</UploadContainer>
		</OODDFrame>
	);
};

export default Upload;
