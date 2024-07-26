import styled from 'styled-components';

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
	grid-gap: 10px;
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	height: calc(100% - 60px);
	padding: 20px;
	box-sizing: border-box;
	overflow-y: auto;

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
	overflow-x: auto;
	width: calc((100% - 50px) / 2);
	min-width: 150px;
	max-width: 300px;
	aspect-ratio: 3 / 4;
	border-radius: 10px;

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
		aspect-ratio: 3 / 4;
		object-fit: cover;
	}
`;
