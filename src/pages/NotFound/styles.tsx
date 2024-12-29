import { styled } from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const NotFoundContainer = styled.div`
	display: flex;
	height: 80%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 16px;
	margin: 20px;
`;

export const StyledButton = styled(StyledText)`
	display: inline-block;
	text-align: center;
	padding: 6px 16px;
	border: 1px solid ${({ theme }) => theme.colors.pink3};
	border-radius: 8px;
	cursor: pointer;
	text-decoration: none;

	&.prev {
		background-color: ${({ theme }) => theme.colors.pink3};
		color: ${({ theme }) => theme.colors.white};
	}
`;
