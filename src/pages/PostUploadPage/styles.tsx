import styled from 'styled-components';

export const Overlay = styled.div`
	display: flex;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	justify-content: center;
	align-items: center;
	background: white;
`;

export const PageOverlay = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	max-width: 512px;
	height: 100%;
	justify-content: center;
	align-items: center;
	background: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
