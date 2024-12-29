import { StyledText } from '@components/Text/StyledText';

import type { BottomButtonProps } from './dto';

import { ButtonWrapper, Button } from './styles';

const BottomButton: React.FC<BottomButtonProps> = ({ content, onClick, disabled = false }) => {
	return (
		<ButtonWrapper>
			<Button onClick={onClick} disabled={disabled}>
				<StyledText $textTheme={{ style: 'body1-regular', lineHeight: 2 }}>{content}</StyledText>
			</Button>
		</ButtonWrapper>
	);
};

export default BottomButton;
