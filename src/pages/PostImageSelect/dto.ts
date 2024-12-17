export interface ImageSelectModalProps {}
import { PostImage } from '../../apis/post/dto';

export interface ImageSwiperProps {
	images: PostImage[];
	onProcessFile: (files: FileList) => void;
	onRemoveImage: (image: string) => void;
}
