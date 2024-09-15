export interface Relationship {
	id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	message: string;
	requestStatus: string;
	rejectedAt: string | null;
	acceptedAt: string | null;
	target: User;
	requester: Requester;
}

export interface User {
	id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	kakaoId: string | null;
	googleId: string | null;
	naverId: string | null;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
}

export interface Requester extends User {
	representativePost: Post | null;
}

export interface Post {
	id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	content: string;
	isRepresentative: boolean;
	images: Image[];
	postStyletags: PostStyleTag[];
	postClothings: Clothing[];
}

export interface Image {
	id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	postId: number;
	url: string;
	order: number;
}

export interface PostStyleTag {
	id: number;
	status: string | null;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	styletag: StyleTag;
}

export interface StyleTag {
	id: number;
	status: string | null;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	tag: string;
}

export interface Clothing {
	id: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}
