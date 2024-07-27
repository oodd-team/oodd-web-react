import styled from 'styled-components';

export const BottomSheetWrapper = styled.div<{ $shadow: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: ${(props) => (props.$shadow ? 'rgba(0, 0, 0, 0.2)' : 'none')};
`;

export const BottomSheetLayout = styled.div`
	position: fixed;
	bottom: 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 32rem;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 15px 15px 0 0;
	background-color: white;
	padding-top: 20px;
	z-index: 200;
`;

export const Handler = styled.hr`
	width: 50px;
	margin: 0 auto;
	height: 3px;
	background-color: #7b7b7b;
	border: none;
	border-radius: 2px;
	z-index: 300;
`;
