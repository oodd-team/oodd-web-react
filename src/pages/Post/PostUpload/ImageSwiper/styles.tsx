import { styled } from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;
	//align-items: center;
	//justify-content: center;
	min-height: 23.75rem;

	.upload-swiper {
		height: 23.75rem;
		width: 100%;
		position: relative;
	}

	.upload-swiper .swiper-wrapper {
		display: flex;
		align-items: center;
	}

	.upload-swiper .swiper-slide {
		width: 16.45rem;
		height: 20.5625rem;
		object-fit: cover;
		transition: transform 0.3s;
		transform: scale(0.95);
	}

	.upload-swiper .swiper-slide-active {
		transform: scale(1);
	}

	.upload-swiper .swiper-slide-next,
	.upload-swiper .swiper-slide-prev {
		transform: scale(0.95);
	}
`;

export const ImageWrapper = styled.div`
	height: 100%;

	img {
		border-radius: 8px;
		height: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}
`;

export const StyledNavigation = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	color: white;
	width: 3.125rem;
	height: 3.125rem;
	padding: 0.625rem;

	&::after {
		font-size: 1.25rem;
		color: white;
	}

	&.swiper-button-prev {
		margin: 0 0 0 max(calc((100% - 15.4375rem) / 2 - 1.25rem), 3.125rem);
	}

	&.swiper-button-next {
		margin: 0 max(calc((100% - 15.4375rem) / 2 - 1.25rem), 3.125rem) 0 0;
	}
`;

export const StyledPagination = styled.div`
	position: absolute;
	top: 2.5rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 65px;
	height: 34px;
	color: white;
	background: ${({ theme }) => theme.colors.brand.gradient};
	border-radius: 17px;

	.swiper-pagination-custom {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-pagination-custom img {
		margin-right: 0.3125rem;
	}

	span {
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 0.8125rem;
	}
`;
