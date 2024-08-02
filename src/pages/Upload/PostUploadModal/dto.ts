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