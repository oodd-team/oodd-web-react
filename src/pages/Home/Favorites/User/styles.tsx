import styled from 'styled-components';

export const UserWrapper = styled.div<{ isSelected: boolean }>`
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	gap: 0.125rem;

	cursor: pointer;
`;

export const UserImgBorder = styled.div<{ isSelected: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 5rem;
	height: 5rem;
	border: 0.0938rem solid transparent;
	border-radius: 50%;
	background-origin: border-box;
	background-clip: content-box, border-box;
	background-image: linear-gradient(#fff, #fff),
		${({ isSelected }) =>
			isSelected ? 'linear-gradient(200deg, black 0%, gray 50%, #eaeaea 80%, white 90%, white 100%)' : 'none'};
`;

export const UserImgWrapper = styled.div`
	width: 4.5rem;
	height: 4.5rem;
	overflow: hidden;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

import { StyledText } from '../../../../components/Text/StyledText';
export const StyledTextClipped = styled(StyledText)`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
	width: 5rem;
	display: inline-block; /* 텍스트 클리핑을 적용하기 위해 inline-block으로 설정 */
`;
