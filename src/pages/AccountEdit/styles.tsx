import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	max-width: 512px; /* 32rem */
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const Section = styled.div`
	margin-top: 1.875rem; /* 30px */

	margin-bottom: 1.875rem; /* 30px */
	width: 100%; /* Section이 부모 컨테이너의 전체 너비를 차지하도록 설정 */
	padding: 0px 30px;
`;

export const SectionTitle = styled.div`
	font-size: 1.125rem; /* 18px */
	font-weight: bold;
	margin-bottom: 0.625rem; /* 10px */
	margin-top: 1.125rem; /* 18px */
	text-align: left; /* 텍스트를 왼쪽 정렬 */
`;

export const SNSInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.625rem; /* 10px */
	margin-top: 3.125rem; /* 50px */
`;

export const SNSInfoRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.625rem; /* 10px */
`;

export const SNSIcon = styled.img`
	width: 2.5rem; /* 40px */
	height: 2.5rem; /* 40px */
	margin-right: 0.625rem; /* 10px */
	margin-top: 1.875rem;
	flex-shrink: 0;
	object-fit: cover;
`;

export const Text = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #666;
	margin-top: 2.1875rem;
	text-align: left; /* 텍스트를 왼쪽 정렬 */
`;

export const SnsConnection = styled.div`
	font-size: 1rem; /* 16px */
	font-weight: bold;
	color: #333;
	margin-bottom: 0.625rem; /* 10px */
	text-align: left; /* 텍스트를 왼쪽 정렬 */
`;

export const MemberInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 35px;
	width: 100%; /* 부모 컨테이너의 전체 너비를 차지하도록 설정 */
`;

export const MemberInfoRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start; /* 아이템들을 왼쪽으로 정렬 */
	margin-bottom: 0.625rem; /* 10px */
	margin-top: 10px;
`;

export const Label = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #333;
	display: flex;
	align-items: center;
	width: 6.25rem; /* 100px, 라벨의 고정 너비 설정 */
`;

export const Info = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #999;
	margin-left: 0.625rem; /* 10px */
	flex-grow: 1; /* 라벨과 함께 라인을 맞추기 위해 넓이를 확장 */
	text-align: left; /* 텍스트를 왼쪽 정렬 */
`;
