import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 3.75rem;
	left: 0;
	width: 100%;
	height: calc(100% - 10rem);
	flex: 1;
`;

export const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	overflow-x: auto;
	width: 100%;
	height: 100%;

	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
`;

export const ImageWrapper = styled.div`
	position: relative;
	height: 60%;
	//max-height: 25rem;
	aspect-ratio: 3 / 4;
	max-width: calc(100% - 2.5rem);
	margin-right: 0.625rem;

	img {
		height: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
	}

	&:first-child {
		margin-left: max(calc((100% - ((100vh - 10rem) * 0.6 * 3 / 4)) / 2), 1.25rem);
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 0.3125rem;
	left: calc(50% - 1.875rem);
	//width: 3.75rem;
	//max-width: 30%;
	cursor: pointer;
`;

export const AddButton = styled.button`
	background: none;
	color: #999;
	font-size: 1.875rem;
	width: 6.25rem;
	height: 6.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 50%;
	padding: 0 2.5rem 0 1.875rem;

	&:hover {
		border-color: #666;
		color: #666;
	}
`;

export const HiddenFileInput = styled.input`
	display: none;
`;
