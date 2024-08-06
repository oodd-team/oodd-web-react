import { useState } from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import ConfirmationModal from '../../components/ComfirmationModal';
import { ConfirmationModalProps } from '../../components/ComfirmationModal/dto';

const ConfirmationModalTest: React.FC = () => {
	const [modalWithCancle, setModalWithCancle] = useState(false);
	const [modalWithoutCancle, setModalWithoutCancle] = useState(false);

	const modalWithCancleProps: ConfirmationModalProps = {
		content: '취소 버튼이 있는 모달입니다\n개행은 이렇게 해 주세요',
		isCancelButtonVisible: true,
		confirm: {
			text: '차단하기',
			action: () => {
				setModalWithCancle(false);
				console.log('차단되었습니다.');
			},
		},
		onCloseModal: () => {
			setModalWithCancle(false);
		},
	};

	const modalWithoutCancleProps: ConfirmationModalProps = {
		content: '취소 버튼이 없는 모달입니다',
		isCancelButtonVisible: false,
		confirm: {
			text: '차단하기',
			action: () => {
				setModalWithoutCancle(false);
				console.log('차단되었습니다.');
			},
		},
		onCloseModal: () => {
			setModalWithoutCancle(false);
		},
	};

	return (
		<OODDFrame>
			ConfirmationModal 테스트 페이지입니다 사용 후 폴더를 삭제해 주세요
			{modalWithCancle && <ConfirmationModal {...modalWithCancleProps} />}
			{modalWithoutCancle && <ConfirmationModal {...modalWithoutCancleProps} />}
			<button
				style={{ padding: '10px', margin: '10px', border: '1px solid black' }}
				onClick={() => {
					setModalWithCancle(true);
				}}
			>
				취소 버튼이 있는 모달
			</button>
			<button
				style={{ padding: '10px', margin: '10px', border: '1px solid black' }}
				onClick={() => {
					setModalWithoutCancle(true);
				}}
			>
				취소 버튼이 없는 모달
			</button>
		</OODDFrame>
	);
};

export default ConfirmationModalTest;
