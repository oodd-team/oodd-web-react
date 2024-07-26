import { BottomSheetWrapper, BottomSheetLayout, Handler } from './styles';

interface BottomSheetProps {
	shadow: boolean; // 검은색 반투명 배경 설정
	component: () => void; // BottomSheet 내부에 전달할 컴포넌트
	onClickBackground: () => {}; // BottomSheet을 닫는 함수
}

const BottomSheet: React.FC<BottomSheetProps> = ({ $shadow, component, onClickBackground }) => {
	return (
		<BottomSheetWrapper
			$shadow={$shadow}
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
