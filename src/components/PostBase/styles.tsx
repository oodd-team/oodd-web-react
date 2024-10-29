import styled from 'styled-components';

export const PostContainer = styled.div`
	width: 100%;
	height: auto;
`;

export const PostInfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 8px;
	margin-bottom: 16px;
	padding: 0 20px;
`;

export const UserInfo = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
`;

export const UserProfile = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 8px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const UserName = styled.div``;

export const MenuBtn = styled.button`
	width: 18px;
	height: 18px;
`;

export const Content = styled.span`
	display: flex;
	align-items: center;
	padding: 0 20px;
	margin-bottom: 16px;
	word-wrap: break-word;
	word-break: break-all;
`;



export const IconRow = styled.div`
	display: flex;
	height: 20px;
	align-items: center;
	padding: 0 20px;
	margin: 8px 0 16px 0;
`;

export const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;

	img {
		width: 20px;
		height: 20px;
	}

	span {
		font-size: 15px;
		color: #000;
		margin-right: 16px;
	}
`;

export const ClothingInfoList = styled.div`
	margin-top: 5px;
	margin-left: 1.25rem;
	margin-bottom: 4rem;
	display: flex;
	overflow-x: auto;
	white-space: nowrap;
	scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
	-ms-overflow-style: none; /* Internet Explorer에서 스크롤바 숨기기 */

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
	}
`;

export const InputLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	textarea {
		display: block;
		width: calc(100% - 3rem);
		height: 5.75rem;
		border-radius: 0.125rem;
		border: 0.0625rem solid ${({ theme }) => theme.colors.gray3};
		margin-bottom: 5.875rem;
		z-index: 2;
		margin-top: -3.75rem;
		outline: none;
		padding: 0.8125rem 0.9375rem;
		font-family: 'Pretendard Variable';
		font-size: 1rem;
		font-style: normal;
		font-weight: 300;
		line-height: 150%;
		color: ${({ theme }) => theme.colors.black};
		resize: none;
	}
`;
