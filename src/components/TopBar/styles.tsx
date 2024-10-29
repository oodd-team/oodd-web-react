import styled from 'styled-components';
import { TopbarLayoutProps } from './dto';
import { StyledText } from '../Text/StyledText';

export const TopbarLayout = styled.header<TopbarLayoutProps>`
	display: flex;
	width: 100%;
	height: 2.75rem;
	align-items: center;
	padding: 0.5rem 1.25rem;
	${({ $withBorder, theme }) =>
		$withBorder &&
		`
		border-bottom: solid 0.0625rem ${theme.colors.gray2};
	`}
`;

export const StyledTextLayout = styled(StyledText)`
	flex-direction: column;
	align-items: center;
`;

export const LeftButton = styled.button<{ src?: string }>`
	display: ${({ src }) => (src ? 'flex' : 'none')}; /* src가 없으면 버튼 숨김 */
	width: 1.5rem;
	height: 1.5rem;
	align-items: center;
	justify-content: center;
	margin-right: 0.5rem;
	padding: 0;
	cursor: pointer;
`;

export const RightButton = styled.button<{ src?: string }>`
	display: ${({ src }) => (src ? 'flex' : 'none')}; /* src가 없으면 버튼 숨김 */
	width: 1.5rem;
	height: 1.5rem;
	align-items: center;
	justify-content: center;
	padding: 0;
	margin-left: auto;
	cursor: pointer;
`;
