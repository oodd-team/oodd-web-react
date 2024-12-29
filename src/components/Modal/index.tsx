import { createPortal } from 'react-dom';

import closeIcon from '@assets/default/x.svg';

import { StyledText } from '@components/Text/StyledText';

import type { ModalProps } from './dto';

import { ModalWrapper, ModalContainer, CloseButton, ConfirmButton } from './styles';

const Modal: React.FC<ModalProps> = ({ isCloseButtonVisible, onClose, content, button }) => {
	const handleBackgroundClick = (e: React.MouseEvent) => {
		e.stopPropagation();
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

	return createPortal(
		<ModalWrapper onClick={handleBackgroundClick}>
			<ModalContainer $isCloseButtonVisible={isCloseButtonVisible || false}>
				{isCloseButtonVisible && (
					<CloseButton onClick={onClose}>
						<img src={closeIcon} alt="" />
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
