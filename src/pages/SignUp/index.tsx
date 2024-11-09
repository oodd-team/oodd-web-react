import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledText } from '../../components/Text/StyledText';
import { SignUpContainer, LogoWrapper, IntroWrapper, NickNameContainer, NickName, TapStyled, LogoImg } from './style';
import { OODDFrame } from '../../components/Frame/Frame';
import OODDlogo from '../../assets/default/oodd.svg';
import request from '../../apis/core';
import { SignUpDto } from './SignUpDto';
import BottomButton from '../../components/BottomButton';

interface FormData {
	name: string;
	birthdate: string;
	phonenumber: string;
	nickname: string;
	[key: string]: string; // 문자열 키에 대응하도록 설정
}

const SignUp: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<FormData>({
		name: '',
		birthdate: '',
		phonenumber: '',
		nickname: '', //초기 값
	});
	const navigate = useNavigate();
	const userId = localStorage.getItem('id');
	const Token = localStorage.getItem('jwt_token');

	const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevData) => ({ ...prevData, [field]: e.target.value }));
	};

	const steps = [
		{
			label: '이름을 입력해주세요!',
			placeholder: '김오디',
			type: 'text',
			value: formData.name,
			onChange: handleInputChange('name'),
		},
		{
			label: '생년월일을 입력해주세요!',
			placeholder: '2024-01-01',
			type: 'text',
			value: formData.birthdate,
			onChange: handleInputChange('birthdate'),
		},
		{
			label: '전화번호를 입력해주세요!',
			placeholder: '010-1234-1234',
			type: 'text',
			value: formData.phonenumber,
			onChange: handleInputChange('phonenumber'),
		},
		{
			label: '이름 대신 사용할 닉네임을 입력해주세요!',
			placeholder: '패션의 왕',
			type: 'text',
			value: formData.nickname,
			onChange: handleInputChange('nickname'),
		},
	];

	const handleNextClick = () => {
		// 유효성 검사
		const datePattern = /^\d{4}-\d{2}-\d{2}$/;
		const phonePattern = /^(010-\d{4}-\d{4}|\d{3}-\d{4}-\d{4}|\d{11})$/;

		if (currentStep === 2 && !datePattern.test(formData.birthdate)) {
			alert('생년월일은 YYYY-MM-DD 형식으로 입력해주세요!');
			return;
		}
		if (currentStep === 3 && !phonePattern.test(formData.phonenumber)) {
			alert('전화번호는 010-1234-1234 형식으로 입력해주세요!');
			return;
		}
		if (formData[steps[currentStep - 1].label] === '') {
			alert('이 항목을 입력해주세요!');
			return;
		}

		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		} else if (userId && Token) {
			request
				.patch<SignUpDto>(`/users/${userId}`, { ...formData })
				.then((response) => {
					console.log('사용자 정보 업데이트 성공:', response);
					navigate('/');
				})
				.catch((error) => {
					console.error('사용자 정보 업데이트 실패:', error);
					alert('다른 정보를 확인해 주세요!');
				});
		} else {
			console.error('유효하지 않은 사용자 ID 또는 토큰');
		}
	};

	const { label, placeholder, type, value, onChange } = steps[currentStep - 1];

	return (
		<OODDFrame>
			<SignUpContainer>
				<LogoWrapper>
					<LogoImg src={OODDlogo} />
				</LogoWrapper>
				<IntroWrapper>
					<StyledText
						$textTheme={{ style: { mobile: 'headline1-medium', tablet: 'title1-bold', desktop: 'title1-bold' } }}
					>
						{label}
					</StyledText>
					<NickNameContainer>
						<NickName type={type} value={value} onChange={onChange} placeholder={placeholder} />
						{value === '' && (
							<TapStyled
								$textTheme={{
									style: { mobile: 'body1-regular', tablet: 'heading1-medium', desktop: 'heading1-medium' },
								}}
							>
								탭하여 수정해 주세요!
							</TapStyled>
						)}
					</NickNameContainer>
				</IntroWrapper>
				<BottomButton content={currentStep < steps.length ? '다음' : '완료'} onClick={handleNextClick} />
			</SignUpContainer>
		</OODDFrame>
	);
};

export default SignUp;
