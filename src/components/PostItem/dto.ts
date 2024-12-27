import { UserPostSummary } from '@apis/post/dto';

export interface Post extends UserPostSummary {}

export interface PostItemProps {
	post: Post;
	isMyPost?: boolean;
}
