export interface BottomSheetDto {
	isBackgroundDimmed: boolean; // 배경 어둡게 설정
	component: React.ReactNode; // BottomSheet 내부에 전달할 컴포넌트
	onClickBackground: () => void; // BottomSheet을 닫는 함수
}
