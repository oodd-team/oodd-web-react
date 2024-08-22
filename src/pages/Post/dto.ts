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
	modelNumber: string;
	url: string;
	imageUrl: string;
}
