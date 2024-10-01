export interface PostTopBarProps {
	userName: string;
}

export interface PostResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: PostData;
}

interface Comments {
	commentId: number | null;
	userId: number | null;
	text: string | null;
	timestamp: string | null;
}

export interface PostData {
	postId: number;
	userId: number;
	likes: number | null;
	comments: Comments[] | null;
	photoUrls: string[];
	content: string;
	styletags: string[];
	clothingInfo: ClothingInfo[] | null;
}

export interface ClothingInfo {
	brand: string;
	model: string;
	modelNumber: number;
	url: string;
	imageUrl: string;
}

export interface UserResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: UserData;
}

export interface UserData {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
}

export interface ClothingInfoCardProps {
	imageUrl: string;
	brand: string;
	model: string;
	url: string;
}
