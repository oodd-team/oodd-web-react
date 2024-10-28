export interface Post {
	postId: number;
	likes: number;
	commentsCount?: number;
	isRepresentative: boolean;
	firstPhoto: string;
}

export interface PostItemProps {
	post: Post;
	isRepresentative: boolean;
	firstPhoto: string;
}
