export interface CommentProps {
	isModal?: boolean; // 데스크탑 UI(modal)에서 컴포넌트 간 간격 조정
	content: string;
	sendComment: (comment: string) => void; // comment를 전달할 api 함수 등
}
