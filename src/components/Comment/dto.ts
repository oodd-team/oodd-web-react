export interface CommentProps {
	content?: string;
	sendComment: (comment: string) => void; // comment를 전달할 api 함수 등
}
