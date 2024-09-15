import styled from 'styled-components';

export const TooltipWrapper = styled.div`
	background-color: rgb(0, 0, 0, 0.3);
	position: fixed;
	display: inline-block;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
`;

export const TooltipLayout = styled.div<{ $top?: number }>`
	background-color: ${({ theme }) => theme.colors.white};
	position: fixed;
	display: flex;
	left: 50%;
	${({ $top }) => ($top ? `top: ${$top}px` : 'bottom: 13.5rem')};
	transform: translate(-50%, -50%);
	border-radius: 0.625rem;
	width: 13rem;
	height: 4rem;
	z-index: 200;
`;

export const TooltipArrow = styled.div<{ $arrow: string }>`
	position: absolute;
	bottom: -11px;
	left: ${({ $arrow }) => `${$arrow}`};
	transform: translateX(-50%);
	border-width: 15px 8px 0 8px;
	border-style: solid;
	border-color: ${({ theme }) => theme.colors.white} transparent transparent transparent;
`;

export const TooltipContentBox = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
