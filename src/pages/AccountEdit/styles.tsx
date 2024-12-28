import styled from 'styled-components';

export const ProfileEditContainer = styled.div`
	max-width: 512px; 
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const Section = styled.div`
	margin-top: 1.875rem; 
	margin-bottom: 1.875rem; 
	width: 100%; 
	padding: 0px 30px;
`;

export const SectionTitle = styled.div`
	font-size: 1.125rem; 
	font-weight: bold;
	margin-bottom: 0.625rem; 
	margin-top: 1.125rem; 
	text-align: left; 
`;

export const SNSInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.625rem; 
	margin-top: 3.125rem;
`;

export const SNSInfoRow = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 0.625rem;
`;

export const SNSIcon = styled.img`
	width: 2.5rem; 
	height: 2.5rem; 
	margin-right: 0.625rem; 
	margin-top: 1.875rem;
	flex-shrink: 0;
	object-fit: cover;
`;

export const Text = styled.div`
	font-size: 0.875rem; 
	color: ${({ theme }) => theme.colors.gray[600]};
	margin-top: 2.1875rem;
	text-align: left; 
`;

export const SnsConnection = styled.div`
	font-size: 1rem; 
	font-weight: bold;
	color: ${({ theme }) => theme.colors.gray[700]};
	margin-bottom: 0.625rem; 
	text-align: left;
`;

export const MemberInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 35px;
	width: 100%;
`;

export const MemberInfoRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start; 
	margin-bottom: 0.625rem; 
	margin-top: 10px;
`;

export const Label = styled.div`
	font-size: 0.875rem;
	color: ${({ theme }) => theme.colors.gray[700]};
	display: flex;
	align-items: center;
	width: 6.25rem; 
`;

export const Info = styled.div`
	font-size: 0.875rem; 
	color: ${({ theme }) => theme.colors.gray[500]};
	margin-left: 0.625rem; 
	flex-grow: 1; 
	text-align: left; 
`;
