import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: white;
	width: 100%;
	height: 100%;
`;

export const PageOverlay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: white;
	max-width: 512px;
	height: 100%;
	z-index: 20;
`;
