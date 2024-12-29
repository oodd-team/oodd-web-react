import { UserPostSummary } from '@apis/post/dto';

export type Post = UserPostSummary;

export interface PostItemProps {
	post: Post;
	isMyPost?: boolean;
}
