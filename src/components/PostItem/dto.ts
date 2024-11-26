export interface Post {
	postId?: number;
	likes?: number;
	commentsCount?: number; // 추후 남의 게시물 리스트 조회 api 응답에 commentsCount가 생기면 optional 삭제
	isRepresentative: boolean;
	firstPhoto?: string;
}

export interface PostItemProps {
	post: Post;
	isMyPost?: boolean;
}
