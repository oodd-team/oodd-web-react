import styled, { keyframes } from 'styled-components';

// 점이 활성화될 때의 애니메이션 (Y축으로 움직임)
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-2px);
    opacity: 1;
  }
`;

export const LoadingWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const DotBox = styled.div`
	display: flex;
	width: 50px;
	margin: auto;
`;

export const Dot = styled.hr<{ $index: number }>`
	width: 8px;
	height: 8px;
	z-index: 200;
	border-radius: 50%;
	border: none;
	background-color: ${({ theme }) => theme.colors.gray2};

	// 각 점에 대해 딜레이를 적용하여 순차적으로 애니메이션을 시작
	animation: ${bounce} 0.6s ease-in-out infinite;
	animation-delay: ${({ $index }) => $index * 0.2}s;
`;
