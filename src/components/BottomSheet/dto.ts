export interface BottomSheetProps {
	isOpenBottomSheet: boolean; // BottomSheet state
	isBackgroundDimmed: boolean; // 배경 어둡게 설정
	Component: React.ComponentType; // BottomSheet 내부에 전달할 컴포넌트
	onCloseBottomSheet: () => void; // BottomSheet을 닫는 함수
}
