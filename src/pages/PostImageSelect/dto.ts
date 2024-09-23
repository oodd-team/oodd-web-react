export interface ImageSelectModalProps {}

export interface ImageSwiperProps {
	images: string[];
	onProcessFile: (files: FileList) => void;
	onRemoveImage: (image: string) => void;
}
