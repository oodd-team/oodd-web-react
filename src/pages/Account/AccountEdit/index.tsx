import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import back from '@assets/arrow/left.svg';
import kakao from '@assets/default/snsIcon/kakao.svg';
import naver from '@assets/default/snsIcon/naver.svg';

import BottomButton from '@components/BottomButton/index';
import { OODDFrame } from '@components/Frame/Frame';
import { StyledText } from '@components/Text/StyledText';
import TopBar from '@components/TopBar/index';

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
} from './styles';

const AccountEdit: React.FC = () => {
	const navigate = useNavigate(); // useNavigate 훅 사용

	// 본인 인증 페이지로 이동하는 함수
	const handleVerification = () => {
		navigate('/account/verification');
	};

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="회원 정보 수정" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />

				<Section>
					<SectionTitle>
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.text.primary}>
							로그인 정보
						</StyledText>
					</SectionTitle>
					<SNSInfo>
						<SnsConnection>
							<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
								SNS 연결
							</StyledText>
						</SnsConnection>
						<Text>
							<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
								연결된 SNS계정으로 로그인되었습니다.
							</StyledText>
						</Text>
						<SNSInfoRow>
							<SNSIcon src={naver} alt="Naver Icon" />
							<SNSIcon src={kakao} alt="kakaoIcon" />
						</SNSInfoRow>
					</SNSInfo>
				</Section>
				<Section>
					<SectionTitle>
						<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.text.primary}>
							회원 정보
						</StyledText>
					</SectionTitle>
					<MemberInfo>
						<MemberInfoRow>
							<Label>
								<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
									이름
								</StyledText>
							</Label>
							<Info>-</Info>
						</MemberInfoRow>
						<MemberInfoRow>
							<Label>
								<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
									연락처
								</StyledText>
							</Label>
							<Info>-</Info>
						</MemberInfoRow>
					</MemberInfo>
				</Section>
			</ProfileEditContainer>
			<BottomButton
				content="본인인증하고 정보 수정하기" // 버튼에 표시할 텍스트
				onClick={handleVerification} // 버튼 클릭 시 호출할 함수
				disabled={true} // 비활성화 시킴
			/>
		</OODDFrame>
	);
};

export default AccountEdit;
