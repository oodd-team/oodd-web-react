import React, { useState } from 'react';
import { CancelContainer, SubTitle, Text, InfoBox, InfoItem, CheckboxWrapper, CheckboxInput } from './styles';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import back from '../../assets/arrow/left.svg';

import BottomButton from '../../components/BottomButton';
import { patchUserWithdrawApi } from '../../apis/user';
import Modal from '../../components/Modal';

const AccountCancel: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [modalContent, setModalContent] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const handleModalClose = () => {
		setIsModalVisible(false);
		setModalContent(null);
	};

	const handleDeleteAccount = async () => {
		try {
			if (!isChecked) {
				setModalContent('탈퇴 안내사항에 동의해야 합니다.');
				setIsModalVisible(true);
				return;
			}

			const storedUserId = Number(localStorage.getItem('my_id'));
			const token = localStorage.getItem('new_jwt_token');

			if (!storedUserId || !token) {
				setModalContent('사용자 정보를 찾을 수 없습니다.');
				setIsModalVisible(true);
				return;
			}

			// API 요청
			const response = await patchUserWithdrawApi(storedUserId);

			if (response.isSuccess) {
				setModalContent('계정이 성공적으로 삭제되었습니다.');
				setIsModalVisible(true);

				// 계정 삭제 시 localStorage에서 사용자 정보 제거
				localStorage.clear();

				setTimeout(() => {
					navigate('/login');
				}, 2000);
			} else {
				setModalContent(response.code || '알 수 없는 오류가 발생했습니다.');
				setIsModalVisible(true);
			}
		} catch (error) {
			console.error('계정 삭제하는데 오류남:', error);
			setModalContent('계정을 삭제하는 동안 오류가 발생했습니다. 다시 시도해 주세요.');
			setIsModalVisible(true);
		}
	};

	return (
		<OODDFrame>
			<CancelContainer>
				<TopBar text="회원 탈퇴" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<SubTitle>
					<StyledText as="div" $textTheme={{ style: 'headline2-medium', lineHeight: 2 }} color={theme.colors.black}>
						OOTD 탈퇴 전 확인하세요!
					</StyledText>
				</SubTitle>
				<Text as="div">
					<StyledText as="div" $textTheme={{ style: 'caption1-regular', lineHeight: 1 }} color={theme.colors.black}>
						{`탈퇴하시면 이용 중인 서비스가 폐쇄되며,\n모든 데이터는 복구할 수 없습니다.`}
					</StyledText>
				</Text>
				<InfoBox>
					<InfoItem as="div">
						<StyledText
							as="div"
							$textTheme={{ style: 'body1-medium', lineHeight: 2 }}
							color={theme.colors.black}
							style={{ whiteSpace: 'nowrap' }} // 줄 바꿈 방지
						>
							지금까지 OODD를 이용해주셔서 감사합니다!
						</StyledText>
					</InfoItem>
				</InfoBox>
				<CheckboxWrapper as="div">
					<CheckboxInput type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
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
			{isModalVisible && (
				<Modal
					content={modalContent || ''} // null일 경우 빈 문자열로 처리
					onClose={handleModalClose}
					isCloseButtonVisible={true}
					button={{ content: '확인', onClick: handleModalClose }}
				/>
			)}
		</OODDFrame>
	);
};

export default AccountCancel;
