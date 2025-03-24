import { styled } from 'styled-components';

export const ProfileEditContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ProfilePicWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ProfilePic = styled.div`
	width: 7.25rem;
	height: 7.25rem;
	flex-shrink: 0;
	border-radius: 50%;
	overflow: hidden;
	margin-top: 2.125rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const Label = styled.div`
	text-align: center;
`;

export const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-top: 10px;

	${Label} {
		width: auto;
		margin: 0;
	}
`;

export const FileInput = styled.input`
	display: none;
`;

export const List = styled.ul`
	width: 100%;
	padding: 0;
	margin: 0;
	list-style: none;
	border-top: 0rem solid ${({ theme }) => theme.colors.background.divider};
	position: absolute;
	bottom: 1.25rem;
`;

export const ListItem = styled.li`
	display: flex;
	align-items: center;
	padding: 15px 10px;

	border-bottom: 0px solid ${({ theme }) => theme.colors.background.divider};
	cursor: pointer;

	& img:first-child {
		margin-right: 1rem;
	}

	& img:last-child {
		margin-left: auto;
	}

	&:hover {
		background: ${({ theme }) => theme.colors.background.secondary};
	}

	span {
		flex: 1;
		text-align: left;
	}
`;
