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
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const SheetContent = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.white};
	padding: 20px 20px 30px 20px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	z-index: 999;

	/* 애니메이션 적용 */
	animation: ${slideUp} 0.3s ease-out;

	/* 사라질 때 애니메이션 */
	&.closing {
		animation: ${slideDown} 0.3s ease-out;
	}
`;

export const HandleBar = styled.div`
	width: 50px;
	height: 3px;
	background-color: ${({ theme }) => theme.colors.gray3};
	border-radius: 3px;
	margin: 0 auto 30px auto;
`;

export const OptionButton = styled.button`
	display: flex;
	width: 100%;
	padding: 10px 0;
	border: none;
	text-align: left;
	font-size: 16px;
	cursor: pointer;
	align-items: center;
	border-bottom: solid 1px ${({ theme }) => theme.colors.gray1};

	img {
		padding-right: 20px;
	}

	&:last-child {
		border-bottom: none;
	}
`;
