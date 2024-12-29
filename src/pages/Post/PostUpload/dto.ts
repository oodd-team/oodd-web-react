import type { PostImage } from '@apis/post/dto';
import type { ClothingInfo } from '@components/ClothingInfoItem/dto';

export interface PostUploadModalProps {
	postId?: number | null;
}

export interface ImageSwiperProps {
	images: PostImage[];
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
