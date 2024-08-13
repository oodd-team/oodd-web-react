import styled from 'styled-components';

export const ClothingInfoItemContainer = styled.li`
	display: flex;
	flex-direction: row;
	align-items: center;
	//justify-content: space-between;
	margin-bottom: 0.9375rem;

	> img {
		width: 3.5rem;
		height: 3.5rem;
		object-fit: cover;
		border-radius: 0.3125rem;
		margin-right: 0.9375rem;
	}

	.infoContainer {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		//height: 3.5rem;
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
