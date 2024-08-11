export interface InstaFeedSelectModalProps {
	onAddImages: (images: string[]) => void;
	onClose: () => void;
	onNext: () => void;
	posts: Post[];
}

export interface Post {
	imgs: string[];
}