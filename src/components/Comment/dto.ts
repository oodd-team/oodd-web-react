export interface CommentProps {
	isModal?: boolean; // 이 속성은 설정하지 말아주세요 (commentBottomSheet에서 사용)
	content: string;
	sendComment: (comment: string) => void; // comment를 전달할 api 함수 등
}
