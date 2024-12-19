import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postTermsAgreementApi } from '@/apis/user';
import { handleError } from '@/apis/util/handleError';

import Back from '@/assets/arrow/left.svg';
import OODDlogo from '@/assets/default/oodd.svg';

import { OODDFrame } from '@/components/Frame/Frame';
import { StyledText } from '@/components/Text/StyledText';
import BottomButton from '@/components/BottomButton';
import TopBar from '@/components/TopBar';
import Modal from '@/components/Modal';

import { LogoWrapper, LogoImg } from '@/pages/SignUp/style';

import { TermsAgreementLayout, StyledTitle, CheckboxList, CheckboxItem, CheckboxInput, Divider } from './styles';

const TermsAgreement: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');

	const navigate = useNavigate();

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
	const my_id = Number(localStorage.getItem('my_id'));

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

	// 완료 버튼을 눌렀을 때 실행되는 함수
	const handleCompletedClick = async () => {
		if (!my_id) {
			setModalMessage('회원 정보가 없습니다.\n로그인 해 주세요!');
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

	const navigateToLogin = () => {
		navigate('/login');
	};

	return (
		<OODDFrame>
			<TopBar LeftButtonSrc={Back} onLeftClick={navigateToLogin} />
			<TermsAgreementLayout>
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
				<CheckboxList>
					<CheckboxItem>
						<CheckboxInput
							type="checkbox"
							checked={agreements.all}
							onChange={handleAllAgreementChange}
							id="all-agreement"
						/>
						<label htmlFor="all-agreement">
							<StyledText $textTheme={{ style: 'body1-medium' }}>약관 전체 동의</StyledText>
						</label>
					</CheckboxItem>
					{/*전체 동의와 개별 동의 구분*/}
					<Divider />
					{checkboxData.map(({ key, label }) => (
						<CheckboxItem key={key}>
							<CheckboxInput
								type="checkbox"
								checked={agreements[key]}
								onChange={() => handleAgreementChange(key)}
								id={key}
							/>
							<label htmlFor={key}>
								<StyledText $textTheme={{ style: 'body2-regular' }}>{label}</StyledText>
							</label>
						</CheckboxItem>
					))}
				</CheckboxList>
				<BottomButton
					content="OODD 시작하기"
					onClick={handleCompletedClick}
					disabled={!agreements.terms || !agreements.privacy}
				/>
				{isModalOpen && <Modal content={modalMessage} onClose={navigateToLogin} />}
			</TermsAgreementLayout>
		</OODDFrame>
	);
};

export default TermsAgreement;
