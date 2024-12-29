import { styled } from 'styled-components';

import { BigUserProfile } from '../styles';

export const CommentItem = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
`;

export const StyledBigUserProfile = styled(BigUserProfile)`
	width: 36px;
	height: 36px;
	margin-bottom: auto;
`;

export const CommentContent = styled.div`
	margin-left: 8px;
	display: flex;
	flex-direction: column;
	max-width: calc(100% - 44px);
`;

export const RightContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	flex-direction: row;
	position: absolute;
	top: 0;
	right: 0;
`;

export const MenuBtn = styled.button`
	width: 18px;
	height: 18px;
	margin-left: 8px;

	img {
		width: 100%;
		height: 100%;
	}
`;
