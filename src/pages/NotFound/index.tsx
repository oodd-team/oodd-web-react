import { useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import { NotFoundContainer, TextContainer, ButtonContainer, StyledButton } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<OODDFrame>
			<NotFoundContainer>
				<TextContainer>
					<StyledText $textTheme={{ style: 'display1-bold' }} color={theme.colors.pink3}>
						404 ERROR
					</StyledText>
					<StyledText $textTheme={{ style: 'headline2-medium' }}>죄송합니다. 페이지를 찾을 수 없습니다.</StyledText>
					<div>
						<StyledText $textTheme={{ style: 'body2-regular' }}>페이지의 주소가 잘못 입력되었거나,</StyledText>
						<StyledText $textTheme={{ style: 'body2-regular' }}>
							요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
						</StyledText>
					</div>
				</TextContainer>
				<ButtonContainer>
					<StyledButton as="a" href="/" $textTheme={{ style: 'body2-regular' }} color={theme.colors.pink3}>
						메인으로
					</StyledButton>
					<StyledButton
						as="button"
						onClick={() => navigate(-1)}
						className="prev"
						$textTheme={{ style: 'body2-regular' }}
						color={theme.colors.white}
					>
						이전으로
					</StyledButton>
				</ButtonContainer>
			</NotFoundContainer>
		</OODDFrame>
	);
};

export default NotFound;
