import React, { useState } from 'react';
import { CancelContainer, SubTitle, Text, InfoBox, InfoItem, CheckboxWrapper } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/arrow/left.svg';

import BottomButton from '../../components/BottomButton';
import { patchUserWithdrawApi } from '../../apis/user'; 

const AccountCancel: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false);
	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleDeleteAccount = async () => {
		try {
			if (!isChecked) {
				alert('탈퇴 안내사항에 동의해야 합니다.');
				return;
			}

			const storedUserId = localStorage.getItem('my_id');
			const token = localStorage.getItem('new_jwt_token');

			if (!storedUserId || !token) {
				alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
				return;
			}

			// API 요청
			const response = await patchUserWithdrawApi(storedUserId); 

			// 요청이 성공했는지 확인
			if (response.isSuccess) {
				// 성공 메시지 출력
				alert('계정이 성공적으로 삭제되었습니다.');

				// 계정 삭제 시 localStorage에서 사용자 정보 제거
				localStorage.removeItem('my_id');
				localStorage.removeItem('new_jwt_token');
				
			} else {
				// 요청 실패 시 오류 메시지 출력
				console.error('API Error:', response.code || '알 수 없는 오류가 발생했습니다.');
				alert(response.code || 'Failed to delete account');
			}
		} catch (error) {
			console.error('계정 삭제하는데 오류남:', error);
			alert('계정을 삭제하는 동안 오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	return (
		<OODDFrame>
			<CancelContainer>
				<TopBar text="회원 탈퇴" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<SubTitle>
					<StyledText as="div" $textTheme={{ style: 'body1-medium', lineHeight: 2 }} color={theme.colors.black}>
						OOTD 탈퇴 전 확인하세요!
					</StyledText>
				</SubTitle>
				<Text as="div">
					<StyledText as="div" $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
						탈퇴하시면 이용 중인 서비스가 폐쇄되며,
					</StyledText>
				</Text>
				<Text as="div">
					<StyledText as="div" $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
						모든 데이터는 복구할 수 없습니다.
					</StyledText>
				</Text>
				<InfoBox>
					<InfoItem as="div">
						<StyledText as="div" $textTheme={{ style: 'body1-medium', lineHeight: 2 }} color={theme.colors.black}>
							지금까지 OODD를 이용해주셔서 감사합니다!
						</StyledText>
					</InfoItem>
				</InfoBox>
				<CheckboxWrapper as="div">
					<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
					<StyledText as="span" $textTheme={{ style: 'body4-light', lineHeight: 1 }} color={theme.colors.gray3}>
						안내사항을 모두 확인하였으며, 이에 동의합니다.
					</StyledText>
				</CheckboxWrapper>
			</CancelContainer>
			<div
				style={{
					backgroundColor: isChecked ? '#000000' : '#d3d3d3',
					color: isChecked ? '#ffffff' : '#808080',
					cursor: isChecked ? 'pointer' : 'not-allowed',
				}}
			>
				<BottomButton content="탈퇴하기" onClick={handleDeleteAccount} disabled={!isChecked} />
			</div>
		</OODDFrame>
	);
};

export default AccountCancel;
