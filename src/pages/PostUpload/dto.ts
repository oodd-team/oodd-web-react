import { ClothingInfo } from '../../components/ClothingInfoItem/dto';
import { PostImage } from '../../apis/post/dto';

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
