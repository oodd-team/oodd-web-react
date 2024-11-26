import styled from 'styled-components';
import { BigUserProfile } from '../styles';

export const CommentItem = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
`;

export { BigUserProfile };

export const CommentContent = styled.div`
	margin-left: 8px;
	display: flex;
	flex-direction: column;
`;

export const MenuBtn = styled.button`
	width: 18px;
	height: 18px;
	margin-left: auto;

	img {
		width: 100%;
		height: 100%;
	}
`;
