import styled from 'styled-components';

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
