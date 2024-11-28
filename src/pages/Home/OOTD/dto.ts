export interface TagProps {
	tagImgUrl: string;
	tagName: string;
}

export interface FeedProps {
	profilePictureUrl: string;
	userName: string;
	text: string;
	feedImgUrls: string[];
	userId: number;
	postId: number;
}

export interface OOTDAPIResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		posts: Post[];
	};
}

export interface Post {
	postId: number;
	userId: number;
	likes: number;
	photoUrls: string[];
	content: string;
	styletags: string[];
}

export interface UserResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		id: number;
		name: string;
		nickname: string;
		profilePictureUrl: string;
	};
}
