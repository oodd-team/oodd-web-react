import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	height: calc(100% - 160px);
	overflow-y: auto;

	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}
`;

export const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	min-height: 380px;
	padding: 30px 0;
	overflow-x: scroll;

	// 스크롤바 스타일 없애기
	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}

	img {
		width: 256px;
		height: 320px;
		margin-right: 10px;
		object-fit: cover;

		&:first-child {
			margin-left: calc((100% - 256px) / 2);
		}
	}
`;

export const StyledInput = styled.textarea`
	width: calc(100% - 40px);
	min-height: 50px;
	max-height: 80px;
	margin: 20px;
	border: none;
	resize: none;
	overflow-y: scroll;

	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}

	&:focus {
		outline: none;
	}

	::placeholder {
		font-size: 1rem;
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: light;
		font-size: 16px;
	}
`;

export const TagContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
	cursor: pointer;

	.label {
		padding: 0 15px;
		color: ${({ theme }) => theme.colors.black};
	}

	> div {
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 20px;

		:last-child {
			margin-left: auto;
		}
	}

	.count {
		color: ${({ theme }) => theme.colors.gray3};
	}

	&.clothingTag {
		border-top: 1px solid ${({ theme }) => theme.colors.gray1};
		right: 15px;
	}

	.not_selected {
		position: absolute;
		right: 45px;
		color: ${({ theme }) => theme.colors.gray3};
	}
`;

export const ClothingInfoList = styled.ul`
	padding: 0 20px;
	padding-bottom: 5px;
	display: flex;
	flex-direction: column;
`;

export const ClothingInfoItem = styled.li`
	display: flex;
	flex-direction: row;
	margin-bottom: 15px;
	display: flex;

	> img {
		width: 56px;
		height: 56px;
		border-radius: 10px;
		border: none;
	}

	.infoContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 15px;
		height: 56px;
	}

	.brand {
		margin-right: auto;
	}

	.detail {
		margin-right: auto;
		color: ${({ theme }) => theme.colors.gray4};
	}

	button {
		padding: 0;
		margin-left: auto;
	}
`;

export const HashtagList = styled.ul`
	display: flex;
	flex-direction: row;
	padding: 0 20px 20px 20px;

	span {
		margin-right: 7px;

		&:last-child {
			margin-right: 0px;
		}
	}
`;

export const HashtagItem = styled.span<{ selected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	min-width: 70px;
	padding: 0 16px;
	background-color: ${({ color }) => color};
	color: black;
	//border: ${({ selected }) => (selected ? `solid 1px black` : 'none')};
	border-radius: 10px;
	box-shadow: ${({ selected }) => (selected ? `0px 0px 8px rgba(0, 0, 0, 0.2)` : 'none')};
	cursor: pointer;
`;

export const PinnedPostToggleContainer = styled.label`
	display: flex;
	align-items: center;
	padding: 0 20px;
	cursor: pointer;

	:nth-child(2) {
		padding: 20px 15px;
		color: ${({ theme }) => theme.colors.black};
	}

	div:last-child {
		margin-left: auto;
	}
`;
