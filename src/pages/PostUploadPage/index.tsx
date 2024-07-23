import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Overlay, PageOverlay } from './styles';
import PostUploadModal from './PostUploadModal';
import PhotoSelectModal from './PhotoSelectModal';
import InstagramLinkModal from './InstagramLinkModal';
import PhotoReviewModal from './PhotoReviewModal';

const PostUploadPage: React.FC = () => {
	const location = useLocation();
	const [isPhotoSelectModalOpen, setIsPhotoSelectModalOpen] = useState(false);
	const [isInstagramLinkModalOpen, setIsInstagramLinkModalOpen] = useState(false);
	const [isPhotoReviewModalOpen, setIsPhotoReviewModalOpen] = useState(false);
	const [isPostUploadModalOpen, setIsPostUploadModalOpen] = useState(false);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const state = location.state as { mode?: string };
		if (state?.mode === 'photo') {
			setIsPhotoSelectModalOpen(true);
		} else if (state?.mode === 'instagram') {
			setIsInstagramLinkModalOpen(true);
		}
	}, [location.state]);

	const handleCloseModals = () => {
		setIsPhotoSelectModalOpen(false);
		setIsInstagramLinkModalOpen(false);
		setIsPhotoReviewModalOpen(false);
		navigate('/profile');
	};

	const handleImageSelect = (images: string[]) => {
		setSelectedImages(images);
		setIsPhotoSelectModalOpen(false);
		setIsPhotoReviewModalOpen(true);
	};

	const handleAddMoreImages = (images: string[]) => {
		setSelectedImages((prevImages) => [...prevImages, ...images]);
	};

	const handleDeleteImages = (images: string[]) => {
		setSelectedImages([...images]);
	};

	const handleReviewPrev = () => {
		setIsPhotoReviewModalOpen(false);
		setIsPhotoSelectModalOpen(true);
	};

	const handleReviewNext = () => {
		setIsPhotoReviewModalOpen(false);
		setIsPostUploadModalOpen(true);
	};

	const handlePostPrev = () => {
		setIsPostUploadModalOpen(false);
		setIsPhotoReviewModalOpen(true);
	};

	return (
		<Overlay>
			<PageOverlay>
				{isPhotoSelectModalOpen && (
					<PhotoSelectModal selectedImages={selectedImages} onClose={handleCloseModals} onSelect={handleImageSelect} />
				)}
				{isPhotoReviewModalOpen && selectedImages.length > 0 && (
					<PhotoReviewModal
						onPrev={handleReviewPrev}
						selectedImages={selectedImages}
						onNext={handleReviewNext}
						onAddMoreImages={handleAddMoreImages}
						onDeleteImages={handleDeleteImages}
					/>
				)}
				{isInstagramLinkModalOpen && <InstagramLinkModal onClose={handleCloseModals} />}
				{isPostUploadModalOpen && selectedImages.length > 0 && (
					<PostUploadModal onPrev={handlePostPrev} selectedImages={selectedImages} />
				)}
			</PageOverlay>
		</Overlay>
	);
};

export default PostUploadPage;
