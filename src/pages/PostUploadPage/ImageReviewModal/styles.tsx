import styled from 'styled-components';

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: calc(100% - 40px);
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: calc(100% - 160px);
	flex: 1;
	position: fixed;
	top: 60px;
	left: 0;
`;

export const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	overflow-x: scroll;
	width: 100%;
	margin-bottom: 20px;
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
		width: calc(100vw - 40px);
		height: calc((100vw - 40px) * 1.25);
		object-fit: cover;
	}

	&:first-child {
		margin-left: 20px;
	}
`;

export const RemoveButton = styled.button`
	position: absolute;
	bottom: 5px;
	left: 50%;
	transform: translate(-50%, -50%);
	background: rgba(0, 0, 0, 0.3);
	color: white;
	border: solid 1px white;
	border-radius: 50%;
	font-size: 20px;
	font-weight: 100;
	width: 50px;
	height: 50px;
	cursor: pointer;

	&:hover {
		background: rgba(0, 0, 0, 0.7);
	}
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
