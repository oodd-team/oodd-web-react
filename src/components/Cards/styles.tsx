import styled from 'styled-components';

export const CardsContainer = styled.div`
	display: flex;
	flex-direction: column;

	.parentSwiper .swiper-slide {
		transition: transform 0.3s;
		transform: scale(0.95);
	}

	.parentSwiper .swiper-slide-active {
		transform: scale(1);
	}

	.parentSwiper .swiper-slide-next,
	.parentSwiper .swiper-slide-prev {
		transform: scale(0.95);
	}

	.parentSwiper .swiper-container {
		margin-left: 0.9375rem;
	}
`;
