import { Post } from '../../components/PostItem/dto';

export interface UserInfoProps {
	id: number;
	nickname: string;
	bio: string;
	userImg?: string;
	isFriend?: boolean;
	isInterested?: boolean;
	commentsCount?: number;
	postsCount?: number;
	likesCount?: number;
	posts?: Post[];
	status: 'blank' | 'unblocked' | 'blocked';
}
