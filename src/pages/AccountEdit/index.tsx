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
import { OODDFrame } from '../../components/Frame/Frame';

import NavbarAccountEdit from '../../components/NavbarAccountEdit';
import { Link } from 'react-router-dom';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';

import naverIcon from './assets/naverIcon.png';
import googleIcon from './assets/googleIcon.png';
import kakaoIcon from './assets/kakaoIcon.png';
import facebookIcon from './assets/facebookIcon.png';

const AccountEdit: React.FC = () => {
	return (
		<OODDFrame>
			<ProfileEditContainer>
				<NavbarAccountEdit />
				<Section>
					<SectionTitle>
						<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 0 }} color={theme.colors.black}>
							로그인 정보
						</StyledText>
					</SectionTitle>
					<SNSInfo>
						<SnsConnection>
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
								SNS 연결
							</StyledText>
						</SnsConnection>
						<Text>
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
								연결된 SNS계정으로 로그인되었습니다.
							</StyledText>
						</Text>
						<SNSInfoRow>
							<SNSIcon src={naverIcon} alt="Naver Icon" />
							<SNSIcon src={kakaoIcon} alt="kakaoIcon" />
							<SNSIcon src={googleIcon} alt="googleIcon" />
							<SNSIcon src={facebookIcon} alt="facebookIcon" />
						</SNSInfoRow>
					</SNSInfo>
				</Section>
				<Section>
					<SectionTitle>
						<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 0 }} color={theme.colors.black}>
							회원 정보
						</StyledText>
					</SectionTitle>
					<MemberInfo>
						<MemberInfoRow>
							<Label>
								<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
									이름
								</StyledText>
							</Label>
							<Info>-</Info>
						</MemberInfoRow>
						<MemberInfoRow>
							<Label>
								<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 0 }} color={theme.colors.gray3}>
									연락처
								</StyledText>
							</Label>
							<Info>-</Info>
						</MemberInfoRow>
					</MemberInfo>
				</Section>
				<Link to="/Verification">
					<VerifyButton>본인인증하고 정보 수정하기</VerifyButton>
				</Link>
			</ProfileEditContainer>
		</OODDFrame>
	);
};

export default AccountEdit;
