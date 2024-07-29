import styled from 'styled-components';

export const CardLayout = styled.div`
	margin: 0.625rem 1.25rem 0;
	background-color: black;
	border-radius: 0.75rem;
	max-height: 33.438rem;
	position: relative;
`;

export const ProfileBox = styled.div`
	height: 4.438rem;
	display: flex;
	align-items: center;
`;

export const ProfileImgBox = styled.div`
	width: 2.625rem;
	height: 2.625rem;
	border-radius: 50%;
	margin-left: 1rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ProfileInfo = styled.div`
	gap: 0.463rem;
	margin-left: 1rem;
`;

export const SeeMore = styled.div`
	margin: 0 1.281rem 0 auto;
`;

export const OOTDImgBox = styled.div`
	width: 100%;
	max-height: 33.438rem;
	bottom: 0;
	border-radius: 0 0 0.75rem 0.75rem;
	background-color: aliceblue;
	overflow: hidden;
	margin: 0 auto;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
