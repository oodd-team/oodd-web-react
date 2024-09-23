export interface ImageSwiperProps {
	images: string[];
	onRemove: (image: string) => void;
	onAddImages: (images: string[]) => void;
}
