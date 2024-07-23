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
	overflow-x: scroll;
	//width: 100%;
	height: 100%;

	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
`;

export const ImageWrapper = styled.div`
	position: relative;
	display: inline-block;
	margin-right: 10px;

	img {
		object-fit: cover;
		width: calc(100% - 40px);
		height: calc((100% - 40px) * 1.3);
	}

	&:first-child {
		margin-left: 20px;
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 5px;
	left: 50%;
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
