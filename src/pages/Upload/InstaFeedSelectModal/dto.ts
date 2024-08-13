export interface InstaFeedSelectModalProps {
	instagramId: string;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onClose: () => void;
	onNext: () => void;
}

export interface Post {
	imgs: string[];
}