import React, { useState } from 'react';
import {
	Container,
	Title,
	Form,
	StyledInput,
	Button,
	VerificationWrapper,
	VerificationInputWrapper,
	StyledVerificationInput,
	Timer,
	ResendButton,
	InputWrapper,
} from './styles';

import { OODDFrame } from '../../components/Frame/Frame';
import { StyledText } from '../../components/Text/StyledText';
import TopBar from '../../components/TopBar';
import back from '../../assets/arrow/left.svg';
import { useNavigate } from 'react-router-dom';
import theme from '@styles/theme';

const Verification: React.FC = () => {
	const navigate = useNavigate(); // useNavigate 훅 사용

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [verificationCode, setVerificationCode] = useState('');
	const [isVerificationSent, setIsVerificationSent] = useState(false);
	const [timer, setTimer] = useState(180); // 3분 타이머

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (value.length <= 20) {
			setName(value);
		}
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let { value } = e.target;
		value = value.replace(/[^0-9]/g, '');
		if (value.length > 3 && value.length <= 7) {
			value = `${value.slice(0, 3)}-${value.slice(3)}`;
		} else if (value.length > 7) {
			value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
		}
		setPhone(value);
	};

	const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		if (value.length <= 6) {
			setVerificationCode(value.replace(/[^0-9]/g, ''));
		}
	};

	const startTimer = () => {
		const interval = setInterval(() => {
			setTimer((prev) => {
				if (prev === 1) {
					clearInterval(interval);
				}
				return prev - 1;
			});
		}, 1000);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (isVerificationSent) {
			// 인증 코드 확인 로직 추가
			if (verificationCode === '123456') {
				// 예시로 인증 코드를 '123456'으로 설정
				alert('인증이 완료되었습니다.');
			} else {
				alert('인증 코드가 유효하지 않습니다.');
			}
		} else {
			if (phone.replace(/-/g, '').length === 11) {
				setIsVerificationSent(true);
				startTimer();
			} else {
				alert('전화번호가 유효하지 않습니다.');
			}
		}
	};

	const handleResend = () => {
		if (phone.replace(/-/g, '').length === 11) {
			alert('새 인증번호가 발송되었습니다.');
			setVerificationCode('');
			setTimer(180); // 타이머 초기화
			startTimer();
		} else {
			alert('전화번호가 유효하지 않습니다.');
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
	};

	return (
		<OODDFrame>
			<VerificationWrapper>
				<TopBar text="본인인증" LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />

				<Container>
					<Title>
					<StyledText
							$textTheme={{ style: 'body1-medium' }}
							color={theme.colors.tertiary} >
							휴대전화번호로 본인인증하기
						</StyledText>
					</Title>
					<Form onSubmit={handleSubmit}>
						<InputWrapper>
							<StyledInput
								type="text"
								placeholder="이름"
								value={name}
								onChange={handleNameChange}
								data-theme-style="heading1-regular"
							/>
						</InputWrapper>
						<InputWrapper>
							<StyledInput
								type="text"
								placeholder="전화번호"
								value={phone}
								onChange={handlePhoneChange}
								data-theme-style="body1-medium"
							/>
							{isVerificationSent && <ResendButton onClick={handleResend}>인증번호 새로 받기</ResendButton>}
						</InputWrapper>
						{isVerificationSent && (
							<VerificationInputWrapper>
								<StyledVerificationInput
									type="text"
									placeholder="인증번호를 입력하세요"
									value={verificationCode}
									onChange={handleVerificationCodeChange}
									data-theme-style="body1-medium"
								/>
								<Timer>{formatTime(timer)}</Timer>
							</account/verificationInputWrapper>
						)}

						<Button type="submit" disabled={isVerificationSent && verificationCode.length !== 6}>
							{isVerificationSent ? '인증하기' : '인증번호 받기'}
						</Button>
					</Form>
				</Container>
			</account/verificationWrapper>
		</OODDFrame>
	);
};

export default Verification;
