import BottomSheet from '../../../components/BottomSheet';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import { useRecoilState } from 'recoil';
import {
	IsOpenMeatballBottomSheetAtom,
	IsOpenReportBottomSheetAtom,
} from '../../../recoil/Home/MeatballBottomSheetAtom';
import { BottomSheetMenuProps } from '../../../components/BottomSheetMenu/dto';
import BottomSheetMenu from '../../../components/BottomSheetMenu';
import { IsOpenBlockConfirmationModalAtom } from '../../../recoil/Home/BlockBottomSheetAtom';
import declaration from '../../../assets/Post/declaration.svg';
import block from '../../../assets/Post/block.svg';

const MeatballBottomSheet: React.FC = () => {
	const [isOpenMeatballBottomSheet, setIsOpenMeatballBottomSheet] = useRecoilState(IsOpenMeatballBottomSheetAtom);
	const [, setIsOpenReportBottomSheet] = useRecoilState(IsOpenReportBottomSheetAtom);
	const [, setIsOpenBlockConfirmationModal] = useRecoilState(IsOpenBlockConfirmationModalAtom);

	const meatballBottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setIsOpenMeatballBottomSheet(false);
					setIsOpenReportBottomSheet(true);
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsOpenMeatballBottomSheet(false);
					setIsOpenBlockConfirmationModal(true);
				},
				icon: block,
			},
		],
		marginBottom: '3.125rem',
	};

	const meatballBottomSheet: BottomSheetProps = {
		isOpenBottomSheet: isOpenMeatballBottomSheet,
		Component: BottomSheetMenu,
		componentProps: meatballBottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsOpenMeatballBottomSheet(false);
		},
	};

	return <BottomSheet {...meatballBottomSheet} />;
};

export default MeatballBottomSheet;
