import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './styles';
import { StyledText } from '@components/Text/StyledText';
import theme from '@styles/theme';

const ButtonSecondary: React.FC = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/profile/edit');
	};

	return (
		<Button onClick={handleClick}>
			<StyledText $textTheme={{ style: 'button1-regular', lineHeight: 2 }} color={theme.colors.gradient}>
				프로필 수정
			</StyledText>
		</Button>
	);
};

export default ButtonSecondary;
