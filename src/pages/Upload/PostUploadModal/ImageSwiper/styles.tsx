import styled from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;
	min-height: 380px;
	align-items: center;
	justify-content: center;

	.swiper-slide {
		//width: 227px;
		//height: 302px;
		width: 247px;
		height: 329px;
		object-fit: cover;
		transition:
			transform 0.5s ease,
			width 0.5s ease,
			height 0.5s ease;
	}

	.swiper-slide.main-slide {
		width: 247px;
		height: 329px;
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
	width: 30px;
	height: 30px;
	margin: 0 60px;

	&::after {
		font-size: 20px;
		color: white;
	}
`;

export const StyledPagination = styled.div`
	position: absolute;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 24px;
	color: white;
	background: ${({ theme }) => theme.colors.black};
	border-radius: 12px;

	.swiper-pagination-custom {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper-pagination-custom img {
		margin-right: 5px;
	}

	span {
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 13px;
	}
`;
