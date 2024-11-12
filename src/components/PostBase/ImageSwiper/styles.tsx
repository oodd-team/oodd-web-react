import styled from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;

	.post-swiper {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		position: relative;
	}

	.post-swiper .post-slide {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ImageWrapper = styled.div`
	width: 100%;

	img {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
	}
`;

export const StyledNavigation = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;

	&::after {
		font-size: 1.25rem;
		color: white;
	}
`;
