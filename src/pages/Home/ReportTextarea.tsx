import React, { useState, useRef, useCallback, useEffect } from 'react';
import { InputLayout } from '../Post/styles.tsx';
import BottomButton from '../../components/BottomButton/index.tsx';

interface ReportTextareaProps {
	onCloseReportSheet: () => void;
	onOpenModal: () => void;
}

const ReportTextarea: React.FC<ReportTextareaProps> = React.memo(({ onCloseReportSheet, onOpenModal }) => {
	const [inputValue, setInputValue] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.focus(); // 마운트 또는 업데이트 시 textarea에 포커스 유지
		}
	}, []);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	}, []);

	const handleSubmit = useCallback(() => {
		onCloseReportSheet();
		onOpenModal();
	}, [onCloseReportSheet, onOpenModal]);

	return (
		<InputLayout>
			<textarea
				ref={textareaRef}
				placeholder="해당 OOTD를 신고하려는 이유를 작성해주세요."
				value={inputValue}
				onChange={handleInputChange}
			></textarea>
			<BottomButton
				content="신고하기"
				onClick={handleSubmit}
				disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
			/>
		</InputLayout>
	);
});

export default ReportTextarea;
