import styled, { css } from 'styled-components';

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

export const Dot = styled.hr<{ $index: number; $dotIndex: number }>`
	width: 7px;
	height: 7px;
	z-index: 200;
	border-radius: 50%;
	border: none;
	background-color: ${({ theme }) => theme.colors.gray2};
	transition:
		opacity 0.3s,
		transform 0.3s;

	// 점이 활성화되었을 때의 스타일
	${({ $index, $dotIndex }) => css`
		opacity: ${$dotIndex % 3 === $index ? 1 : 0.5};
		transform: translateY(${$dotIndex % 3 === $index ? -3 : 0}px);
	`}
`;
