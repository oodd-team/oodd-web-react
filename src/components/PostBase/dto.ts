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
