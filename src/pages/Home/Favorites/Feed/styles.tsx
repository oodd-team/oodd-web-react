import styled from 'styled-components';

export const FeedWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	height: auto;
	cursor: pointer;
`;

export const FeedImgBox = styled.div`
	position: relative;
	width: 100%;
	border-radius: 0.75rem;
	background-color: ${({ theme }) => theme.colors.gray1};
	height: auto;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const FeedTop = styled.div`
	top: 0.75rem;
	left: 0.75rem;
	position: absolute;
	display: flex;
	align-items: center;
`;

export const Info = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const FeedProfileImgWrapper = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FeedText = styled.div`
	margin-top: 0.75rem;
	margin-bottom: 0.4875rem;
	display: flex;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
`;
