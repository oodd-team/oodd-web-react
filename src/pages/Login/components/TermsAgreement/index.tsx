import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OODDFrame } from '../../../../components/Frame/Frame';
import BottomButton from '../../../../components/BottomButton';
import TopBar from '../../../../components/TopBar';
import Modal from '../../../../components/Modal';

import { LogoWrapper, LogoImg } from '../../../SignUp/style';
import { TermsAgreementContainer, StyledTitle, CheckboxWrapper, CheckboxItem, CheckboxInput, Divider } from './styles';
import { StyledText } from '../../../../components/Text/StyledText';

import Back from '../../../../assets/arrow/left.svg';
import OODDlogo from '../../../../assets/default/oodd.svg';

import { postTermsAgreementApi } from '../../../../apis/user';
import { handleError } from '../../../../apis/util/handleError';

const TermsAgreement: React.FC = () => {
	const my_id = localStorage.getItem('my_id');
	const navigate = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const [agreements, setAgreements] = useState({
		all: false,
		terms: false,
		privacy: false,
		marketing: false,
	});

	const checkboxData: { key: keyof typeof agreements; label: string }[] = [
		{ key: 'terms', label: '이용약관 동의 (필수)' },
		{ key: 'privacy', label: '개인정보 수집 및 이용 동의 (필수)' },
		{ key: 'marketing', label: '광고성 정보 수신 동의 (선택)' },
	];

	const handleAgreementChange = (key: keyof typeof agreements) => {
		setAgreements((prev) => {
			const updated = { ...prev, [key]: !prev[key] };
			// 필수 약관이 모두 동의되면 전체 동의 체크
			updated.all = updated.terms && updated.privacy && updated.marketing;
			return updated;
		});
	};

	const handleAllAgreementChange = () => {
		const newAllState = !agreements.all;
		setAgreements({
			all: newAllState,
			terms: newAllState,
			privacy: newAllState,
			marketing: newAllState,
		});
	};

	const handleFinalClick = async () => {
		if (!my_id) {
			setModalMessage('사용자 id가 존재하지 않습니다. 로그인 상태를 확인하세요.');
			setIsModalOpen(true);
			return;
		}

		try {
			const response = await postTermsAgreementApi(my_id);
			console.log(response);
			navigate('/'); // 성공 시 홈으로 이동
		} catch (error) {
			console.error('약관 동의 API 호출 실패:', error);
			const errorMessage = handleError(error);
			setModalMessage(errorMessage);
			setIsModalOpen(true);
		}
	};

	return (
		<OODDFrame>
			<TopBar
				LeftButtonSrc={Back}
				onLeftClick={() => {
					navigate('/login');
				}}
			/>
			<TermsAgreementContainer>
				<LogoWrapper>
					<LogoImg src={OODDlogo} />
				</LogoWrapper>
				<StyledTitle
					$textTheme={{
						style: { mobile: 'title2-bold', tablet: 'title1-bold', desktop: 'display2-bold' },
					}}
				>
					OODD에 오신 것을 환영해요 🥳
				</StyledTitle>
				<CheckboxWrapper>
					<CheckboxItem>
						<CheckboxInput type="checkbox" checked={agreements.all} onChange={handleAllAgreementChange} />
						<StyledText $textTheme={{ style: 'body1-medium' }}>약관 전체 동의</StyledText>
					</CheckboxItem>
					<Divider />
					{checkboxData.map(({ key, label }) => (
						<CheckboxItem key={key}>
							<CheckboxInput type="checkbox" checked={agreements[key]} onChange={() => handleAgreementChange(key)} />
							<StyledText $textTheme={{ style: 'body2-regular' }}>{label}</StyledText>
						</CheckboxItem>
					))}
				</CheckboxWrapper>
				<BottomButton
					content="OODD 시작하기"
					onClick={handleFinalClick}
					disabled={!agreements.terms || !agreements.privacy}
				/>
				{isModalOpen && (
					<Modal
						content={modalMessage}
						onClose={() => {
							setIsModalOpen(false);
						}}
					/>
				)}
			</TermsAgreementContainer>
		</OODDFrame>
	);
};

export default TermsAgreement;

// 카카오 및 네이버 로그인 버튼 눌렀을 때, jwt 토큰 이용해서 유저 정보 불러왔을 때 유저 정보가 다 있으면 이미 회원가입, 이용약관 동의한 것임 -> 바로 홈으로
// 로그인 했을 때 회원가입 안 되어있으면 바로 회원가입으로, 마찬가지로 이용약관 동의도 안 했을 테니 이용약관까지 하면 홈으로...
