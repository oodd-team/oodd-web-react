import React from 'react';
import { ModalWrapper, ModalContainer } from './styles';
import { StyledText } from '../Text/StyledText';
import { ModalProps } from './dto';

const Modal: React.FC<ModalProps> = ({ content, contentTwo, onClose }) => {
	const handleClick = () => {
		onClose();
	};

	return (
		<ModalWrapper onClick={handleClick}>
			<ModalContainer>
				<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>{content}</StyledText>
				{contentTwo && <StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>{contentTwo}</StyledText>}
			</ModalContainer>
		</ModalWrapper>
	);
};

export default Modal;
