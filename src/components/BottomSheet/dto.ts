export interface BottomSheetProps<T = any> {
	isOpenBottomSheet: boolean; // BottomSheet state
	isHandlerVisible?: boolean; // 핸들러 가시성 설정(기본값 true)
	Component: React.ComponentType<T>; // BottomSheet 내부에 전달할 컴포넌트
	componentProps?: T; // props가 있는 경우 객체 형태로 전달
	onCloseBottomSheet: () => void; // BottomSheet을 닫는 함수
	initialTab?: 'likes' | 'comments'; // 추가: initialTab 속성
}
