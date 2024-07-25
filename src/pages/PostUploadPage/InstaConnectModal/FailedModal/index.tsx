import React from 'react';
import { ModalWrapper, ModalContainer } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';

interface ModalProps {
	onNext: () => void;
	instagramId: string;
}

const FailedModal: React.FC<ModalProps> = ({ onNext, instagramId }) => {
	const handleButtonClick = () => {
		onNext();
	};

	return (
		<ModalWrapper>
			<ModalContainer>
				<div>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1 }}>
						{instagramId} 계정 연동에 실패했어요
					</StyledText>
				</div>
				<button onClick={handleButtonClick}>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1 }}>다시 시도하기</StyledText>
				</button>
			</ModalContainer>
		</ModalWrapper>
	);
};

export default FailedModal;
