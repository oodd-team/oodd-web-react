import styled from 'styled-components';
import { StyledText } from '../../components/Text/StyledText';

export const ClothingInfoItemContainer = styled.li`
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	//justify-content: space-between;
	border: 0.0625rem solid #ffbbda;
	border-radius: 0.5rem;
	padding: 0.5rem;
	min-width: 20.9375rem;
	margin-bottom: 0.9375rem;
	//margin-right: 0.75rem;
	cursor: pointer;
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
		width: 8rem;
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
	position: absolute;
	right: 0;
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 0.375rem;
	img {
		width: 100%;
		height: 100%;
	}
`;
