import type { PostClothing } from '@apis/post/dto';

export type ClothingInfo = PostClothing;

export interface ClothingInfoItemProps {
	clothingObj: ClothingInfo;
	onDelete?: (clothingObj: ClothingInfo) => void;
}
