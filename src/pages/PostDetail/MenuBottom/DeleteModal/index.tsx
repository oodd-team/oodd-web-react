import React from 'react';
import { ModalOverlay, ModalContent, ModalButtonContainer, ModalButton } from './styles';

interface DeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
	if (!isOpen) return null;

	return (
		<ModalOverlay>
			<ModalContent>
				<p>해당 OOTD를 정말로 삭제하시겠습니까?</p>
				<ModalButtonContainer>
					<ModalButton onClick={onClose}>취소</ModalButton>
					<ModalButton onClick={onConfirm} style={{ color: 'red' }}>
						삭제하기
					</ModalButton>
				</ModalButtonContainer>
			</ModalContent>
		</ModalOverlay>
	);
};

export default DeleteModal;
