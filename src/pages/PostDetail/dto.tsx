// src/types.ts

export interface BaseResponse<T = any> {
	isSuccess: boolean;
	code: number;
	message: string;
	result?: T;
}

export interface PostDetailResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		postId: number;
		userId: number;
		likes: number | null;
		comments: { commentId: number; userId: number; text: string; timestamp: string }[] | null;
		photoUrls: string[];
		content: string;
		styletags: string[];
		clothingInfo: { imageUrl: string; brand: string; model: string; modelNumber: string; url: string }[] | null;
	};
}

export interface LikesResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		totalLikes: number;
		likes: Array<{
			id: number;
			userId: number;
			postId: number;
			status: string;
			createdAt: string;
			updatedAt: string;
			user: {
				id: number;
				nickname: string;
				profilePictureUrl: string;
			};
		}>;
	};
}

export interface CommentsResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		comments: Array<{
			id: number;
			postId: number;
			content: string;
			status: string;
			createdAt: string;
			updatedAt: string;
			deletedAt: string | null;
			user: {
				id: number;
				nickname: string;
				profilePictureUrl: string;
			};
		}>;
	};
}

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
