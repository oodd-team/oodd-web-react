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
} from './styles';
import { OODDFrame } from '../../components/Frame/Frame';

import BottomButton from '../../components/BottomButton'; // BottomButton 컴포넌트 임포트

import { useNavigate } from 'react-router-dom';

import naverIcon from './assets/naverIcon.png';
import googleIcon from './assets/googleIcon.png';
import kakaoIcon from './assets/kakaoIcon.png';
import facebookIcon from './assets/facebookIcon.png';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';

import { HakgyoansimPuzzle } from '../../components/Text/StyledText'

const AccountEdit: React.FC = () => {
	const navigate = useNavigate(); // useNavigate 훅 사용

	// 본인 인증 페이지로 이동하는 함수
	const handleVerification = () => {
		navigate('/Verification');
	};

	return (
		<OODDFrame>
			<ProfileEditContainer>
				<TopBar text="회원 정보 수정" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<Section>
					<SectionTitle>
						<HakgyoansimPuzzle>
							로그인 정보
						</HakgyoansimPuzzle>
					</SectionTitle>
					<SNSInfo>
						<SnsConnection>
							<HakgyoansimPuzzle>
								SNS 연결
							</HakgyoansimPuzzle>
						</SnsConnection>
						<Text>
							<HakgyoansimPuzzle>
								연결된 SNS계정으로 로그인되었습니다.
							</HakgyoansimPuzzle>
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
						<HakgyoansimPuzzle>
							회원 정보
						</HakgyoansimPuzzle>
					</SectionTitle>
					<MemberInfo>
						<MemberInfoRow>
							<Label>
								<HakgyoansimPuzzle>
									이름
								</HakgyoansimPuzzle>
							</Label>
							<Info>-</Info>
						</MemberInfoRow>
						<MemberInfoRow>
							<Label>
								<HakgyoansimPuzzle>
									연락처
								</HakgyoansimPuzzle>
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
