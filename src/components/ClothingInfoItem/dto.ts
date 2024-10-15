export interface ClothingInfo {
	imageUrl: string;
	brand: string;
	model: string;
	modelNumber: string;
	url: string;
}

export interface ClothingInfoItemProps {
	clothingObj: ClothingInfo;
	onDelete?: (clothingObj: ClothingInfo) => void;
	hasRightMargin?: boolean;
}
