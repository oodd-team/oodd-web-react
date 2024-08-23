import React, { useState } from 'react';
import { CancelContainer, SubTitle, Text, InfoBox, InfoItem, CheckboxWrapper } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';

import BottomButton from '../../components/BottomButton';
import request, { BaseResponse } from '../../apis/core';

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

			const storedUserId = localStorage.getItem('id');
			const token = localStorage.getItem('jwt_token');

			if (!storedUserId || !token) {
				alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
				navigate('/login');
				return;
			}

			console.log('Stored User ID:', storedUserId);
			console.log('Token:', token);

			// API 요청
			const response = await request.patch<BaseResponse<{ message?: string }>>(
				`/users/${storedUserId}/sign-out`,
				{}, // 요청 본문
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			// 요청이 성공했는지 확인
			if (response.isSuccess) {
				// 성공 메시지 출력
				const successMessage = response.result?.message || '계정이 성공적으로 삭제되었습니다.';
				alert(successMessage);

				// 계정 삭제 시 localStorage에서 사용자 정보 제거
				localStorage.removeItem('id');
				localStorage.removeItem('jwt_token');

				// 로그인 페이지로 리다이렉트
				navigate('/login');
			} else {
				// 요청 실패 시 오류 메시지 출력
				console.error('API Error:', response.message || '알 수 없는 오류가 발생했습니다.');
				alert(response.message || 'Failed to delete account');
			}
		} catch (error) {
			// 예외 발생 시 오류 메시지 출력
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
						탈퇴하시면 이용 중인 서비스가 폐쇄되며, 모든 데이터는 복구할 수 없습니다.
					</StyledText>
				</Text>
				<InfoBox>
					<InfoItem as="div">
						<StyledText as="div" $textTheme={{ style: 'body4-light', lineHeight: 2 }} color={theme.colors.black}>
							- 환불 규정이나, 주의사항
						</StyledText>
					</InfoItem>
					<InfoItem as="div">
						<StyledText as="div" $textTheme={{ style: 'body4-light', lineHeight: 0 }} color={theme.colors.black}>
							- 2
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
			<BottomButton content="탈퇴하기" onClick={handleDeleteAccount} />
		</OODDFrame>
	);
};

export default AccountCancel;
