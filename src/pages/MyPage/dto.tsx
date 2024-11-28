export interface PostData {
	id: string;
	imgUrl: string;
	likes: number;
	comments: number;
}

// src/pages/MyPage/dto.ts

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
}

// API 응답에 맞는 타입 정의
export interface PostItem {
	postId: number;
	userId: number;
	likes: number;
	firstPhoto: string;
	isRepresentative: boolean;
	commentsCount?: number; // Optional since it might not be included for other users
}

export interface PostsResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		totalPosts: number;
		totalLikes: number;
		posts: PostItem[];
	};
}
