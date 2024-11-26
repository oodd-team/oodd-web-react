import React from 'react';
import ReactDOM from 'react-dom';
import { ModalWrapper, ModalContainer, CloseButton, ConfirmButton } from './styles';
import { StyledText } from '../Text/StyledText';
import { ModalProps } from './dto';
import XIcon from '../../assets/default/x.svg';

const Modal: React.FC<ModalProps> = ({ isCloseButtonVisible, onClose, content, button }) => {
	const handleBackgroundClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleConfirmButtonClick = () => {
		if (button) {
			button.onClick();
		} else {
			onClose();
		}
	};

	return ReactDOM.createPortal(
		<ModalWrapper onClick={handleBackgroundClick}>
			<ModalContainer $isCloseButtonVisible={isCloseButtonVisible || false}>
				{isCloseButtonVisible && (
					<CloseButton onClick={onClose}>
						<img src={XIcon} alt="" />
					</CloseButton>
				)}
				<StyledText $textTheme={{ style: 'body2-regular' }}>{content}</StyledText>
				<ConfirmButton onClick={handleConfirmButtonClick}>{button?.content || '확인'}</ConfirmButton>
			</ModalContainer>
		</ModalWrapper>,
		document.body,
	);
};

export default Modal;
