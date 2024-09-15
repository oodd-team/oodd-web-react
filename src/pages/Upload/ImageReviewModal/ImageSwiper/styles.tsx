import styled from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;
	width: 100%;
	height: calc(100% - 10rem);
	align-items: center;
	justify-content: center;

	.review-swiper .swiper-wrapper {
		height: 29.1875rem;
		width: 100%;
		max-height: 70%;
	}

	.review-swiper .swiper-slide {
		width: 21.875rem;
		max-width: calc(100% - 2.5rem);
		aspect-ratio: 3 / 4;
		height: auto;
		object-fit: cover;
		transition: transform 0.3s;
		transform: scale(0.95);
	}

	.review-swiper .swiper-slide-active {
		transform: scale(1);
	}

	.review-swiper .swiper-slide-next,
	.review-swiper .swiper-slide-prev {
		transform: scale(0.95);
	}

	.review-swiper .add-btn-box {
		display: flex;
		width: 21.875rem;
		max-width: calc(100% - 2.5rem);
		height: 100%;
	}
`;

export const ImageWrapper = styled.div`
	position: relative;
	height: 100%;

	img {
		height: 100%;
		width: auto;
		width: 100%;
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
	width: 4.375rem;
	height: 4.375rem;
	padding: 1.25rem;

	&::after {
		font-size: 1.25rem;
		color: white;
	}

	&.swiper-button-prev {
		margin: 0 0 0 max(calc((100% - 21.875rem) / 2 - 1.25rem), 0rem);
	}

	&.swiper-button-next {
		margin: 0 max(calc((100% - 21.875rem) / 2) - 1.25rem, 0rem) 0 0;
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 1.25rem;
	left: 50%;
	transform: translateX(-50%);
	height: 3.75rem;
	width: 3.75rem;
	padding: 0;
`;

export const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	color: #999;
	font-size: 1.875rem;
	width: 6.25rem;
	height: 6.25rem;
	margin: auto;

	&:hover {
		border-color: #666;
		color: #666;
	}
`;

export const HiddenFileInput = styled.input`
	display: none;
`;
