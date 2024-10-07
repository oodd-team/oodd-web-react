import styled from 'styled-components';
import { TopbarLayoutProps } from './dto';

export const TopbarLayout = styled.header<TopbarLayoutProps>`
	background-color: ${({ theme }) => theme.colors.white};
	display: flex;
	width: 100%;
	max-width: 32rem;
	height: 2.75rem;
	align-items: center;
	padding: 0.5rem 1.25rem;
	${({ $withBorder, theme }) =>
		$withBorder &&
		`
		border-bottom: solid 1px ${theme.colors.gray2};
	`}
`;

export const TextLayout = styled.section`
	flex-direction: column;
	align-items: center;
`;

export const BackButton = styled.button`
	padding: 0.4375rem 0.625rem;
	margin-right: 0.5rem;
	cursor: pointer;
	background-size: cover;
	background-position: center;
`;

export const KebabMenuButton = styled.button<{ src?: string }>`
	padding: 10px;
	cursor: pointer;
	background: ${({ src }) => (src ? `url(${src})` : 'none')};
	background-size: cover;
	background-position: center;
	border: none;

	img {
		width: 1.125rem; /* 버튼 크기에 맞게 이미지 크기 조정 */
		height: 1.125rem; /* 버튼 크기에 맞게 이미지 크기 조정 */
		visibility: ${({ src }) => (src ? 'visible' : 'hidden')}; // src 값에 따라 버튼 visibility 설정
	}
`;
