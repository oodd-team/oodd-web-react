export interface PostUploadModalProps {
	postId?: number | null;
}

export interface Styletag {
	tag: string;
	color: string;
}

export interface ClothingInfo {
	imageUrl: string;
	brand: string;
	model: string;
	modelNumber: number;
	url: string;
}

export interface ClothingInfoItemProps {
	clothingObj: ClothingInfo;
	onDelete: (clothingObj: ClothingInfo) => void;
}

export interface ImageSwiperProps {
	images: string[];
}

export interface SearchBottomSheetProps {
	onClose: () => void;
	onSelectClothingInfo: (clothingInfo: ClothingInfo) => void;
}

export interface ToggleSwitchProps {
	checked: boolean;
	onChange: () => void;
	disabled?: boolean;
}

export interface Post {
	photoUrls: string[];
	content?: string;
	styletags?: string[];
	clothingInfo?: ClothingInfo[];
	isRepresentive: boolean;
}

export interface PostResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		postId: number;
		userId: number;
		likes: any;
		comments: any;
		photoUrls: string[];
		content: string;
		styletags: string[];
		clothingInfo: ClothingInfo[];
		isRepresentative: boolean;
	};
}