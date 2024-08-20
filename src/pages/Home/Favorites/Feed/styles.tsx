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
	overflow: hidden;
	aspect-ratio: 173 / 230;

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
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const FeedText = styled.div`
	margin-top: 0.75rem;
	margin-bottom: 0.4875rem;
	display: flex;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
`;

export const Reaction = styled.div`
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	height: 2rem;
	bottom: 1.25rem;
	gap: 0.5rem;
	display: flex;
`;

export const CheckedBtn = styled.div`
	cursor: pointer;
	width: 2rem;
	height: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
	}
`;

export const Btn = styled.div`
	cursor: pointer;
	width: 2rem;
	height: 2rem;
	background-color: rgba(255, 255, 255, 0.3);
	border: 0.0375rem solid ${({ theme }) => theme.colors.white};
	border-radius: 50%;
	backdrop-filter: blur(0.3125rem);
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 1.25rem;
		height: 1.25rem;
	}
`;
