import { styled } from 'styled-components';
import { StyledText } from '@components/Text/StyledText';

export const LoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	margin: 0 auto; /* 중앙 정렬 */
`;

export const StyledWelcomeWrapper = styled(StyledText)`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 5rem;
	text-align: center;
	margin-bottom: 2rem;
`;
