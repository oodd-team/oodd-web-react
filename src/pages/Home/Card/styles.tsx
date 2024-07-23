import styled from 'styled-components';

export const CardLayout = styled.div`
	margin: 10px 20px 0;
	background-color: black;
	border-radius: 12px;
	height: 535px;
	position: relative;
`;

export const ProfileBox = styled.div`
	height: 71px;
	display: flex;
	align-items: center;
`;

export const ProfileImgBox = styled.div`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	margin-left: 16px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ProfileInfo = styled.div`
	gap: 7.4px;
	margin-left: 16px;
`;

export const SeeMore = styled.div`
	margin: 0 20.5px 0 auto;
`;

export const OOTDImgBox = styled.div`
	width: 100%;
	height: 464px;
	bottom: 0;
	border-radius: 0 0 12px 12px;
	background-color: aliceblue;
	overflow: hidden;
	margin: 0 auto;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;
