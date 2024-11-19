import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const ClothingInfoItemContainer = styled.li`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	border: 0.0625rem solid ${({ theme }) => theme.colors.pink2};
	border-radius: 0.5rem;
	padding: 0.5rem;
	min-width: 20.9375rem;
	margin-bottom: 0.9375rem;
	box-shadow:
		0px 1px 2px 0px rgba(0, 0, 0, 0.12),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08),
		0px 0px 1px 0px rgba(0, 0, 0, 0.08);
	cursor: pointer;

	/* Post 안에 있을 때 첫 번째 아이템에만 margin-left 적용 */
	.post-mode > & {
		&:first-child {
			margin-left: 1.25rem;
		}
	}
`;

export const ClothingInfoLeft = styled.div`
	display: flex;
	align-items: center;
	width: calc(100% - 40px);
	flex-grow: 1;

	.infoDetail {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 70%;
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
		//overflow-x: hidden;
	}
`;

export const ClothingImage = styled.div`
	width: 4.625rem;
	height: 4.625rem;
	border-radius: 0.5rem;
	margin-right: 0.9375rem;

	> img {
		width: 4.625rem;
		height: 4.625rem;
		object-fit: cover;
		border-radius: 0.5rem;
	}
`;

export const ClothingModel = styled(StyledText)`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 100%;
	display: inline-block; /* 텍스트 클리핑을 적용하기 위해 inline-block으로 설정 */
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
