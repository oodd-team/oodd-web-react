import block from '../../apis/core';

import ConfirmationModal from '../ConfirmationModal';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsBlockConfirmationModalOpenAtom,
	IsBlockFailModalOpenAtom,
	IsBlockSuccessModalOpenAtom,
	PostBlockAtom,
} from '../../recoil/Home/BlockBottomSheetAtom';
import { IsMeatballBottomSheetOpenAtom } from '../../recoil/Home/MeatballBottomSheetAtom';

import { ApiDto } from './dto';
import { ConfirmationModalProps } from '../ConfirmationModal/dto';

const BlockConfirmationModal: React.FC = () => {
	const [, setIsMeatballBottomSheetOpen] = useRecoilState(IsMeatballBottomSheetOpenAtom);
	const [isBlockConfirmationModalOpen, setIsBlockConfirmationModalOpen] = useRecoilState(
		IsBlockConfirmationModalOpenAtom,
	);
	const [, setIsBlockSuccessModalOpen] = useRecoilState(IsBlockSuccessModalOpenAtom);
	const [, setIsBlockFailModalOpen] = useRecoilState(IsBlockFailModalOpenAtom);
	const postBlock = useRecoilValue(PostBlockAtom);

	const blockConfirmationModalProps: ConfirmationModalProps = {
		content: `${postBlock?.friendName} 님을\n정말로 차단하시겠습니까?`,
		isCancelButtonVisible: true,
		confirm: {
			text: '차단하기',
			action: () => {
				const postNewBlock = async () => {
					if (postBlock) {
						const response = await block.post<ApiDto>('/block', {
							userId: postBlock.userId,
							friendId: postBlock.friendId,
							action: postBlock.action,
						});

						if (response.message === 'OK') {
							setIsMeatballBottomSheetOpen(false);
							setIsBlockConfirmationModalOpen(false);
							setIsBlockSuccessModalOpen(true);
						} else {
							setIsMeatballBottomSheetOpen(false);
							setIsBlockConfirmationModalOpen(false);
							setIsBlockFailModalOpen(true);
						}
					} else {
						alert('잘못된 요청입니다.');
						setIsBlockConfirmationModalOpen(false);
					}
				};
				postNewBlock();
			},
		},
		onCloseModal: () => {
			setIsBlockConfirmationModalOpen(false);
		},
	};

	return <>{isBlockConfirmationModalOpen && <ConfirmationModal {...blockConfirmationModalProps} />}</>;
};

export default BlockConfirmationModal;
