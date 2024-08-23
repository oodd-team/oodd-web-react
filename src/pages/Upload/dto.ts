export interface ImageReviewModalProps {
	onPrev: () => void;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onDeleteImages: (images: string[]) => void;
	onNext: () => void;
}

export interface ImageSelectModalProps {
	selectedImages: string[];
	onClose: () => void;
	onSelect: (images: string[]) => void;
}

export interface InstaConnectModalProps {
	//onIdSelect: (id: string) => void;
	onClose: () => void;
	onNext: (posts: Post[]) => void;
	accessToken?: string;
}

export interface InstaFeedSelectModalProps {
	instagramId: string;
	selectedImages: string[];
	onAddImages: (images: string[]) => void;
	onClose: () => void;
	onNext: () => void;
}

export interface Post {
	imgs: string[];
	caption: string;
}

export interface PostUploadModalProps {
	onPrev: () => void;
	selectedImages: string[];
	initialContent?: string;
	initialClothingInfos?: ClothingInfo[];
	initialStyletag?: Styletag | null;
	initialRepresentative?: boolean;
	postId?: number | null;
}

export interface Styletag {
	tag: string;
	color: string;
}

export interface ClothingInfo {
	imageUrl: string;
	brand: string;
	model: string;
	modelNumber: number;
	url: string;
}

export interface PostResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		postId: number;
		userId: number;
		likes: any;
		comments: any;
		photoUrls: string[];
		content: string;
		styletags: string[];
		clothingInfo: ClothingInfo[];
		isRepresentative: boolean;
	};
}
