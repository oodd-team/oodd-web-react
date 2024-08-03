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

export interface ImageSwiperProps {
	images: string[];
}

export interface BottomSheetProps {
	onClose: () => void;
	onSelectClothingInfo: (clothingInfo: ClothingInfo) => void;
}

export interface ToggleSwitchProps {
	checked: boolean;
	onChange: () => void;
	disabled?: boolean;
}