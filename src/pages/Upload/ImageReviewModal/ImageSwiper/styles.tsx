import styled from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;
	width: 100%;
	height: calc(100% - 160px);
	align-items: center;
	justify-content: center;

	.swiper-wrapper {
		height: 467px;
		width: 100%;
		max-height: 70%;
	}

	.swiper-slide {
		//height: 423px;
		//width: 318px;
		//height: 100%;
		width: 350px;
		max-width: calc(100% - 40px);
		aspect-ratio: 3 / 4;
		height: auto;
		object-fit: cover;
		//margin-top: auto;
		//margin-bottom: auto;

		transition:
			transform 0.5s ease,
			width 0.5s ease,
			height 0.5s ease;
	}

	.swiper-slide.main-slide {
		//height: 100%;
		width: 350px;
		max-width: calc(100% - 40px);
		aspect-ratio: 3 / 4;
		height: auto;
		object-fit: cover;
	}

	.add-btn-box {
		display: flex;
		width: 350px;
		max-width: calc(100% - 40px);
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
	width: 70px;
	height: 70px;
	padding: 20px;

	&::after {
		font-size: 20px;
		color: white;
	}

	&.swiper-button-prev {
		margin: 0 0 0 max(calc((100% - 350px) / 2 - 20px), 0px);
	}

	&.swiper-button-next {
		margin: 0 max(calc((100% - 350px) / 2) - 20px, 0px) 0 0;
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	height: 60px;
	width: 60px;
	padding: 0;
`;

export const AddButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background: none;
	color: #999;
	font-size: 30px;
	width: 100px;
	height: 100px;
	margin: auto;

	&:hover {
		border-color: #666;
		color: #666;
	}
`;

export const HiddenFileInput = styled.input`
	display: none;
`;
