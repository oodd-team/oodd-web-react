import styled, { keyframes, css } from 'styled-components';

export const BottomSheetWrapper = styled.div<{ $isOpenBottomSheet: boolean; $isBackgroundDimmed: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: ${(props) => (props.$isBackgroundDimmed ? 'rgba(0, 0, 0, 0.2)' : 'none')};
	animation: ${(props) =>
		props.$isOpenBottomSheet
			? css`
					${fadeIn} 0.2s ease-out forwards
				`
			: css`
					${fadeOut} 0.2s ease-out forwards
				`};
`;

export const BottomSheetLayout = styled.div<{ $isOpenBottomSheet: boolean }>`
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
	user-select: none;
	animation: ${(props) =>
		props.$isOpenBottomSheet
			? css`
					${slideUp} 0.2s ease-out forwards
				`
			: css`
					${slideDown} 0.2s ease-out forwards
				`};
`;

export const Handler = styled.hr`
	width: 3rem;
	margin: 0 auto;
	height: 0.188rem;
	background-color: ${({ theme }) => theme.colors.gray3};
	border: none;
	border-radius: 0.125rem;
	z-index: 300;
	cursor: pointer;
`;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const fadeOut = keyframes`
	from {
		opacity: 1;
		visibility: visible;
		// display: block;
	}
	to {
		opacity: 0;
		visibility: hidden;
		// display: none;
	}
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
  }
  to {
    transform: translate(-50%, 0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, 0);
		visibility: visible;
		// display: block;
  }
  to {
    transform: translate(-50%, 100%);
		visibility: hidden;
		// display: none;
  }
`;
