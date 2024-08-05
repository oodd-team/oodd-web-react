import styled from 'styled-components';

export const ClothingInfoItemContainer = styled.li`
	display: flex;
	flex-direction: row;
	align-items: center;
	//justify-content: space-between;
	margin-bottom: 15px;

	> img {
		width: 56px;
		height: 56px;
		object-fit: cover;
		border-radius: 5px;
		margin-right: 15px;
	}

	.infoContainer {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		//height: 56px;
	}

	.brand {
		margin-right: auto;
	}

	.detail {
		margin-right: auto;
		color: ${({ theme }) => theme.colors.gray3};
		//overflow-x: hidden;
	}

	button {
		padding: 0;
		margin-left: auto;
	}
`;
