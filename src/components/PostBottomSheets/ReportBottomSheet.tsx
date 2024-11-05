import { useState } from 'react';

import BottomSheet from '../BottomSheet';
import BottomSheetMenu from '../BottomSheetMenu';
import ReportTextarea from './ReportTextArea';

import { BottomSheetProps } from '../BottomSheet/dto';
import { BottomSheetMenuProps } from '../BottomSheetMenu/dto';
import { ApiDto } from './dto';

import { useRecoilState } from 'recoil';
import {
	IsMeatballBottomSheetOpenAtom,
	IsReportBottomSheetOpenAtom,
	IsReportFailModalOpenAtom,
	IsReportSuccessModalOpenAtom,
	PostReportAtom,
} from '../../recoil/Home/MeatballBottomSheetAtom';
import { postIdAtom, userIdAtom, userNameAtom } from '../../recoil/Post/PostAtom';

import request from '../../apis/core';

const ReportBottomSheet: React.FC = () => {
	const [postId] = useRecoilState(postIdAtom);
	const [userId] = useRecoilState(userIdAtom);
	const [userName] = useRecoilState(userNameAtom);
	const [, setIsMeatballBottomSheet] = useRecoilState(IsMeatballBottomSheetOpenAtom);
	const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useRecoilState(IsReportBottomSheetOpenAtom);
	const [, setIsReportSuccessModalOpen] = useRecoilState(IsReportSuccessModalOpenAtom);
	const [, setIsReportFailModalOpen] = useRecoilState(IsReportFailModalOpenAtom);
	const [postReport, setPostReport] = useRecoilState(PostReportAtom);

	const [showInput, setShowInput] = useState(false);

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

	const postNewReport = async (message: string) => {
		setPostReport({ postId: postId, userId: userId, userName: userName, reason: message });

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
