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

export const SheetWrapper = styled.div`
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
	height: calc(100% - 3.75rem);
	background-color: ${({ theme }) => theme.colors.white};
	border-top-left-radius: 0.625rem;
	border-top-right-radius: 0.625rem;
	box-shadow: 0 -0.125rem 0.625rem rgba(0, 0, 0, 0.1);
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
		padding: 0.625rem 1.25rem;
		height: 3.75rem;
		border-bottom: solid 0.0625rem ${({ theme }) => theme.colors.gray1};

		div {
			padding: 1.25rem 0 1.25rem 1.25rem;
			color: ${({ theme }) => theme.colors.black};
			cursor: pointer;
		}
	}
`;

export const Input = styled.input`
	flex-grow: 1;
	height: 2.5rem;
	padding: 0 0.9375rem;
	text-align: left;
	font-size: 1rem;
	background-color: ${({ theme }) => theme.colors.gray1};
	border: 0.0625rem solid ${({ theme }) => theme.colors.gray2};
	border-radius: 0.3125rem;

	&:focus {
		outline: none;
	}

	::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Firefox */
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Internet Explorer 10-11 */
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Edge */
	&::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Safari */
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}
`;

export const SearchResultList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: calc(100% - 3.75rem);
	padding: 0.9375rem;
	overflow-y: auto;

	.total {
		color: ${({ theme }) => theme.colors.gray3};
	}

	.ref {
		min-height: 1.25rem;
		width: 100%;
	}
`;

export const SearchResultItem = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 5.625rem;
	border-bottom: solid 0.0625rem ${({ theme }) => theme.colors.gray1};
	padding: 0.9375rem 0;
	cursor: pointer;

	img {
		width: 3.75rem;
		height: 3.75rem;
		border-radius: 0.3125rem;
		aspect-ratio: 1 / 1;
		object-fit: cover;
	}

	.infoContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 0.9375rem;
		height: 100%;
		overflow-y: hidden;
	}

	.brand {
		margin-right: auto;
	}

	.detail {
		margin-right: auto;
		color: ${({ theme }) => theme.colors.black};
	}

	&:last-child {
		border-bottom: none;
	}
`;

export const Loader = styled.div`
	display: flex;
	width: 100%;
	height: 1.875rem;
	align-items: center;
	justify-content: center;
`;
