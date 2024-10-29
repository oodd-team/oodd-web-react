import styled from 'styled-components';
import ArrowIcon from '../../../assets/arrow/min-right.svg';

export const CardLayout = styled.div`
	background-color: #ececec;
	border-radius: 0.5rem;
	position: relative;
`;

export const ProfileContainer = styled.div`
	display: grid;
	grid-template-columns: auto 1fr auto;
	align-items: center;
	padding: 1rem 0.5rem;
`;

export const ProfileImgBox = styled.div`
	width: 3.25rem;
	height: 3.25rem;
	margin-right: 0.5rem;
	border-radius: 50%;
	cursor: pointer;
	overflow: hidden;

	box-shadow:
		0px 1px 2px 0px rgba(0, 0, 0, 0.12),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ProfileInfo = styled.div`
	gap: 0.463rem;
	cursor: pointer;
`;

export const SeeMore = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	margin-bottom: 2.13rem;
`;

export const ArrowButton = styled.button`
	width: 1.125rem;
	height: 1.125rem;
	background-image: url(${ArrowIcon});
	background-repeat: no-repeat;
	background-position: center;
`;

export const OOTDImgBox = styled.div`
	position: relative;
	width: 100%;
	min-height: 30rem;
	max-height: 33.438rem;
	bottom: 0;
	border-radius: 0 0 0.5rem 0.5rem;
	background-color: #d9d9d9;
	overflow: hidden;
	margin: 0 auto;
	display: flex;
	justify-content: center;

	.slide-image-small {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.childSwiper .swiper-pagination {
		right: 1.25rem;
	}

	.childSwiper .swiper-pagination-bullet {
		width: 0.375rem;
		height: 0.375rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.white};
		background: rgba(255, 255, 255, 0.5);
		opacity: 1;
	}

	.childSwiper .swiper-pagination-bullet-active {
		width: 0.375rem;
		height: 0.375rem;
		background-color: ${({ theme }) => theme.colors.white};
		opacity: 1;
	}

	.childSwiper .swiper-slide-small img {
		transition: none !important;
	}
`;

export const Reaction = styled.div`
	position: absolute;
	bottom: 0;
	padding: 1rem 0rem;
	display: flex;
	align-items: center;
	gap: 0.9375rem;
`;

export const Btn = styled.div`
	cursor: pointer;
	width: 3.5rem;
	height: 3.5rem;
	background-color: transparent;

	display: flex;
	justify-content: center;
	align-items: center;
`;
