import styled from 'styled-components';

export const Content = styled.div`
	display: flex;
	position: absolute;
	top: 60px;
	left: 0;
	width: 100%;
	height: calc(100% - 160px);
	flex-direction: column;
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
	overflow-x: scroll;
	width: 100%;
	height: 380px;

	/* 스크롤바 스타일 없애기 */
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
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
	padding: 0 15px 0 20px;
	cursor: pointer;

	.label {
		padding: 0 15px;
		color: ${({ theme }) => theme.colors.black};
	}

	div {
		height: 60px;
		display: flex;
		flex-direction: row;
		align-items: center;

		:last-child {
			margin-left: auto;
		}
	}

	.count {
		color: ${({ theme }) => theme.colors.gray3};
		font-size: 16px;
	}

	&.clothingTag {
		border-top: 1px solid ${({ theme }) => theme.colors.gray2};
	}
`;

export const ClothingInfoList = styled.ul`
	padding-bottom: 20px;
	display: flex;
	flex-direction: column;
`;

export const ClothingInfoItem = styled.li`
	display: flex;
	flex-direction: row;
	padding-bottom: 15px;
	display: flex;

	img {
		width: 56px;
		height: 56px;
	}

	.infoContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 10px;
		height: 56px;
	}

	.brand {
		margin-right: auto;
	}

	.detail {
		margin-right: auto;
		color: ${({ theme }) => theme.colors.gray4};
	}

	&:last-child {
		padding-bottom: 0;
	}
`;

export const HashtagList = styled.ul`
	padding-bottom: 20px;
	display: flex;
	flex-direction: row;

	span {
		margin-right: 7px;

		&:last-child {
			margin-right: 0px;
		}
	}
`;

export const HashtagItem = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 32px;
	min-width: 70px;
	font-size: 16px;
	padding: 0 16px;
	background-color: ${({ color }) => color};
	color: black;
	border-radius: 5px;
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
