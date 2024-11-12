import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const ClothingInfoItemContainer = styled.li`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	border: 0.0625rem solid #ffbbda;
	border-radius: 0.5rem;
	padding: 0.5rem;
	min-width: 20.9375rem;
	margin-bottom: 0.9375rem;
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

	> img {
		width: 4.625rem;
		height: 4.625rem;
		object-fit: cover;
		border-radius: 0.5rem;
		margin-right: 0.9375rem;
	}

	.infoDetail {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 80%;
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

export const StyledTextClipped = styled(StyledText)`
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
		top: 5px;
		width: 1.125rem;
		height: 1.5rem;
	}
`;
