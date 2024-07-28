import styled from 'styled-components';

export const BottomSheetWrapper = styled.div<{ $isBackgroundDimmed: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: ${(props) => (props.$isBackgroundDimmed ? 'rgba(0, 0, 0, 0.2)' : 'none')};
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
	border-radius: 0.938rem 0.938rem 0 0;
	background-color: ${({ theme }) => theme.colors.white};
	padding-top: 1.1rem;
	z-index: 200;
`;

export const Handler = styled.hr`
	width: 3rem;
	margin: 0 auto;
	height: 0.188rem;
	background-color: ${({ theme }) => theme.colors.gray3};
	border: none;
	border-radius: 0.125rem;
	z-index: 300;
`;
