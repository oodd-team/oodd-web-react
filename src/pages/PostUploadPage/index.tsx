import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Overlay, PageOverlay } from './styles';
import PostUploadModal from './PostUploadModal';
import ImageSelectModal from './ImageSelectModal';
import InstagramLinkModal from './InstagramLinkModal';
import ImageReviewModal from './ImageReviewModal';

const PostUploadPage: React.FC = () => {
	const location = useLocation();
	const [isImageSelectModalOpen, setIsImageSelectModalOpen] = useState(false);
	const [isInstagramLinkModalOpen, setIsInstagramLinkModalOpen] = useState(false);
	const [isImageReviewModalOpen, setIsImageReviewModalOpen] = useState(false);
	const [isPostUploadModalOpen, setIsPostUploadModalOpen] = useState(false);
	const [selectedImages, setSelectedImages] = useState<string[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const state = location.state as { mode?: string };
		if (state?.mode === 'image') {
			setIsImageSelectModalOpen(true);
		} else if (state?.mode === 'instagram') {
			setIsInstagramLinkModalOpen(true);
		}
	}, [location.state]);

	const handleCloseModals = () => {
		setIsImageSelectModalOpen(false);
		setIsInstagramLinkModalOpen(false);
		setIsImageReviewModalOpen(false);
		setSelectedImages([]);
		navigate('/profile');
	};

	const handleImageSelect = (images: string[]) => {
		setSelectedImages(images);
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
		setIsImageReviewModalOpen(false);
		setIsImageSelectModalOpen(true);
		setSelectedImages([]);
	};

	const handleReviewNext = () => {
		setIsImageReviewModalOpen(false);
		setIsPostUploadModalOpen(true);
	};

	const handlePostPrev = () => {
		setIsPostUploadModalOpen(false);
		setIsImageReviewModalOpen(true);
	};

	return (
		<Overlay>
			<PageOverlay>
				{isImageSelectModalOpen && (
					<ImageSelectModal selectedImages={selectedImages} onClose={handleCloseModals} onSelect={handleImageSelect} />
				)}
				{isImageReviewModalOpen && selectedImages.length > 0 && (
					<ImageReviewModal
						onPrev={handleReviewPrev}
						selectedImages={selectedImages}
						onNext={handleReviewNext}
						onAddImages={handleAddImages}
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
