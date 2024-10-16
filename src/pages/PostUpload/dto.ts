import { ClothingInfo } from '../../components/ClothingInfoItem/dto';

export interface PostUploadModalProps {
	postId?: number | null;
}

export interface Styletag {
	tag: string;
	color: string;
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
