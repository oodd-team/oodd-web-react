import { PostClothing } from '../../apis/post/dto';

export interface ClothingInfo extends PostClothing {}

export interface ClothingInfoItemProps {
	clothingObj: ClothingInfo;
	onDelete?: (clothingObj: ClothingInfo) => void;
}
