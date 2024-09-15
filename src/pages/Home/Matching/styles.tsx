import styled from 'styled-components';

export const MatchingContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 6.25rem;

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

export const Like = styled.div`
	margin-top: 1.313rem;
	margin-left: 1.25rem;
	width: auto;
	height: 1rem;
`;
