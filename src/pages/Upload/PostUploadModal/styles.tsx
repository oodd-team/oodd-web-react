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
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 16px;
	}

	/* Firefox */
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 16px;
	}

	/* Internet Explorer 10-11 */
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 16px;
	}

	/* Edge */
	&::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 16px;
	}

	/* Safari */
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 16px;
	}
`;

export const TagContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};

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

		&:first-child {
			cursor: pointer;
		}

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
	border: ${({ selected }) => (selected ? `solid 1px black` : 'none')};
	border-radius: 5px;
	//box-shadow: ${({ selected }) => (selected ? `0px 0px 8px rgba(0, 0, 0, 0.2)` : 'none')};
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
