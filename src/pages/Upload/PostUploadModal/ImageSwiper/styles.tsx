import styled from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;
	min-height: 23.75rem;
	align-items: center;
	justify-content: center;

	.swiper-slide {
		//width: 14.1875rem;
		//height: 18.875rem;
		width: 15.4375rem;
		height: 20.5625rem;
		object-fit: cover;
		transition:
			transform 0.5s ease,
			width 0.5s ease,
			height 0.5s ease;
	}

	.swiper-slide.main-slide {
		width: 15.4375rem;
		height: 20.5625rem;
		object-fit: cover;
	}
`;

export const ImageWrapper = styled.div`
	position: relative;
	height: 100%;

	img {
		height: 100%;
		aspect-ratio: 3 / 4;
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
	top: 0.625rem;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3.75rem;
	height: 1.5rem;
	color: white;
	background: ${({ theme }) => theme.colors.black};
	border-radius: 0.75rem;

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
