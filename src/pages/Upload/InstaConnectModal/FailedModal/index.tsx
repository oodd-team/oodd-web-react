import React from 'react';
import { ModalWrapper, ModalContent } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';
import { FailedModalProps } from '../dto';

const FailedModal: React.FC<FailedModalProps> = ({ onNext, instagramId }) => {
	const handleButtonClick = () => {
		onNext();
	};

	return (
		<ModalWrapper>
			<ModalContent>
				<div>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1 }}>
						{instagramId} 계정 연동에 실패했어요
					</StyledText>
				</div>
				<button onClick={handleButtonClick}>
					<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1 }}>다시 시도하기</StyledText>
				</button>
			</ModalContent>
		</ModalWrapper>
	);
};

export default FailedModal;
