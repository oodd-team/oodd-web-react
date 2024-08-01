import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import PostUploadModal from './PostUploadModal';
import ImageSelectModal from './ImageSelectModal';
import InstaConnectModal from './InstaConnectModal';
import InstaFeedSelectModal from './InstaFeedSelectModal';
import ImageReviewModal from './ImageReviewModal';

const PostUploadPage: React.FC = () => {
	const location = useLocation();
	const [isImageSelectModalOpen, setIsImageSelectModalOpen] = useState(false);
	const [isImageReviewModalOpen, setIsImageReviewModalOpen] = useState(false);
	const [isInstaConnectModalOpen, setIsInstaConnectModalOpen] = useState(false);
	const [isInstaFeedSelectModalOpen, setIsInstaFeedSelectModalOpen] = useState(false);
	const [isPostUploadModalOpen, setIsPostUploadModalOpen] = useState(false);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [instagramId, setInstagramId] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		const state = location.state as { mode?: string };
		if (state?.mode === 'image') {
			setIsImageSelectModalOpen(true);
		} else if (state?.mode === 'instagram') {
			setIsInstaConnectModalOpen(true);
		}
	}, [location.state]);

	const handleCloseModals = () => {
		setIsImageSelectModalOpen(false);
		setIsInstaConnectModalOpen(false);
		setIsImageReviewModalOpen(false);
		setSelectedImages([]);
		navigate('/profile');
	};

	const handleImageSelect = (images: string[]) => {
		setSelectedImages(images);
		setIsImageSelectModalOpen(false);
		setIsImageReviewModalOpen(true);
	};

	const handleInstaIdSelect = (id: string) => {
		setInstagramId(id);
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

	const handleOpenInstaFeedSelect = () => {
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
			{isImageSelectModalOpen && (
				<ImageSelectModal selectedImages={selectedImages} onClose={handleCloseModals} onSelect={handleImageSelect} />
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
			{isInstaConnectModalOpen && (
				<InstaConnectModal
					onIdSelect={handleInstaIdSelect}
					onClose={handleCloseModals}
					onNext={handleOpenInstaFeedSelect}
				/>
			)}
			{isInstaFeedSelectModalOpen && (
				<InstaFeedSelectModal
					instagramId={instagramId}
					selectedImages={selectedImages}
					onAddImages={handleAddImages}
					onNext={handleOpenImageReview}
					onClose={handleCloseModals}
				/>
			)}
			{isPostUploadModalOpen && selectedImages.length > 0 && (
				<PostUploadModal onPrev={handleOpenImageReview} selectedImages={selectedImages} />
			)}
		</OODDFrame>
	);
};

export default PostUploadPage;
