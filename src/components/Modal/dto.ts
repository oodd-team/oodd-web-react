export interface ModalProps {
	isCloseButtonVisible?: boolean; // 우측 상단 X 버튼 유무 (default false)
	onClose: () => void;
	content: string;
	button?: {
		content: string; // 버튼 내부 텍스트 (default 확인)
		onClick: () => void; // 버튼 클릭 이벤트 핸들러 (default onClose)
	};
}
