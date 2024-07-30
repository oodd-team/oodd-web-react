import React from 'react';
import {
	ProfileEditContainer,
	Section,
	SectionTitle,
	SNSInfo,
	SNSInfoRow,
	SNSIcon,
	Text,
	SnsConnection,
	MemberInfo,
	MemberInfoRow,
	Label,
	Info,
	VerifyButton,
} from './styles';
import NavbarAccountEdit from '../../components/NavbarAccountEdit';
import naverIcon from './assets/naverIcon.png';
import { Link } from 'react-router-dom';

const AccountEdit: React.FC = () => {
	return (
		<ProfileEditContainer>
			<NavbarAccountEdit />
			<Section>
				<SectionTitle>로그인 정보</SectionTitle>
				<SNSInfo>
					<SnsConnection>SNS 연결</SnsConnection>
					<Text>연결된 SNS계정으로 로그인되었습니다.</Text>
					<SNSInfoRow>
						<SNSIcon src={naverIcon} alt="Naver Icon" />
					</SNSInfoRow>
				</SNSInfo>
			</Section>
			<Section>
				<SectionTitle>회원 정보</SectionTitle>
				<MemberInfo>
					<MemberInfoRow>
						<Label>이름</Label>
						<Info>-</Info>
					</MemberInfoRow>
					<MemberInfoRow>
						<Label>연락처</Label>
						<Info>-</Info>
					</MemberInfoRow>
				</MemberInfo>
			</Section>
			<Link to="/Verification">
				<VerifyButton>본인인증하고 정보 수정하기</VerifyButton>
			</Link>
		</ProfileEditContainer>
	);
};

export default AccountEdit;
