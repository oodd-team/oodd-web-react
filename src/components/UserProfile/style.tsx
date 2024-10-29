import styled from 'styled-components';
import { StyledText } from '../Text/StyledText';

export const UserProfileContainer = styled.section`
	display: flex;
	flex-direction: row;
`;
export const UserImg = styled.img`
	width: 4.5rem;
	height: 4.5rem;
	object-fit: cover;
	border-radius: 50%;
`;

export const UserDetails = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: left;
	gap: 0.5rem;
	margin-left: 1rem;
`;

export const BioStyledText = styled(StyledText)`
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-width: 15.5rem;
	width: 100%;
	text-overflow: ellipsis;
`;
