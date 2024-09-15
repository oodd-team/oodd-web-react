import block from '../../../apis/core';
import { ApiDto } from '../dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsOpenBlockConfirmationModalAtom,
	IsOpenBlockFailModalAtom,
	IsOpenBlockSuccessModalAtom,
	PostBlockAtom,
} from '../../../recoil/BlockBottomSheetAtom';
import { ConfirmationModalProps } from '../../../components/ConfirmationModal/dto';
import ConfirmationModal from '../../../components/ConfirmationModal';

const BlockConfirmationModal: React.FC = () => {
	const [, setIsOpenBlockConfirmationModal] = useRecoilState(IsOpenBlockConfirmationModalAtom);
	const [, setIsOpenBlockSuccessModal] = useRecoilState(IsOpenBlockSuccessModalAtom);
	const [, setIsOpenBlockFailModal] = useRecoilState(IsOpenBlockFailModalAtom);
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
							setIsOpenBlockConfirmationModal(false);
							setIsOpenBlockSuccessModal(true);
						} else {
							setIsOpenBlockConfirmationModal(false);
							setIsOpenBlockFailModal(true);
						}
					} else {
						alert('잘못된 요청입니다.');
					}
				};
				postNewBlock();
			},
		},
		onCloseModal: () => {
			setIsOpenBlockConfirmationModal(false);
		},
	};

	return <ConfirmationModal {...blockConfirmationModalProps} />;
};

export default BlockConfirmationModal;
