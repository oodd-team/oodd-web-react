import styled from 'styled-components';

export const OOTDContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
	padding-right: 1.25rem;
`;

export const TagMent = styled.div`
	margin-top: 1.313rem;
	margin-left: 1.25rem;
	margin-bottom: 0.6875rem;
	width: auto;
	height: 1rem;
`;

export const TagContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.5rem;
	margin-left: 1.25rem;
`;

export const TagRow = styled.div`
	display: flex;
	gap: 0.5rem;
	overflow-x: auto;
	white-space: nowrap;
	scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
	-ms-overflow-style: none; /* Internet Explorer에서 스크롤바 숨기기 */

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera에서 스크롤바 숨기기 */
	}
`;
