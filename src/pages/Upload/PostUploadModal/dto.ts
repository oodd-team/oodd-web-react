export interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
}

export interface Styletag {
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