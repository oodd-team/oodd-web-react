export interface BottomSheetProps {
	isOpenBottomSheet: boolean; // BottomSheet state
	isHandlerVisible: boolean; // 핸들러 여부 설정
	isBackgroundDimmed: boolean; // 배경 어둡게 설정
	Component: React.ComponentType<any>; // BottomSheet 내부에 전달할 컴포넌트
	componentProps?: any; // props가 있는 경우 객체 형태로 전달
	onCloseBottomSheet: () => void; // BottomSheet을 닫는 함수
}
