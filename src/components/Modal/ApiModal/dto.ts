export interface ApiModalProps<T = any> {
	response: Promise<T>; // API 호출 함수의 반환값 (예: deleteSomething.delete('/uri'))
	content: string; // 기본 모달에 들어갈 문구 (예: 정말로 삭제하시겠습니까?)
	buttonContent: string; // 기본 모달의 버튼에 들어갈 문구 (예: 삭제하기)
	successContent: string; // 성공 모달에 들어갈 문구 (예: ***가 삭제되었습니다.)
	handleCloseModal: () => void; // 모달을 닫는 함수
}
