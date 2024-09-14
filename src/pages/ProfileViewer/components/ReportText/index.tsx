import React, { useState } from 'react';
import { Textarea, ReportButton, ReportTextLayout } from './style';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { ReportTextProps } from '../../dto';
import request from '../../../../apis/core';
import { useParams } from 'react-router-dom';

const ReportText: React.FC<ReportTextProps> = ({ onCloseBottomSheet, setIsInputVisible, handleOpenModal }) => {
	const [inputValue, setInputValue] = useState('');
	const myid = localStorage.getItem('id');
	const { userId } = useParams<{ userId: string }>();

	const userDetail = JSON.parse(localStorage.getItem(`userDetails_${userId}`) || '{}');
	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(event.target.value);
	};

	const handleReportSubmit = () => {
		console.log('Reported with input:', inputValue);
		Report(inputValue);
		setInputValue('');
		onCloseBottomSheet(); // 바텀 시트 닫기
		setIsInputVisible(false); // 입력창 숨기기
	};

	const Report = async (inputValue: string) => {
		try {
			await request.patch(`/user-report`, {
				fromUserId: Number.parseInt(myid as string),
				toUserId: Number.parseInt(userId as string),
				reason: inputValue,
			});
			handleOpenModal(`${userDetail.nickname}님을 \n'${inputValue}' 사유로 신고했어요.`);
		} catch (error) {
			console.error('Failed to fetch user details', error);
		}
	};

	return (
		<ReportTextLayout>
			<Textarea
				value={inputValue}
				onChange={handleInputChange}
				maxLength={500}
				placeholder="해당 OOTD를 신고하는 이유를 작성해 주세요"
			/>
			<ReportButton
				onClick={handleReportSubmit} // handleReportSubmit 함수 연결
				disabled={inputValue.trim().length === 0} // inputValue에 따라 버튼 활성화 여부 결정
				$isActive={inputValue.trim().length > 0} // inputValue에 따라 버튼 색상 변경
			>
				<StyledText $textTheme={{ style: 'button1-medium', lineHeight: 1 }} color={theme.colors.white}>
					신고하기
				</StyledText>
			</ReportButton>
		</ReportTextLayout>
	);
};

export default ReportText;
