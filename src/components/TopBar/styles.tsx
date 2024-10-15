import styled from 'styled-components';
import { TopbarLayoutProps } from './dto';

export const TopbarLayout = styled.header<TopbarLayoutProps>`
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	width: 100%;
	max-width: 32rem;
	height: 2.75rem;
	justify-content: space-evenly;
	align-items: center;
	${({ $withBorder, theme }) =>
		$withBorder &&
		`
		border-bottom: solid 1px ${theme.colors.gray2};
	`}
`;

export const TextLayout = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const BackButton = styled.button`
	width: 1rem;
	height: 1rem;
	cursor: pointer;
	background-size: cover;
	background-position: center;
	margin: auto;
	margin-left: 1.25rem;
`;

export const KebabMenuButton = styled.button<{ src?: string }>`
	width: 1.4rem;
	height: 1.4rem;
	cursor: pointer;
	background: ${({ src }) => (src ? `url(${src})` : 'none')};
	background-size: cover;
	background-position: center;
	border: none;
	margin: auto;
	margin-right: 1.125rem;
	visibility: ${({ src }) => (src ? 'visible' : 'hidden')}; // src 값에 따라 버튼 visibility 설정
`;
