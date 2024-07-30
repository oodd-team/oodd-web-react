import styled from 'styled-components';

export const PostContainer = styled.div`
	width: 50%; /* 포스트 크기를 약간 키움 */
	max-width: 32rem; /* 512px */
	height: auto; /* 비율 유지를 위해 auto로 설정 */
	flex-shrink: 0; /* 포스트가 줄어들지 않도록 설정 */
	margin: 0; /* 간격을 없앰 */
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
`;

export const ImageWrapper = styled.div`
	width: 100%;
	padding-top: 150%; /* 3:2 비율을 유지 */
	position: relative;
`;

export const Image = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

export const IconContainer = styled.div`
	position: absolute;
	bottom: 0.625rem; /* 10px */
	right: 0.625rem; /* 10px */
	display: flex;
	align-items: center;
`;

export const Icon = styled.div`
	display: flex;
	align-items: center;
	margin-left: 1.25rem; /* 20px */

	svg {
		margin-right: 0.3125rem; /* 5px */
	}

	span {
		color: white;
		font-size: 0.875rem; /* 14px */
	}
`;

export const PinIcon = styled.img`
	position: absolute;
	top: 0.625rem; /* 10px */
	left: 0.625rem; /* 10px */
	width: 1.25rem; /* 20px */
	height: 1.25rem; /* 20px */
	z-index: 1;
`;
