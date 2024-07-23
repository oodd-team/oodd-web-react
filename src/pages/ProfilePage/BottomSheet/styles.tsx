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
	width: 100%;
	height: 100%;
	position: relative;
	top: 0;
	//bottom: 0;
	left: 0;
	//right: 0;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const SheetContent = styled.div`
	width: 100%;
	position: fixed;
	bottom: 0;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 20px;
	padding-bottom: 30px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	z-index: 1000;

	/* 애니메이션 적용 */
	animation: ${slideUp} 0.3s ease-out;

	/* 사라질 때 애니메이션 */
	&.closing {
		animation: ${slideDown} 0.3s ease-out;
	}
`;

export const HandleBar = styled.div`
	width: 50px;
	height: 4px;
	background-color: ${({ theme }) => theme.colors.gray3};
	border-radius: 3px;
	margin: 0 auto 20px auto;
`;

export const OptionButton = styled.button`
	width: 100%;
	padding: 15px;
	border: none;
	background-color: transparent;
	text-align: left;
	font-size: 16px;
	cursor: pointer;
	display: flex;
	align-items: center;

	svg {
		font-size: 1.2rem;
		padding-right: 20px;
	}

	.icon-image {
		font-size: 1.07rem;
	}
`;
