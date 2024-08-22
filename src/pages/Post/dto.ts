export interface PostTopBarProps {
	userName: string;
}

export interface PostResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: PostData;
}

export interface PostData {
	postId: number;
	userId: number;
	likes: number | null;
	comments: any[] | null; // comments의 구조가 확실하지 않으면 any로 둡니다.
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
	modelNumber: number;
	url: string;
}
