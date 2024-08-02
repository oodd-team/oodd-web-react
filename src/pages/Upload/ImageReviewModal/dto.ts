export interface ImageReviewModalProps {
	onPrev: () => void;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onDeleteImages: (images: string[]) => void;
	onNext: () => void;
}
