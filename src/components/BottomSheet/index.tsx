import { BottomSheetWrapper, BottomSheetLayout, Handler } from './styles';

interface BottomSheetProps {
	isBackgroundDimmed: boolean; // 검은색 반투명 배경 설정
	component: React.ReactNode; // BottomSheet 내부에 전달할 컴포넌트
	onClickBackground: () => void; // BottomSheet을 닫는 함수
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isBackgroundDimmed, component, onClickBackground }) => {
	return (
		<BottomSheetWrapper
			$isBackgroundDimmed={isBackgroundDimmed}
			onClick={(e) => {
				// BottomSheet 외부를 클릭했을 경우 BottomSheet 닫음
				if (e.target === e.currentTarget) {
					onClickBackground();
				}
			}}
		>
			<BottomSheetLayout>
				{/* TODO: 모달 드래그 */}
				<Handler />
				{component}
			</BottomSheetLayout>
		</BottomSheetWrapper>
	);
};

export default BottomSheet;
