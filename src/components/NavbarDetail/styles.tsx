import styled from 'styled-components';

export const Nav = styled.nav`
	max-width: 32rem; /* 512px */
	height: 2.75rem; /* 44px */
	padding: 0.375rem 1.125rem; /* 6px 18px */
	display: flex;
`;

export const TextContainer = styled.div`
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

export const UserID = styled.div`
	color: var(--Color-black50, rgba(0, 0, 0, 0.5));
	text-align: center;
	font-family: 'Pretendard Variable';
	font-size: 0.8125rem; /* 13px */
	font-weight: 300;
	line-height: normal;
`;

export const OOTD = styled.div`
	color: var(--Color-black, #000);
	font-family: 'Pretendard Variable';
	font-size: 1rem; /* 16px */
	font-style: normal;
	font-weight: 300;
	line-height: 1.5rem; /* 24px */
	justify-content: center;
`;

export const BackButton = styled.button`
	background: none;
	border: none;
	position: absolute;
	top: 1.25rem; /* 20px */
	left: 1.25rem; /* 20px */
	padding: 0;
	height: 2.75rem; /* 44px */
	cursor: pointer;
`;
