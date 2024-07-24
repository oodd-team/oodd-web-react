import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	height: calc(100% - 160px);
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
	max-height: 70%;
	max-width: calc(100% - 40px);
	aspect-ratio: 3 / 4;
	margin-right: 10px;

	img {
		height: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
	}

	&:first-child {
		margin-left: max(calc((100% - ((100vh - 160px) * 0.7 * 3 / 4)) / 2), 20px);
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 5px;
	left: calc(50% - 30px);
	//width: 60px;
	//max-width: 30%;
	cursor: pointer;
`;

export const AddButton = styled.button`
	background: none;
	color: #999;
	font-size: 30px;
	width: 100px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border-radius: 50%;
	margin: 0 40px 0 30px;

	&:hover {
		border-color: #666;
		color: #666;
	}
`;

export const HiddenFileInput = styled.input`
	display: none;
`;
