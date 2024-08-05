// src/pages/ProfilePage/BottomSheet/styles.tsx
import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const SheetContainer = styled.div`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const SheetContent = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 1.25rem 1.25rem 1.875rem 1.25rem;
	border-top-left-radius: 1.25rem;
	border-top-right-radius: 1.25rem;
	box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.1);
	z-index: 999;

	/* 애니메이션 적용 */
	animation: ${slideUp} 0.3s ease-out;

	/* 사라질 때 애니메이션 */
	&.closing {
		animation: ${slideDown} 0.3s ease-out;
	}
`;

export const HandleBar = styled.div`
	width: 3.125rem;
	height: 0.1875rem;
	background-color: ${({ theme }) => theme.colors.gray3};
	border-radius: 0.1875rem;
	margin: 0 auto 1.875rem auto;
`;

export const OptionButton = styled.button`
	display: flex;
	width: 100%;
	padding: 0.625rem 0;
	border: none;
	text-align: left;
	font-size: 1rem;
	cursor: pointer;
	align-items: center;
	border-bottom: solid 0.0625rem ${({ theme }) => theme.colors.gray1};

	img {
		padding-right: 1.25rem;
	}

	&:last-child {
		border-bottom: none;
	}
`;
