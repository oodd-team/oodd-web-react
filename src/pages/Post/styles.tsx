import styled from 'styled-components';

// PostTopBar

export const PostTopBarContainer = styled.div`
	width: 100%;
	max-width: 32rem;
	height: 2.75rem;
	display: flex;
	justify-content: space-between;
	background-color: #ffffff;
	z-index: 10;
	align-items: center;
	position: fixed;
`;

export const BackIcon = styled.img`
	width: 0.5625rem;
	height: 1.125rem;
	margin-left: 1.3125rem;
	cursor: pointer;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
	}
`;

export const MidWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.125rem;
	margin-top: 0.25rem;
`;

export const RightSpace = styled.div`
	width: 0.5625rem;
	height: 1.125rem;
	margin-right: 1.3125rem;
`;

// Post

export const PostInfo = styled.div`
	display: flex;
	margin-top: 3.375rem;
	justify-content: space-between;
	align-items: center;
`;

export const UserInfo = styled.div`
	display: flex;
	align-items: center;
`;

export const UserProfile = styled.div`
	width: 2.25rem;
	height: 2.25rem;
	overflow: hidden;
	margin: 0 0.75rem 0 1.25rem;
	img {
		width: 100%;
		height: 100%;
	}
`;

export const UserName = styled.div``;
export const MoreBtn = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1.25rem;
`;

export const PostText = styled.span`
	margin: 0 1.25rem 0.5rem;
	margin-top: 0.75rem;
	margin-bottom: 0.4875rem;
	display: flex;
	align-items: center;
	word-wrap: break-word;
	word-break: break-all;
`;

export const PostImg = styled.img``;
