import styled from 'styled-components';

export const SwiperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;

	.swiper-slide {
		height: 60%;
		max-height: 500px;
		aspect-ratio: 3 / 4;
		max-width: calc(100% - 40px);
		object-fit: cover;
		transition:
			transform 0.5s ease,
			width 0.5s ease,
			height 0.5s ease;
	}

	.swiper-slide.main-slide {
		height: 70%;
		aspect-ratio: 3 / 4;
		max-width: calc(100% - 40px);
		object-fit: cover;
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
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
	margin: 0 20px;

	&::after {
		font-size: 20px;
		color: white;
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 20px;
	left: calc(50% - 30px);
`;

export const AddButton = styled.button`
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
