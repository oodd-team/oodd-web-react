export interface ImageReviewModalProps {
	onPrev: () => void;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onDeleteImages: (images: string[]) => void;
	onNext: () => void;
}

export interface ImageSwiperProps {
	images: string[];
	onRemove: (image: string) => void;
	onAddImages: (images: string[]) => void;
}
