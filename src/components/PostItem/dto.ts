import { UserPostSummary } from '../../apis/post/dto';

export interface PostItemProps {
	post: UserPostSummary;
	isMyPost?: boolean;
}
