import styled from 'styled-components';
import ArrowIcon from '../../../../../assets/arrow/min-right.svg';

export const CardLayout = styled.div`
	background-color: #ececec;
	border-radius: 0.5rem;
	position: relative;
	height: 100%;
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

	.row-flex {
		display: flex;
	}
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
	border-radius: 0 0 0.5rem 0.5rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	aspect-ratio: 1/1;

	.slide-image-small {
		width: 100%;
		max-width: 640px;
		height: 100%;
		object-fit: contain;
	}

	.childSwiper {
		z-index: 10;
		// align-items: stretch;
		width: 100%;
		height: 100%;
	}

	.childSwiper .swiper-slide {
		display: flex;
		justify-content: center;
	}

	.childSwiper .swiper-pagination {
		position: absolute;
		right: 1.25rem;
		z-index: 10;
		pointer-events: none; /* 마우스 이벤트 무시 */
	}

	.childSwiper .swiper-pagination-bullet {
		width: 0.375rem;
		height: 0.375rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.white};
		background: rgba(255, 255, 255, 0.5);
		opacity: 1;
		pointer-events: auto; /* 페이지네이션 클릭 가능 */
	}

	.childSwiper .swiper-pagination-bullet-active {
		width: 0.375rem;
		height: 0.375rem;
		background-color: ${({ theme }) => theme.colors.white};
		opacity: 1;
	}

	.childSwiper .slide-small {
		transition: none !important;
	}

	.blur {
		position: absolute;
		z-index: -10;
		width: 100%;
		height: 100%;
		background: rgba(177, 177, 177, 0.5);
		backdrop-filter: blur(100px);
	}
`;

export const OOTDImgBackground = styled.div<{ $src: string }>`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -20;
	background-image: url(${({ $src }) => $src});
	background-repeat: no-repeat;
	background-size: cover;
`;

export const Reaction = styled.div`
	position: absolute;
	bottom: 0;
	padding: 1rem 0rem;
	display: flex;
	align-items: center;
	gap: 0.9375rem;
	z-index: 100;
`;

export const Btn = styled.button`
	cursor: pointer;
	width: 3.5rem;
	height: 3.5rem;
	background-color: transparent;

	display: flex;
	justify-content: center;
	align-items: center;
`;
