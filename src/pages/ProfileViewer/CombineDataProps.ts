import { UserPostSummary } from '../../apis/post/dto';

export interface CombineDataProps {
	userId: number;
	nickname: string;
	bio: string;
	userImg?: string;
	isFriend?: boolean;
	status: 'blank' | 'unblocked' | 'blocked';
	commentsCount?: number;
	postsCount?: number;
	likesCount?: number;
	posts?: UserPostSummary[];
}
