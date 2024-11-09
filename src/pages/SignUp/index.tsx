import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledText } from '../../components/Text/StyledText';
import { SignUpContainer, LogoWrapper, IntroWrapper, NickNameContainer, NickName, TapStyled, LogoImg } from './style';
import { OODDFrame } from '../../components/Frame/Frame';
import OODDlogo from '../../assets/default/oodd.svg';
import request from '../../apis/core';
import { SignUpDto } from './SignUpDto';
import BottomButton from '../../components/BottomButton';

const SignUp: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [name, setName] = useState<string>('');
	const [birthdate, setBirthdate] = useState<string>('');
	const [nickname, setNickname] = useState<string>('');
	const navigate = useNavigate();
	const userId = localStorage.getItem('id');
	const Token = localStorage.getItem('jwt_token');

	const steps = [
		{
			label: '이름을 입력해주세요',
			placeholder: '김오디',
			type: 'text',
			value: name,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value),
		},
		{
			label: '생년월일을 입력해주세요',
			placeholder: '2024-01-01',
			type: 'text',
			value: birthdate,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBirthdate(e.target.value),
		},
		{
			label: '닉네임을 작성해주세요',
			placeholder: '패션의 왕',
			type: 'text',
			value: nickname,
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value),
		},
	];

	const handleNextClick = () => {
		if (value === '') {
			alert('이 항목을 입력해주세요!'); // 값이 비어있으면 경고 표시
			return; // 빈 값이면 다음으로 넘어가지 않음
		}

		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		} else if (userId && Token) {
			request
				.patch<SignUpDto>(`/users/${userId}}`, { name, birthdate, nickname })
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
					<StyledText $textTheme={{ style: 'headline1-medium' }}>{label}</StyledText>
					<NickNameContainer>
						<NickName type={type} value={value} onChange={onChange} placeholder={placeholder} />
						{value === '' && <TapStyled $textTheme={{ style: 'body1-regular' }}>탭하여 수정해 주세요!</TapStyled>}
					</NickNameContainer>
				</IntroWrapper>
				<BottomButton content={currentStep < steps.length ? '다음' : '완료'} onClick={handleNextClick} />
			</SignUpContainer>
		</OODDFrame>
	);
};

export default SignUp;
