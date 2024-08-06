import React from 'react';
import { ButtonWrapper, Button } from './styles';
import { StyledText } from '../Text/StyledText';
import { BottomButtonProps } from './dto';

const BottomButton: React.FC<BottomButtonProps> = ({ content, onClick }) => {
	return (
		<>
			<ButtonWrapper>
				<Button onClick={onClick}>
					<StyledText $textTheme={{ style: 'button1-medium', lineHeight: 2 }}>{content}</StyledText>
				</Button>
			</ButtonWrapper>
		</>
	);
};

export default BottomButton;
