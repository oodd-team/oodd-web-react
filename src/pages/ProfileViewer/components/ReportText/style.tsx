import styled from 'styled-components';

export const ReportTextLayout = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.875rem;
	padding-bottom: 1.5rem;
`;

export const Textarea = styled.textarea`
	width: 21.375rem;
	padding: 1rem;
	height: 5.75rem;
	resize: none;
	font-family: 'Pretendard Variable';
	font-style: normal;
	font-weight: 300;
	font-size: 1rem;
	border-radius: 0.125rem;
	border: 0.0625rem solid #7b7b7b;
	color: #7b7b7b;
`;

export const ReportButton = styled.button<{ $isActive: boolean }>`
	width: 21.875rem;
	height: 4rem;
	border-radius: 0.625rem;
	background: ${({ $isActive }) => ($isActive ? 'black' : 'rgba(0, 0, 0, 0.50)')};
`;
