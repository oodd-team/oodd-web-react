import { PostClothing } from '../../apis/Post/dto';

export interface ClothingInfo extends PostClothing {}

export interface ClothingInfoItemProps {
	clothingObj: ClothingInfo;
	onDelete?: (clothingObj: ClothingInfo) => void;
	hasRightMargin?: boolean;
}
