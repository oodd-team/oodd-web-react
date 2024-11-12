import styled from 'styled-components';

export const UploadContainer = styled.div`
	flex-grow: 1;
	height: 100vh;
	width: 100%;
	position: relative;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 2.75rem;
	left: 0;
	width: 100%;
	//max-width: 512px;
	height: calc(100% - 44px);
	padding-bottom: 100px;
	overflow-y: scroll;

	scrollbar-width: none; // Firefox
	-ms-overflow-style: none; // IE 10+
	&::-webkit-scrollbar {
		display: none; // Safari & Chrome
	}
`;

export const StyledInput = styled.textarea`
	width: calc(100% - 2.5rem);
	min-height: 100px;
	max-height: 5rem;
	margin: 0 1.25rem;
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
		font-size: 1rem;
	}

	/* Firefox */
	&:-moz-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Internet Explorer 10-11 */
	&:-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Edge */
	&::-ms-input-placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}

	/* Safari */
	&::placeholder {
		color: ${({ theme }) => theme.colors.gray3};
		font-family: 'Pretendard Variable';
		font-weight: 300;
		font-size: 1rem;
	}
`;

export const TagContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.gray1};

	.label {
		padding: 0 0.9375rem;
		color: ${({ theme }) => theme.colors.black};
	}

	> div {
		height: 3.75rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 1.25rem;

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
		border-top: 0.0625rem solid ${({ theme }) => theme.colors.gray1};
		right: 0.9375rem;
	}

	.not_selected {
		position: absolute;
		right: 2.8125rem;
		color: ${({ theme }) => theme.colors.gray3};
	}
`;

export const ClothingInfoList = styled.ul`
	padding: 0 1.25rem;
	padding-bottom: 0.3125rem;
	display: flex;
	flex-direction: column;
`;

export const StyletagList = styled.ul`
	display: flex;
	flex-direction: row;
	padding: 0 1.25rem 1.25rem 1.25rem;
	overflow-x: scroll;

	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

	span {
		margin-right: 0.4375rem;

		&:last-child {
			margin-right: 0rem;
		}
	}
`;

export const StyletagItem = styled.span<{ selected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 0.65rem;
	height: 2rem;
	//min-width: 4.375rem;
	background: ${({ selected, theme }) => (selected ? theme.colors.gradient : 'none')};
	color: ${({ selected, theme }) => (selected ? theme.colors.white : theme.colors.pink)};
	border: 1px solid ${({ theme }) => theme.colors.pink};
	border-radius: 8px;
	cursor: pointer;
`;

export const PinnedPostToggleContainer = styled.label`
	display: flex;
	align-items: center;
	padding: 0 1.25rem;
	cursor: pointer;

	:nth-child(2) {
		padding: 1.25rem 0.9375rem;
		color: ${({ theme }) => theme.colors.black};
	}

	div:last-child {
		margin-left: auto;
	}
`;
