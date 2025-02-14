import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { patchUserInfoApi } from '@apis/user';
import { handleError } from '@apis/util/handleError';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import OODDlogo from '@assets/default/oodd.svg';

import BottomButton from '@components/BottomButton';
import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal';
import { StyledText } from '@components/Text/StyledText';

import type { PatchUserInfoRequest } from '@apis/user/dto';

import {
	SignUpLayout,
	LogoWrapper,
	SignupStepContainer,
	InputContainer,
	InputValue,
	TapToEdit,
	LogoImg,
} from './style';

type PartialUserInfoRequest = Pick<PatchUserInfoRequest, 'name' | 'birthDate' | 'phoneNumber' | 'nickname'>;

const SignUp: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [modalType, setModalType] = useState('');

	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<PartialUserInfoRequest>({
		name: '',
		birthDate: '',
		phoneNumber: '',
		nickname: '', //초기 값
	});

	const navigate = useNavigate();

	const currentUserId = getCurrentUserId();
	const token = localStorage.getItem('new_jwt_token');

	const handleInputChange = (field: keyof PatchUserInfoRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
	};

	const steps = [
		{
			key: 'name',
			label: '이름을 입력해주세요!',
			placeholder: '김오디',
			type: 'text',
			value: formData.name,
			onChange: handleInputChange('name'),
		},
		{
			key: 'birthdDate',
			label: '생년월일을 입력해주세요!',
			placeholder: '2024-01-01',
			type: 'text',
			value: formData.birthDate,
			onChange: handleInputChange('birthDate'),
		},
		{
			key: 'phoneNumber',
			label: '전화번호를 입력해주세요!',
			placeholder: '010-1234-1234',
			type: 'text',
			value: formData.phoneNumber,
			onChange: handleInputChange('phoneNumber'),
		},
		{
			key: 'nickname',
			label: '이름 대신 사용할 \n닉네임을 입력해주세요!',
			placeholder: '패션의왕',
			type: 'text',
			value: formData.nickname,
			onChange: handleInputChange('nickname'),
		},
	];

	const { label, placeholder, type, value, onChange } = steps[currentStep - 1];

	const handleNextClick = async () => {
		// 유효성 검사
		const datePattern = /^\d{4}-\d{2}-\d{2}$/;
		const phonePattern = /^(010-\d{4}-\d{4}|\d{3}-\d{4}-\d{4}|\d{11})$/;

		if (currentStep === 2 && !datePattern.test(formData.birthDate)) {
			setModalMessage('생년월일은 YYYY-MM-DD 형식으로 \n입력해주세요!');
			setIsModalOpen(true);
			return;
		}
		if (currentStep === 3 && !phonePattern.test(formData.phoneNumber)) {
			setModalMessage('전화번호는 010-1234-1234 형식으로 \n입력해주세요!');
			setIsModalOpen(true);
			return;
		}

		if (currentStep === 4 && formData.nickname.trim().includes(' ')) {
			setModalMessage('닉네임에 공백을 포함할 수 없습니다!');
			setIsModalOpen(true);
			return;
		}

		if (formData[steps[currentStep - 1].key as keyof PartialUserInfoRequest] === '') {
			setModalMessage('필수 입력 항목입니다!');
			setIsModalOpen(true);
			return;
		}

		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		} else if (currentUserId && token) {
			const requestData: PartialUserInfoRequest = {
				name: formData.name,
				nickname: formData.nickname,
				birthDate: formData.birthDate,
				phoneNumber: formData.phoneNumber,
			};
			await patchUserInfo(requestData, currentUserId);
		}
	};

	const patchUserInfo = async (requestData: PartialUserInfoRequest, currentUserId: number) => {
		try {
			const response = await patchUserInfoApi(requestData, currentUserId);
			console.log('수정 성공:', response.data);
			setModalMessage('회원가입에 성공했습니다!');
			setIsModalOpen(true);
			setModalType('success');
		} catch (error) {
			console.error('유저 정보 수정 실패:', error);
			const errorMessage = handleError(error);
			setModalMessage(errorMessage);
			setIsModalOpen(true);
			setModalType('fail');
		}
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		if (modalType === 'success') {
			navigate('/signup/terms-agreement'); // 회원가입 정보 입력 되면, 이용약관 동의 페이지로
		} else if (modalType === 'fail') {
			navigate('/login');
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleNextClick();
		}
	}; // 데스크탑 고려해 엔터 키 활성화

	return (
		<OODDFrame>
			<SignUpLayout>
				<LogoWrapper>
					<LogoImg src={OODDlogo} />
				</LogoWrapper>
				<SignupStepContainer>
					<StyledText $textTheme={{ style: { mobile: 'title3-bold', tablet: 'title2-bold', desktop: 'title1-bold' } }}>
						{label}
					</StyledText>
					<InputContainer>
						<InputValue
							type={type}
							value={value}
							onChange={onChange}
							placeholder={placeholder}
							onKeyDown={handleKeyDown}
						/>
						{value === '' && (
							<TapToEdit
								$textTheme={{
									style: { mobile: 'body1-regular', tablet: 'heading1-medium', desktop: 'heading1-medium' },
								}}
							>
								탭하여 수정해 주세요!
							</TapToEdit>
						)}
					</InputContainer>
				</SignupStepContainer>
				<BottomButton content={currentStep < steps.length ? '다음' : '완료'} onClick={handleNextClick} />
				{isModalOpen && <Modal content={modalMessage} onClose={handleModalClose} />}
			</SignUpLayout>
		</OODDFrame>
	);
};

export default SignUp;
