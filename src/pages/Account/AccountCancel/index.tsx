import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import theme from '@styles/theme';

import { patchUserWithdrawApi } from '@apis/user';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import back from '@assets/arrow/left.svg';

import BottomButton from '@components/BottomButton/index';
import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal/index';
import Skeleton from '@components/Skeleton';
import { StyledText } from '@components/Text/StyledText';
import TopBar from '@components/TopBar/index';

import {
	CancelContainer,
	SubTitle,
	Text,
	InfoBox,
	InfoItem,
	CheckboxWrapper,
	CheckboxInput,
	Label,
	StyledCheckboxText,
} from './styles';

const AccountCancel: React.FC = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [modalContent, setModalContent] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState(true); // Loading state
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

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

			const currentUserId = getCurrentUserId();
			const token = localStorage.getItem('new_jwt_token');

			if (!currentUserId || !token) {
				setModalContent('사용자 정보를 찾을 수 없습니다.');
				setIsModalVisible(true);
				return;
			}

			const response = await patchUserWithdrawApi(currentUserId);

			if (response.isSuccess) {
				setModalContent('계정이 성공적으로 삭제되었습니다.');
				setIsModalVisible(true);
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

	if (isLoading) {
		return (
			<OODDFrame>
				<CancelContainer>
					<TopBar text="회원 탈퇴" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
					<SubTitle>
						<StyledText as="div" $textTheme={{ style: 'headline2-medium' }} color={theme.colors.text.primary}>
							OOTD 탈퇴 전 확인하세요!
							<Skeleton width="100%" height={400} />
						</StyledText>
					</SubTitle>
				</CancelContainer>
				<BottomButton content="탈퇴하기" onClick={handleDeleteAccount} disabled={!isChecked} />
			</OODDFrame>
		);
	}

	return (
		<OODDFrame>
			<CancelContainer>
				<TopBar text="회원 탈퇴" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
				<SubTitle>
					<StyledText as="div" $textTheme={{ style: 'headline2-medium' }} color={theme.colors.text.primary}>
						OOTD 탈퇴 전 확인하세요!
					</StyledText>
				</SubTitle>
				<Text as="div">
					<StyledText as="div" $textTheme={{ style: 'caption1-regular' }} color={theme.colors.text.primary}>
						{`탈퇴하시면 이용 중인 서비스가 폐쇄되며,\n모든 데이터는 복구할 수 없습니다.`}
					</StyledText>
				</Text>
				<InfoBox>
					<InfoItem as="div">
						<StyledText
							as="div"
							$textTheme={{ style: 'body1-medium' }}
							color={theme.colors.text.primary}
							style={{ whiteSpace: 'nowrap' }}
						>
							지금까지 OODD를 이용해주셔서 감사합니다!
						</StyledText>
					</InfoItem>
				</InfoBox>
				<CheckboxWrapper as="div">
					<Label>
						<CheckboxInput type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
						<StyledCheckboxText as="span" $textTheme={{ style: 'body2-regular' }}>
							안내사항을 모두 확인하였으며, 이에 동의합니다.
						</StyledCheckboxText>
					</Label>
				</CheckboxWrapper>
			</CancelContainer>
			<BottomButton content="탈퇴하기" onClick={handleDeleteAccount} disabled={!isChecked} />
			{isModalVisible && (
				<Modal
					content={modalContent || ''}
					onClose={handleModalClose}
					isCloseButtonVisible={true}
					button={{ content: '확인', onClick: handleModalClose }}
				/>
			)}
		</OODDFrame>
	);
};

export default AccountCancel;
