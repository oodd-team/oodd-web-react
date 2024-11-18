import { ClothingInfo } from '../../components/ClothingInfoItem/dto';

export interface PostUploadModalProps {
	postId?: number | null;
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
