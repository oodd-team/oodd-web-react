import styled from 'styled-components';

export const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;

export const TextContainer = styled.div`
	flex: 1;
	text-align: center;
`;

export const BackButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
`;

export const Verification = styled.div`
	color: var(--Color-black, #000);
	text-align: center;
	font-family: 'Pretendard Variable';
	font-size: 1rem; /* 16px */
	font-style: normal;
	font-weight: 300; /* light */
	line-height: 1.5; /* 150% */
`;
