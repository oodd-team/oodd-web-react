import styled from 'styled-components';
import { TopbarLayoutProps } from './dto';

export const TopbarLayout = styled.div<TopbarLayoutProps>`
	position: fixed;
	top: 0;
	left: 0;
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	width: 100%;
	max-width: 32rem;
	//height: 2.75rem;
	height: 3.75rem;
	justify-content: space-evenly;
	align-items: center;
	${({ $withBorder, theme }) =>
		$withBorder &&
		`
		border-bottom: solid 1px ${theme.colors.gray2};
	`}
`;

export const TextLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const BackButton = styled.img`
	width: 1.4rem;
	height: 1.4rem;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-left: 1.25rem;
`;

export const KebabMenuButton = styled.img`
	width: 1.4rem;
	height: 1.4rem;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-right: 1.125rem;
	visibility: ${(props) => (props.src ? 'visible' : 'hidden')};
`;
