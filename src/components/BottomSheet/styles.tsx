import styled, { keyframes, css } from 'styled-components';

export const BottomSheetWrapper = styled.div<{ $isOpenBottomSheet: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.3);
	animation: ${(props) =>
		props.$isOpenBottomSheet
			? css`
					${fadeIn} 0.2s ease-out forwards
				`
			: css`
					${fadeOut} 0.2s ease-out forwards
				`};
`;

export const BottomSheetLayout = styled.div.attrs<{ $currentTranslateY: number }>(({ $currentTranslateY }) => ({
	style: {
		transform: `translate(-50%, ${$currentTranslateY}px)`,
	},
}))<{ $isOpenBottomSheet: boolean; $currentTranslateY: number; isHandlerVisible: boolean }>`
	position: fixed;
	bottom: 0;
	flex-direction: column;
	width: 100%;
	max-width: 512px;
	left: 50%;
	border-radius: 0.938rem 0.938rem 0 0;
	background-color: ${({ theme }) => theme.colors.white};
	padding-top: ${(props) => (props.isHandlerVisible ? '1.3rem' : '0.9375rem')};
	z-index: 200;
	user-select: none;
	touch-action: none;
	animation: ${(props) =>
		props.$isOpenBottomSheet
			? css`
					${slideUp} 0.2s ease-out
				`
			: css`
					${slideDown} 0.2s ease-out forwards
				`};
`;

export const Handler = styled.hr`
	width: 3rem;
	margin: 0 auto;
	height: 0.25rem;
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
	}
	to {
		opacity: 0;
		visibility: hidden;
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
  to {
    transform: translate(-50%, 100%);
		visibility: hidden;
  }
`;
