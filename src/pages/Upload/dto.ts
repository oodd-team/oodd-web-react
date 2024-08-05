export interface ImageReviewModalProps {
	onPrev: () => void;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onDeleteImages: (images: string[]) => void;
	onNext: () => void;
}

export interface ImageSelectModalProps {
	selectedImages: string[];
	onClose: () => void;
	onSelect: (images: string[]) => void;
}

export interface InstaConnectModalProps {
	onIdSelect: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}

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

export interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
}

export interface Hashtag {
	tag: string;
	color: string;
}

export interface ClothingInfo {
	image: string;
	brand: string;
	model: string;
	url: string;
}

export interface ClothingInfoItemProps {
	clothingObj: ClothingInfo;
	onDelete: (clothingObj: ClothingInfo) => void;
}