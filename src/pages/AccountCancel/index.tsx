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

			console.log('Stored User ID:', storedUserId);
			console.log('Token:', token);

			if (!storedUserId || !token) {
				alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
				navigate('/login'); // 로그인 페이지로 리다이렉트
				return;
			}

			const response = await request.delete<BaseResponse<{ message: string }>>(`/users/${storedUserId}/sign-out`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.isSuccess) {
				alert(response.result.message);
				navigate('/login'); // 성공 시 로그인 페이지로 이동
			} else {
				alert('Failed to delete account');
			}
		} catch (error) {
			console.error('계정 삭제하는데 오류남:', error);
			alert('에러났음 다시해봐');
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
