import React from 'react';
import { ModalWrapper, ModalContainer } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';

interface ModalProps {
	onClose: () => void;
	instagramId: string;
}

const SuccessModal: React.FC<ModalProps> = ({ onClose, instagramId }) => {
	const handleClick = () => {
		onClose();
	};

	return (
		<ModalWrapper onClick={handleClick}>
			<ModalContainer>
				<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>
					{instagramId} 계정 연동에 성공했어요!
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }}>가져올 OOTD를 선택해 보세요</StyledText>
			</ModalContainer>
		</ModalWrapper>
	);
};

export default SuccessModal;
