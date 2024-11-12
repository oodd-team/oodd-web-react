import BottomSheet from '../BottomSheet';
import BottomSheetMenu from '../BottomSheetMenu';
import { BottomSheetProps } from '../BottomSheet/dto';
import { BottomSheetMenuProps } from '../BottomSheetMenu/dto';

import { useRecoilState } from 'recoil';
import { userIdAtom, userNameAtom } from '../../recoil/Post/PostAtom';
import { IsMeatballBottomSheetOpenAtom, IsReportBottomSheetOpenAtom } from '../../recoil/Home/MeatballBottomSheetAtom';
import { IsBlockConfirmationModalOpenAtom, PostBlockAtom } from '../../recoil/Home/BlockBottomSheetAtom';

import report from '../../assets/default/report';
import block from '../../assets/default/block.svg';

const MeatballBottomSheet: React.FC = () => {
	const [userId] = useRecoilState(userIdAtom);
	const [userName] = useRecoilState(userNameAtom);
	const [, setPostBlockAtom] = useRecoilState(PostBlockAtom);
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
				icon: report,
			},
			{
				text: '차단하기',
				action: () => {
					const storedUserId = localStorage.getItem('id');
					if (storedUserId) {
						setPostBlockAtom({
							userId: Number(storedUserId),
							friendId: userId,
							friendName: userName,
							action: 'toggle',
						});
						setIsBlockConfirmationModalOpen(true);
					} else {
						console.error('User ID not found in localStorage');
					}
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
