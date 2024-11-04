import BottomSheet from '../BottomSheet';
import { BottomSheetProps } from '../BottomSheet/dto';
import { useRecoilState } from 'recoil';
import { IsMeatballBottomSheetOpenAtom, IsReportBottomSheetOpenAtom } from '../../recoil/Home/MeatballBottomSheetAtom';
import { BottomSheetMenuProps } from '../BottomSheetMenu/dto';
import BottomSheetMenu from '../BottomSheetMenu';
import { IsBlockConfirmationModalOpenAtom } from '../../recoil/Home/BlockBottomSheetAtom';
import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';

const MeatballBottomSheet: React.FC = () => {
	const [isMeatballBottomSheetOpen, setIsMeatballBottomSheetOpen] = useRecoilState(IsMeatballBottomSheetOpenAtom);
	const [, setIsReportBottomSheetOpen] = useRecoilState(IsReportBottomSheetOpenAtom);
	const [, setIsBlockConfirmationModalOpen] = useRecoilState(IsBlockConfirmationModalOpenAtom);

	const meatballBottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setIsMeatballBottomSheetOpen(false);
					setIsReportBottomSheetOpen(true);
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsMeatballBottomSheetOpen(false);
					setIsBlockConfirmationModalOpen(true);
				},
				icon: block,
			},
		],
		marginBottom: '3.125rem',
	};

	const meatballBottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isMeatballBottomSheetOpen,
		Component: BottomSheetMenu,
		componentProps: meatballBottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsMeatballBottomSheetOpen(false);
		},
	};

	return <BottomSheet {...meatballBottomSheetProps} />;
};

export default MeatballBottomSheet;
