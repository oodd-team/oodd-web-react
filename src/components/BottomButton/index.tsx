import React from 'react';
import { ButtonWrapper, Button } from './styles';
import { StyledText } from '../Text/StyledText';
import { BottomButtonProps } from './dto';

const BottomButton: React.FC<BottomButtonProps> = ({ content, onClick, disabled = false }) => {
	return (
		<>
			<ButtonWrapper>
				<Button onClick={onClick} disabled={disabled}>
					<StyledText $textTheme={{ style: 'body1-regular', lineHeight: 2 }}>{content}</StyledText>
				</Button>
			</ButtonWrapper>
		</>
	);
};

export default BottomButton;
