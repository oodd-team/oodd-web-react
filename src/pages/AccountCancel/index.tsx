import React, { useState } from 'react';
import { CancelContainer, SubTitle, Text, InfoBox, InfoItem, CheckboxWrapper, StyledButton } from './styles';
import NavbarCancel from '../../components/NavbarCancel';

const AccountCancel: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	return (
		<CancelContainer>
			<NavbarCancel />
			<SubTitle>OOTD 탈퇴 전 확인하세요!</SubTitle>
			<Text>탈퇴하시면 이용 중인 서비스가 폐쇄되며, 모든 데이터는 복구할 수 없습니다.</Text>
			<InfoBox>
				<InfoItem>환불 규정이나, 주의사항</InfoItem>
				<InfoItem>2</InfoItem>
			</InfoBox>
			<CheckboxWrapper>
				<input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
				<Text>안내사항을 모두 확인하였으며, 이에 동의합니다.</Text>
			</CheckboxWrapper>
			<StyledButton onClick={handleCheckboxChange} disabled={!isChecked} isChecked={isChecked}>
				탈퇴하기
			</StyledButton>
		</CancelContainer>
	);
};

export default AccountCancel;
