export interface UserProfileResponse {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string | null;
	bio: string | null;
	joinedAt: string;
}

export interface ApiResponse<T> {
	isSuccess: boolean;
	code: number;
	message: string;
	result: T;
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

