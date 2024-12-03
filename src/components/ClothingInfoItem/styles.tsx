import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const ClothingInfoItemContainer = styled.li`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	border: 0.0625rem solid ${({ theme }) => theme.colors.pink2};
	border-radius: 0.5rem;
	padding: 10px;
	min-width: 20.9375rem;
	box-shadow:
		0px 1px 2px 0px rgba(0, 0, 0, 0.12),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08);
	cursor: pointer;
`;

export const ClothingInfoLeft = styled.div`
	display: flex;
	align-items: center;
	width: calc(100% - 40px);
	flex-grow: 1;

	.infoDetail {
		overflow: hidden;
		text-overflow: ellipsis;
		width: 75%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.brand {
		margin-right: auto;
	}

	.model {
		margin-right: auto;
		color: ${({ theme }) => theme.colors.black};
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /* 최대 2줄로 제한 */
		-webkit-box-orient: vertical;
		word-break: keep-all; /* 단어 단위로 줄바꿈 */
		overflow-wrap: break-word; /* 단어가 너무 길 경우 다음 줄로 넘김 */
	}
`;

export const ClothingImage = styled.div`
	width: 62px;
	height: 62px;
	border-radius: 0.5rem;
	margin-right: 10px;

	> img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0.5rem;
	}
`;

export const ClothingModel = styled(StyledText)`
	display: -webkit-box;
	-webkit-line-clamp: 2; /* 두 줄로 제한 */
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 100%;
`;

export const ClothingInfoRight = styled.div`
	display: flex;
	align-items: center;
	width: 1.125rem;
	height: 100%;
	margin-left: auto;

	img {
		position: absolute;
		//top: 10px;
		right: 10px;
	}
`;
