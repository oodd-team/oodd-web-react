export interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
	initialContent?: string;
	initialClothingInfos?: ClothingInfo[];
	initialStyletag?: Styletag | null;
}

export interface Styletag {
	tag: string;
	color: string;
}

export interface ClothingInfo {
	image_url: string;
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
}
