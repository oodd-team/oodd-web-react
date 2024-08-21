export interface PostData {
	id: string;
	imgUrl: string;
	likes: number;
	comments: number;
}

// src/pages/Mypage/dto.ts

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
