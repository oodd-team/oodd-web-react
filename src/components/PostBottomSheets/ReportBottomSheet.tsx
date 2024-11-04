import { useRecoilState, useRecoilValue } from 'recoil';
import BottomSheet from '../BottomSheet';
import { BottomSheetProps } from '../BottomSheet/dto';
import { useState } from 'react';
import {
	IsMeatballBottomSheetOpenAtom,
	IsReportBottomSheetOpenAtom,
	IsReportFailModalOpenAtom,
	IsReportSuccessModalOpenAtom,
	PostReportAtom,
} from '../../recoil/Home/MeatballBottomSheetAtom';
import BottomSheetMenu from '../BottomSheetMenu';
import { BottomSheetMenuProps } from '../BottomSheetMenu/dto';
import { ApiDto } from './dto';
import request from '../../apis/core';
import ReportTextarea from './ReportTextArea';

const ReportBottomSheet: React.FC = () => {
	const [, setIsMeatballBottomSheet] = useRecoilState(IsMeatballBottomSheetOpenAtom);
	const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useRecoilState(IsReportBottomSheetOpenAtom);
	const [, setIsReportSuccessModalOpen] = useRecoilState(IsReportSuccessModalOpenAtom);
	const [, setIsReportFailModalOpen] = useRecoilState(IsReportFailModalOpenAtom);
	const postReport = useRecoilValue(PostReportAtom);

	const [showInput, setShowInput] = useState(false);

	const postNewReport = async (message: string) => {
		if (postReport) {
			const response = await request.post<ApiDto>('/report', {
				userId: postReport.userId,
				postId: postReport.postId,
				reason: message,
			});

			if (response.isSuccess) {
				setIsMeatballBottomSheet(false);
				setTimeout(() => {
					setIsReportSuccessModalOpen(true);
				}, 100);
			} else {
				setIsReportFailModalOpen(true);
			}
		} else {
			alert('잘못된 접근의 게시물입니다.');
		}
	};

	const reportBottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '스팸',
				action: () => {
					postNewReport('스팸');
					setIsReportBottomSheetOpen(false);
					setIsReportSuccessModalOpen(true);
				},
			},
			{
				text: '부적절한 콘텐츠',
				action: () => {
					postNewReport('부적절한 콘텐츠');
					setIsReportBottomSheetOpen(false);
					setIsReportSuccessModalOpen(true);
				},
			},
			{
				text: '선정적',
				action: () => {
					postNewReport('선정적');
					setIsReportBottomSheetOpen(false);
					setIsReportSuccessModalOpen(true);
				},
			},
			{
				text: '직접 입력',
				action: () => {
					setShowInput((prev) => !prev);
				},
			},
		],
		marginBottom: '3.125rem',
	};

	const reportBottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isReportBottomSheetOpen,
		isHandlerVisible: true,
		Component: () => (
			<div style={{ overflow: 'auto' }}>
				<BottomSheetMenu {...reportBottomSheetMenuProps} />
				{showInput && (
					<ReportTextarea
						onCloseReportSheet={() => setIsReportBottomSheetOpen(false)}
						onOpenModal={() => setIsReportSuccessModalOpen(true)}
					/>
				)}
			</div>
		),
		onCloseBottomSheet: () => {
			setIsReportBottomSheetOpen(false);
			setShowInput(false);
		},
	};

	return <BottomSheet {...reportBottomSheetProps} />;
};

export default ReportBottomSheet;
