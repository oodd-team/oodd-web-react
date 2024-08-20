import styled from 'styled-components';

// PostTopBar

export const PostTopBarContainer = styled.div`
	width: 100%;
	max-width: 32rem;
	height: 2.75rem;
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	z-index: 10;
	align-items: center;
	position: fixed;
`;

export const BackIcon = styled.img`
	width: 0.5625rem;
	height: 1.125rem;
	margin-left: 1.3125rem;
	cursor: pointer;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
	}
`;

export const MidWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.125rem;
	margin-top: 0.25rem;
`;

export const RightSpace = styled.div`
	width: 0.5625rem;
	height: 1.125rem;
	margin-right: 1.3125rem;
`;

// Post

export const PostWrapper = styled.div`
	width: 100%;
	height: auto;
`;

export const PostInfo = styled.div`
	display: flex;
	margin-top: 3.375rem;
	justify-content: space-between;
	align-items: center;
`;

export const UserInfo = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;

export const UserProfile = styled.div`
	width: 2.25rem;
	height: 2.25rem;
	overflow: hidden;
	margin: 0 0.75rem 0 1.25rem;
	img {
		width: 100%;
		height: 100%;
	}
`;

export const UserName = styled.div``;

export const MoreBtn = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1.25rem;
	cursor: pointer;
`;

export const PostText = styled.span`
	margin: 0 1.25rem 0.5rem;
	margin-top: 0.75rem;
	margin-bottom: 0.4875rem;
	display: flex;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
`;

export const PostImg = styled.div`
	.postSwiper .swiper-pagination {
		position: absolute;
		top: 0.75rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		pointer-events: none;
	}

	.postSwiper .swiper-pagination-bullet {
		width: 0.375rem;
		height: 0.375rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.white};
		background: rgba(255, 255, 255, 0.5);
		opacity: 1;
		pointer-events: auto;
	}

	.postSwiper .swiper-pagination-bullet-active {
		width: 0.375rem;
		height: 0.375rem;
		background-color: ${({ theme }) => theme.colors.white};
		opacity: 1;
	}

	.postSwiper .swiper-button-prev:after,
	.postSwiper .swiper-button-next:after {
		text-shadow: 0rem 0rem 0.25rem rgba(0, 0, 0, 0.25);
		color: ${({ theme }) => theme.colors.white} !important;
		font-size: 1.5rem !important;
	}
`;

export const Products = styled.div`
	margin-top: 0.6687rem;
	margin-left: 1.25rem;
	margin-bottom: 4rem;
	display: flex;
	overflow-x: auto;
	white-space: nowrap;
	scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
	-ms-overflow-style: none; /* Internet Explorer에서 스크롤바 숨기기 */

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
	}
`;

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	textarea {
		display: block;
		width: calc(100% - 3rem);
		height: 5.75rem;
		border-radius: 0.125rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.gray3};
		margin-bottom: 5.875rem;
		z-index: 2;
		margin-top: -3.75rem;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		font-family: 'Pretendard Variable';
		font-size: 1rem;
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		color: ${({ theme }) => theme.colors.black};
		resize: none;
	}
`;

// export const InputWrapper = styled.textarea`
// 	display: block;
// 	width: calc(100% - 3rem);
// 	height: 5.75rem;
// 	border-radius: 0.125rem;
// 	border: 0.0625rem solid ${({ theme }) => theme.colors.gray3};
// 	margin-bottom: 5.875rem;
// 	z-index: 2;
// 	margin-top: -3.75rem;
// 	outline: none;
// 	padding: 0.8125rem 0.9375rem;
// 	font-family: 'Pretendard Variable';
// 	font-size: 1rem;
// 	font-style: normal;
// 	font-weight: 300;
// 	line-height: 150%;
// 	color: ${({ theme }) => theme.colors.black};
// 	resize: none;

// 	&::placeholder {
// 		color: ${({ theme }) => theme.colors.gray3};
// 	}
// `;

// ProductCard

export const ProductCardContainer = styled.div`
	width: 15.3125rem;
	height: 4.5rem;
	border-radius: 0.1875rem;
	box-shadow: 0 0 0 0.0625rem ${({ theme }) => theme.colors.gray3} inset;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	justify-content: space-between;
	margin-right: 0.75rem;
	cursor: pointer;
`;

export const ProductLeft = styled.div`
	display: flex;
	align-items: center;
`;

export const ProductImg = styled.img`
	width: 3.5rem;
	height: 3.5rem;
	margin: 0.5rem;
`;

export const ProductInfo = styled.div``;
export const NextBtn = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	overflow: hidden;
	margin-right: 0.375rem;
	img {
		width: 100%;
		height: 100%;
	}
`;
