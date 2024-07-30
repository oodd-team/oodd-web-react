import styled from 'styled-components';

export const FeedWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	width: 100%;
	margin-bottom: 1.5rem;
	height: auto;
`;

export const FeedTop = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Info = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	cursor: pointer;
`;

export const FeedProfileImgWrapper = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FeedBottom = styled.div`
	cursor: pointer;
`;

export const FeedText = styled.div`
	margin-top: 0.75rem;
	margin-bottom: 0.4875rem;
	display: flex;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
`;

export const FeedImgBox = styled.div`
	position: relative;
	width: 100%;
	border-radius: 0.75rem;
	background-color: ${({ theme }) => theme.colors.gray1};
	height: auto;
	overflow: hidden;
	display: flex;
	justify-content: center;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const ReactionWrapper = styled.div`
	position: absolute;
	width: 12.75rem;
	height: 6.75rem;
	bottom: 1.125rem;
	gap: 0.5rem;
	display: flex;
	flex-direction: column;
`;

export const Reaction = styled.div`
	display: flex;
	justify-content: space-between;
	width: 12.75rem;
	height: 5rem;
	gap: 0.75rem;
`;

export const Btn = styled.div`
	cursor: pointer;
	width: 3.75rem;
	height: 3.75rem;
	background-color: rgba(255, 255, 255, 0.3);
	border: 0.0875rem solid ${({ theme }) => theme.colors.white};
	border-radius: 50%;
	backdrop-filter: blur(0.3125rem);
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 2rem;
		height: 2rem;
	}
`;

export const Comment = styled.div`
	display: flex;
	justify-content: space-between;
	width: 12.75rem;
	height: 5rem;
	gap: 0.75rem;
`;

export const CommentBtn = styled.div`
	cursor: pointer;
	width: 12.75rem;
	height: 2.5rem;
	background-color: rgba(255, 255, 255, 0.3);
	border: 0.0875rem solid ${({ theme }) => theme.colors.white};
	border-radius: 1.25rem;
	backdrop-filter: blur(0.3125rem);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	gap: 0.5rem;

	img {
		width: 1.5rem;
		height: 1.5rem;
	}
`;
