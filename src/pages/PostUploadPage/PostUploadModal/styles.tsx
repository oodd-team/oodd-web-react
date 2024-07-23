import styled from 'styled-components';

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 100%;
	height: calc(100% - 40px);
`;

export const Content = styled.div`
	width: 100%;
	height: calc(100% - 160px);
	position: fixed;
	top: 60px;
	left: 0;
`;

export const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	overflow-x: scroll;
	width: 100%;
	//height: 380px;
	padding: 20px 0;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */

	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

	img {
		width: 256px;
		height: 320px;
		margin-right: 10px;
		object-fit: cover;

		&:first-child {
			margin-left: calc((100vw - 256px) / 2);
		}
	}
`;

export const Input = styled.textarea`
	width: 100vw;
	height: 100px;
	padding: 20px;
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
	font-size: 16px;
	resize: none;
	overflow-y: hidden;

	&:focus {
		outline: none;
	}
`;

export const TagContainer = styled.div`
	display: flex;
	flex-direction: column;

	label {
		padding: 20px;
		font-size: 16px;
		color: ${({ theme }) => theme.colors.black};
	}
`;

export const TagSection = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};

	div {
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;

		:nth-child(2) {
			margin: 20px;
			margin-left: auto;
		}
	}
	button {
		//padding: 20px;
		//margin-left: auto;
		color: ${({ theme }) => theme.colors.gray3};
	}
`;

export const OutfitTagList = styled.ul`
	padding: 10px 0;
	display: flex;
	flex-direction: column;
`;

export const OutfitTagItem = styled.li`
	padding: 10px 0;
	display: flex;
`;

export const StyleTagList = styled.ul`
	padding: 0 20px 20px 20px;
	display: flex;
	flex-direction: row;
`;

export const StyleTagItem = styled.span`
	padding: 8px 12px;
	min-width: 50px;
	background-color: ${({ color }) => color};
	color: black;
	border-radius: 5px;
	margin-right: 7px;
	cursor: pointer;
`;

export const ToggleLabel = styled.label`
	display: flex;
	align-items: center;

	label {
		padding: 20px;
		font-size: 16px;
		color: ${({ theme }) => theme.colors.black};
	}
`;

export const ToggleSwitchWrapper = styled.div`
	margin: 20px;
	margin-left: auto;
`;
