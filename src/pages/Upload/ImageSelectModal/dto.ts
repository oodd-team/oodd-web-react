export interface ImageSelectModalProps {
	selectedImages: string[];
	onClose: () => void;
	onSelect: (images: string[]) => void;
}
