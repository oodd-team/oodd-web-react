import { styled }, { keyframes } from 'styled-components';

const bounceGroup = keyframes`
  0%, 50%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  25% {
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
	width: 45px;
	margin: auto;
`;

export const Dot = styled.hr<{ $index: number }>`
	width: 7px;
	height: 7px;
	z-index: 200;
	border-radius: 50%;
	border: none;
	background-color: ${({ theme }) => theme.colors.gray[300]};

	// 각 점에 대해 딜레이를 적용하여 순차적으로 애니메이션을 시작
	animation: ${bounceGroup} 2s ease-in-out infinite;
	animation-delay: ${({ $index }) => `${($index % 3) * 0.2}s`};
`;
