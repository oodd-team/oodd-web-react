import React, { useState } from 'react';
import { CancelContainer, SubTitle, Text, InfoBox, CancelButton, CheckboxWrapper } from './styles';

import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/back.svg';

import BottomButton from '../../components/BottomButton';
import request, { BaseResponse } from '../../apis/core';

import { Body1MediumText, Body2LightText, Body4LightGrayText } from './styles'


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
			console.error('계정 삭제하는데 오류남:', error);
			alert('계정을 삭제하는 동안 오류가 발생했습니다. 다시 시도해 주세요.');
		}
	};

	return (
		<OODDFrame>
      <CancelContainer>
        <TopBar text="회원 탈퇴" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

        <SubTitle>
          <Body1MediumText>
            OOTD 탈퇴 전 확인하세요!
          </Body1MediumText>
        </SubTitle>

        <Text>
          <Body2LightText>
            탈퇴하시면 이용 중인 서비스가 폐쇄되며,
          </Body2LightText>
        </Text>

        <Text>
          <Body2LightText>
            모든 데이터는 복구할 수 없습니다.
          </Body2LightText>
        </Text>

        <InfoBox>
          <Body1MediumText>
            지금까지 OODD를 이용해주셔서 감사합니다!
          </Body1MediumText>
        </InfoBox>

        <CheckboxWrapper>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <Body4LightGrayText>
            안내사항을 모두 확인하였으며, 이에 동의합니다.
          </Body4LightGrayText>
        </CheckboxWrapper>
      </CancelContainer>

			<CancelButton isChecked={isChecked}>
        <BottomButton content="탈퇴하기" onClick={handleDeleteAccount} disabled={!isChecked} />
      </CancelButton>
    </OODDFrame>
  );
};

export default AccountCancel;