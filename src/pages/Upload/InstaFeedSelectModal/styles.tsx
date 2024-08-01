import styled from 'styled-components';

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	grid-gap: 5px;
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	//height: calc(100% - 60px);
	padding: 20px;
	//overflow-y: auto;

	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
`;

export const PostContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 100px;
	max-width: 150px;
	aspect-ratio: 3 / 4;
	border-radius: 10px;
	overflow: hidden;

	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */
	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
`;

export const ImageWrapper = styled.div`
	position: relative;
	height: 100%;
	width: 100%;
	aspect-ratio: 3 / 4;

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
`;
