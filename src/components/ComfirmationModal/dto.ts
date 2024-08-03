export interface Confirm {
	text: string; // 버튼 표시명 ex. 취소, 차단하기, ...
	action: () => void; // 클릭 시 실행될 함수
}

export interface ConfirmationModalProps {
	content: string; // 모달 내용
	isCancelButtonVisible: boolean; // 취소 버튼 유무
	confirm: Confirm; // 하단 버튼 배열
	onClickBackground: () => void; // 모달 닫는 함수
}
