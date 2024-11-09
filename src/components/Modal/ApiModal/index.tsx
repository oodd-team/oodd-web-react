import { useState } from 'react';

import Modal from '..';
import { ModalProps } from '../dto';
import { ApiModalProps } from './dto';
import { handleError } from '../../../apis/util/handleError';

// 게시물 삭제, 유저 차단, 채팅방 나가기 등에 사용
const ApiModal: React.FC<ApiModalProps> = ({ response, content, buttonContent, successContent, handleCloseModal }) => {
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [statusMessage, setStatusMessage] = useState('알 수 없는 오류입니다.');

	// api 요청을 보내고 응답에 따라 모달 상태 제어
	const sendApiRequest = async () => {
		try {
			const apiResponse = await response;
			if (apiResponse.isSuccess) {
				setStatusMessage(successContent);
			}
		} catch (error) {
			const message = handleError(error);
			setStatusMessage(message);
		} finally {
			setIsModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	const handleButtonClick = () => {
		sendApiRequest();
	};

	const ModalProps: ModalProps = {
		content: content,
		isCloseButtonVisible: true,
		onClose: handleCloseModal,
		button: {
			content: buttonContent,
			onClick: handleButtonClick,
		},
	};

	// api 응답에 따른 메시지를 출력하는 모달
	const statusModalProps: ModalProps = {
		content: statusMessage,
		onClose: handleCloseModal,
	};

	return (
		<>
			{isModalOpen && <Modal {...ModalProps} />}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</>
	);
};

export default ApiModal;
