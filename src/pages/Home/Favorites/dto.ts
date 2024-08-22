export interface UserProps {
	userId: number;
	userImgUrl: string;
	userName: string;
}

export interface FeedProps {
	postId: number;
	profileUrl: string;
	userName: string;
	feedImgUrl: string;
	hasLiked: boolean;
	hasInterested: boolean;
}

export interface UserInterest {
	userId: number;
	friendId: number;
	status: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	nickname: string;
	profilePictureUrl: string;
}

export interface UserInterestsResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: UserInterest[];
}

export interface Post {
	postId: number;
	userId: number;
	likes: number;
	firstPhoto: string;
	isRepresentative: boolean;
	hasLiked: boolean;
	hasInterested: boolean;
}

export interface PostsResult {
	totalPosts: number;
	totalLikes: number;
	posts: Post[];
}

export interface UserPostsResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: PostsResult;
}
