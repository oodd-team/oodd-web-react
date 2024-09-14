import { useRecoilState, useRecoilValue } from 'recoil';
import BottomSheet from '../../../components/BottomSheet';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import { useState } from 'react';
import {
	IsOpenMeatballBottomSheetAtom,
	IsOpenReportBottomSheetAtom,
	IsOpenReportFailModalAtom,
	IsOpenReportSuccessModalAtom,
	PostReportAtom,
} from '../../../recoil/MeatballBottomSheetAtom';
import BottomSheetMenu from '../../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../../components/BottomSheetMenu/dto';
import { ApiDto } from '../dto';
import request from '../../../apis/core';
import ReportTextarea from '../ReportTextarea';

const ReportBottomSheet: React.FC = () => {
	const [, setIsOpenMeatballBottomSheet] = useRecoilState(IsOpenMeatballBottomSheetAtom);
	const [isOpenReportBottomSheet, setIsOpenReportBottomSheet] = useRecoilState(IsOpenReportBottomSheetAtom);
	const [, setIsOpenReportSuccessModal] = useRecoilState(IsOpenReportSuccessModalAtom);
	const [, setIsOpenReportFailModal] = useRecoilState(IsOpenReportFailModalAtom);
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
				setIsOpenMeatballBottomSheet(false);
				setTimeout(() => {
					setIsOpenReportSuccessModal(true);
				}, 100);
			} else {
				setIsOpenReportFailModal(true);
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
					setIsOpenReportBottomSheet(false);
					setIsOpenReportSuccessModal(true);
				},
			},
			{
				text: '부적절한 콘텐츠',
				action: () => {
					postNewReport('부적절한 콘텐츠');
					setIsOpenReportBottomSheet(false);
					setIsOpenReportSuccessModal(true);
				},
			},
			{
				text: '선정적',
				action: () => {
					postNewReport('선정적');
					setIsOpenReportBottomSheet(false);
					setIsOpenReportSuccessModal(true);
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
		isOpenBottomSheet: isOpenReportBottomSheet,
		isHandlerVisible: true,
		Component: () => (
			<div style={{ overflow: 'auto' }}>
				<BottomSheetMenu {...reportBottomSheetMenuProps} />
				{showInput && (
					<ReportTextarea
						onCloseReportSheet={() => setIsOpenReportBottomSheet(false)}
						onOpenModal={() => setIsOpenReportSuccessModal(true)}
					/>
				)}
			</div>
		),
		onCloseBottomSheet: () => {
			setIsOpenReportBottomSheet(false);
			setShowInput(false);
		},
	};

	return <BottomSheet {...reportBottomSheetProps} />;
};

export default ReportBottomSheet;
