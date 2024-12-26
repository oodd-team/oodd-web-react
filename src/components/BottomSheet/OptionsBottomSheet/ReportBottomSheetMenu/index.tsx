import React, { useState, useRef, useCallback, useEffect } from 'react';
import BottomButton from '@components/BottomButton/index';
import BottomSheetMenu from '@components/BottomSheetMenu/index';
import { SheetItemDto } from '@components/BottomSheetMenu/dto';
import { ReportBottomSheetMenuProps } from './dto';
import { InputLayout, ReportBottomSheetMenuWrappar } from './styles';

const ReportBottomSheetMenu: React.FC<ReportBottomSheetMenuProps> = React.memo(
	({ onCloseReportSheet, onOpenStatusModal, sendReport, isUserReport }) => {
		const [isVisibleTextarea, setIsTextareaVisible] = useState(false);
		const [inputValue, setInputValue] = useState('');
		const textareaRef = useRef<HTMLTextAreaElement>(null);

		// 유저 신고 사유 목록
		const userReportItems: SheetItemDto[] = [
			{
				text: '욕설 및 비방',
				action: () => {
					sendReport('욕설 및 비방');
				},
			},
			{
				text: '사칭',
				action: () => {
					sendReport('사칭');
				},
			},
			{
				text: '불법 활동',
				action: () => {
					sendReport('불법 활동');
				},
			},
			{
				text: '스팸 및 광고',
				action: () => {
					sendReport('스팸 및 광고');
				},
			},
			{
				text: '차별 및 혐오 발언',
				action: () => {
					sendReport('차별 및 혐오 발언');
				},
			},
			{
				text: '스토킹 및 괴롭힘',
				action: () => {
					sendReport('스토킹 및 괴롭힘');
				},
			},
			{
				text: '기타',
				action: () => {
					setIsTextareaVisible((prev) => !prev);
				},
			},
		];

		// 게시글 신고 사유 목록
		const postReportItems: SheetItemDto[] = [
			{
				text: '부적절한 내용',
				action: () => {
					sendReport('부적절한 내용');
				},
			},
			{
				text: '사기 및 허위 정보',
				action: () => {
					sendReport('사기 및 허위 정보');
				},
			},
			{
				text: '스팸 및 광고',
				action: () => {
					sendReport('스팸 및 광고');
				},
			},
			{
				text: '타인의 권리 침해',
				action: () => {
					sendReport('타인의 권리 침해');
				},
			},
			{
				text: '불법 거래 관련 내용',
				action: () => {
					sendReport('불법 거래 관련 내용');
				},
			},
			{
				text: '기타',
				action: () => {
					setIsTextareaVisible((prev) => !prev);
				},
			},
		];

		const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setInputValue(e.target.value);
		}, []);

		const handleSubmit = useCallback(() => {
			sendReport(inputValue);
		}, [onCloseReportSheet, onOpenStatusModal]);

		useEffect(() => {
			if (textareaRef.current) {
				textareaRef.current.focus(); // 마운트 또는 업데이트 시 textarea에 포커스 유지
			}
		}, []);

		return (
			<ReportBottomSheetMenuWrappar>
				<BottomSheetMenu items={isUserReport ? userReportItems : postReportItems} />
				{isVisibleTextarea && (
					<InputLayout>
						<textarea
							ref={textareaRef}
							placeholder="어떤 문제가 있나요?"
							value={inputValue}
							onChange={handleInputChange}
						/>
						<BottomButton
							content="완료"
							onClick={handleSubmit}
							disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
						/>
					</InputLayout>
				)}
			</ReportBottomSheetMenuWrappar>
		);
	},
);

export default ReportBottomSheetMenu;
