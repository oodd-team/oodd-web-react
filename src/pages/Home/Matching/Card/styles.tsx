import styled from 'styled-components';

export const CardLayout = styled.div`
	margin: 0.625rem 1.25rem 0;
	background-color: black;
	border-radius: 0.75rem;
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
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ProfileInfo = styled.div`
	gap: 0.463rem;
	margin-left: 1rem;
	cursor: pointer;
`;

export const SeeMore = styled.div`
	margin: 0 1.281rem 0 auto;
	cursor: pointer;
`;

export const OOTDImgBox = styled.div`
	position: relative;
	width: 100%;
	max-height: 33.438rem;
	bottom: 0;
	border-radius: 0 0 0.75rem 0.75rem;
	background-color: ${({ theme }) => theme.colors.gray1};
	overflow: hidden;
	margin: 0 auto;
	display: flex;
	justify-content: center;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Reaction = styled.div`
	position: absolute;
	width: 188px;
	height: 80px;
	bottom: 32px;
	gap: 28px;
	display: flex;
`;

export const Btn = styled.div`
	cursor: pointer;
	width: 80px;
	height: 80px;
	background-color: rgba(255, 255, 255, 0.3);
	border: 1.4px solid ${({ theme }) => theme.colors.white};
	border-radius: 50%;
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 2rem;
		height: 2rem;
	}
`;
