import styled from 'styled-components';

export const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(6.25rem, 1fr));
	grid-gap: 0.3125rem;
	position: absolute;
	top: 2.75rem;
	left: 0;
	width: 100%;
	//height: calc(100% - 3.75rem);
	padding: 1.25rem;
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
	min-width: 6.25rem;
	max-width: 9.375rem;
	aspect-ratio: 3 / 4;
	border-radius: 0.625rem;
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
