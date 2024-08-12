import styled from 'styled-components';

export const UploadContainer = styled.div`
	flex-grow: 1;
	height: 100vh;
	width: 100%;
	position: relative;
`;

export const Header = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	width: 100%;
	max-width: 32rem;
	height: 3.75rem;
	align-items: center;
	background-color: white;
	z-index: 2;

	:nth-child(2) {
		color: ${({ theme }) => theme.colors.black};
		margin: 0 auto;
	}
`;

export const PrevButton = styled.button`
	position: absolute;
	left: 1.25rem;
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
`;
