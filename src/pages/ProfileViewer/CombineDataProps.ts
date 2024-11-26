import { PostSummary } from '../../apis/post/dto';

export interface CombineDataProps {
	userId: number;
	nickname: string;
	bio: string;
	userImg?: string;
	isFriend?: boolean;
	commentsCount?: number;
	postsCount?: number;
	likesCount?: number;
	posts?: PostSummary[];
	status: 'blank' | 'unblocked' | 'blocked';
}
