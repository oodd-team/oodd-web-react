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
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

export const SheetContent = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: calc(100% - 60px);
	background-color: ${({ theme }) => theme.colors.white};
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	z-index: 999;

	/* 애니메이션 적용 */
	animation: ${slideUp} 0.3s ease-out;

	/* 사라질 때 애니메이션 */
	&.closing {
		animation: ${slideDown} 0.3s ease-out;
	}
	:first-child {
		display: flex;
		flex-direction: row;
		align-items: center;
		span {
			margin: 10px 15px 10px 0;
			font-size: 16px;
			color: ${({ theme }) => theme.colors.gray4};
			cursor: pointer;
		}
	}
`;

export const Input = styled.input`
	width: calc(100% - 85px);
	padding: 15px;
	margin: 10px 15px 10px 20px;
	text-align: left;
	font-size: 16px;
	background-color: ${({ theme }) => theme.colors.gray1};
	border: solid 1px ${({ theme }) => theme.colors.gray2};
	border-radius: 5px;
	//cursor: pointer;
	margin-bottom: 10px;

	&:focus {
		outline: none;
	}
`;

export const SearchResultContainer = styled.div`
	width: 100%;
	border-top: solid 1px ${({ theme }) => theme.colors.gray2};
`;
