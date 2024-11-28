import { PostSummary } from '../../apis/post/dto';

export interface PostItemProps {
	post: PostSummary;
	isMyPost?: boolean;
}
