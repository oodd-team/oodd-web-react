import { BottomSheetDto } from './dto';
import { BottomSheetWrapper, BottomSheetLayout, Handler } from './styles';

const BottomSheet: React.FC<BottomSheetDto> = ({ isBackgroundDimmed, component, onClickBackground }) => {
	return (
		<BottomSheetWrapper
			$isBackgroundDimmed={isBackgroundDimmed}
			onClick={(e: any) => {
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
