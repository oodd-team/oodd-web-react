import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	max-width: 32rem; /* 512px */
	margin: 0 auto;
	padding: 1.25rem; /* 20px */
	display: flex;
	flex-direction: column;
`;

export const Section = styled.div`
	margin-bottom: 1.875rem; /* 30px */
`;

export const SectionTitle = styled.div`
	font-size: 1.125rem; /* 18px */
	font-weight: bold;
	margin-bottom: 0.625rem; /* 10px */
	margin-top: 1.125rem; /* 18px */
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
`;

export const SnsConnection = styled.div`
	font-size: 1rem; /* 16px */
	font-weight: bold;
	color: #333;
	margin-bottom: 0.625rem; /* 10px */
`;

export const MemberInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 35px;
`;

export const MemberInfoRow = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.625rem; /* 10px */
	margin-top: 10px;
`;

export const Label = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #333;
	display: flex;
	align-items: center;
`;

export const Info = styled.div`
	font-size: 0.875rem; /* 14px */
	color: #999;
	margin-left: 0.625rem; /* 10px */
`;

export const VerifyButton = styled.button`
	width: 100%;
	padding: 1.25rem; /* 20px */
	margin-top: 12.5rem; /* 200px */
	font-size: 0.875rem; /* 14px */
	color: #fff;
	background-color: #000;
	border: none;
	border-radius: 0.3125rem; /* 5px */
	cursor: pointer;

	&:hover {
		background-color: #333;
	}
`;
