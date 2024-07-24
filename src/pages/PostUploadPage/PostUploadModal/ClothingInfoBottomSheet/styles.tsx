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

	.input_container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 10px 20px;
		height: 60px;

		div {
			margin-left: 10px;
			color: ${({ theme }) => theme.colors.black};
			cursor: pointer;
		}
	}
`;

export const Input = styled.input`
	flex-grow: 1;
	height: 40px;
	padding: 0 10px;
	text-align: left;
	font-size: 16px;
	background-color: ${({ theme }) => theme.colors.gray1};
	border: solid 1px ${({ theme }) => theme.colors.gray2};
	border-radius: 3px;
	//cursor: pointer;

	&:focus {
		outline: none;
	}
`;

export const SearchResultContainer = styled.div`
	width: 100%;
	border-top: solid 1px ${({ theme }) => theme.colors.gray2};
`;
