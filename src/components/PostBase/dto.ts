export interface PostBaseProps {
	onClickMenu: () => void;
}

export interface PostTopBarProps {
	userName: string;
}

export interface ImageSwiperProps {
	images: string[];
}

export interface LikeCommentBottomSheetProps {
	tab: 'likes' | 'comments';
	likeCount: number;
	commentCount: number;
}

export interface CommentsResponse {
	isSuccess: boolean;
	code: number;
	message: string;
	result: {
		comments: Array<{
			id: number;
			postId: number;
			content: string;
			status: string;
			createdAt: string;
			updatedAt: string;
			deletedAt: string | null;
			user: {
				id: number;
				nickname: string;
				profilePictureUrl: string;
			};
		}>;
	};
}
