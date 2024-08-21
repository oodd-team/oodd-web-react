import React, { useState } from 'react';
import { CancelContainer, SubTitle, Text, InfoBox, InfoItem, CheckboxWrapper } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';

import BottomButton from '../../components/BottomButton';

const AccountCancel: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false);
	const navigate = useNavigate(); // useNavigate 훅 사용

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<OODDFrame>
			<CancelContainer>
				<TopBar text="회원 탈퇴" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<SubTitle>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 2 }} color={theme.colors.black}>
						OOTD 탈퇴 전 확인하세요!
					</StyledText>
				</SubTitle>
				<Text>
					<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
						탈퇴하시면 이용 중인 서비스가 폐쇄되며, 모든 데이터는 복구할 수 없습니다.
					</StyledText>
				</Text>
				<InfoBox>
					<InfoItem>
						<StyledText $textTheme={{ style: 'body4-light', lineHeight: 2 }} color={theme.colors.black}>
							- 환불 규정이나, 주의사항
						</StyledText>
					</InfoItem>
					<InfoItem>
						<StyledText $textTheme={{ style: 'body4-light', lineHeight: 0 }} color={theme.colors.black}>
							- 2
						</StyledText>
					</InfoItem>
				</InfoBox>
				<CheckboxWrapper>
					<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
					<Text>
						<StyledText $textTheme={{ style: 'body4-light', lineHeight: 1 }} color={theme.colors.gray3}>
							안내사항을 모두 확인하였으며, 이에 동의합니다.
						</StyledText>
					</Text>
				</CheckboxWrapper>
			</CancelContainer>
			<BottomButton
				content="탈퇴하기" // 버튼에 표시할 텍스트
				onClick={handleCheckboxChange} // 버튼 클릭 시 호출할 함수
			/>
		</OODDFrame>
	);
};

export default AccountCancel;
