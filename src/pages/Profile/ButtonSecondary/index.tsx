import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import { StyledText } from '@components/Text/StyledText';

import { Button } from './styles';

const ButtonSecondary: React.FC = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/profile/edit');
	};

	return (
		<Button onClick={handleClick}>
			<StyledText $textTheme={{ style: 'body2-bold' }} color={theme.colors.brand.primary}>
				프로필 수정
			</StyledText>
		</Button>
	);
};

export default ButtonSecondary;
