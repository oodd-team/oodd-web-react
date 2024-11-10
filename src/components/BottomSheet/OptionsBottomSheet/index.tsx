import { useState } from 'react';
import BottomSheet from '..';
import BottomSheetMenu from '../../BottomSheetMenu';
import ReportBottomSheetMenu from './ReportBottomSheetMenu';
import Modal from '../../Modal';

import { OptionsBottomSheetProps } from './dto';
import { BottomSheetProps } from '../dto';
import { BottomSheetMenuProps } from '../../BottomSheetMenu/dto';
import { ReportBottomSheetMenuProps } from './ReportBottomSheetMenu/dto';
import { ModalProps } from '../../Modal/dto';

import { handleError } from '../../../apis/util/handleError';
import blockIcon from '../../../assets/default/block.svg';
import reportIcon from '../../../assets/default/report.svg';

const OptionsBottomSheet: React.FC<OptionsBottomSheetProps> = ({ domain, targetId, targetNickname, onClose }) => {
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(true);
	const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
	const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');

	const sendBlock = async () => {
		try {
			// user-block api 호출
			const response = true;

			// response.isSuccess
			if (response) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
		} finally {
			setIsBlockModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	const sendReport = async (reason: string) => {
		try {
			// user-report 또는 post-report api 호출
			const response = domain === 'user' ? `sendUserReportApi(${targetId})` : `sendPostReportApi(${targetId})`;
			console.log(reason);

			// response.isSuccess
			if (response) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error, domain);
			setModalContent(errorMessage);
		} finally {
			setIsReportBottomSheetOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 더보기 바텀시트 메뉴
	const optionsBottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '차단하기',
				action: () => {
					setIsOptionsBottomSheetOpen(false);
					setIsBlockModalOpen(true);
				},
				icon: blockIcon,
			},
			{
				text: '신고하기',
				action: () => {
					setIsOptionsBottomSheetOpen(false);
					setIsReportBottomSheetOpen(true);
				},
				icon: reportIcon,
			},
		],
	};

	// 더보기(kebab) 메뉴 바텀시트
	const optionsBottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOptionsBottomSheetOpen,
		Component: BottomSheetMenu,
		componentProps: optionsBottomSheetMenuProps,
		onCloseBottomSheet: onClose,
	};

	// 차단하기 모달
	const blockModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: onClose,
		content: `${targetNickname || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		button: {
			content: '차단하기',
			onClick: sendBlock,
		},
	};

	// 신고하기 바텀시트 메뉴 (신고 사유)
	const reportBottomSheetMenuProps: ReportBottomSheetMenuProps = {
		onCloseReportSheet: () => {
			setIsReportBottomSheetOpen(false);
		},
		onOpenStatusModal: () => {
			setIsStatusModalOpen(true);
		},
		sendReport: sendReport,
		isUserReport: domain === 'user',
	};

	// 신고하기 바텀시트
	const reportBottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isReportBottomSheetOpen,
		Component: ReportBottomSheetMenu,
		componentProps: reportBottomSheetMenuProps,
		onCloseBottomSheet: onClose,
	};

	// api 처리 상태 모달 (성공/실패)
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: onClose,
	};

	return (
		<>
			<BottomSheet {...optionsBottomSheetProps} />
			{isBlockModalOpen && <Modal {...blockModalProps} />}
			<BottomSheet {...reportBottomSheetProps} />
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</>
	);
};

export default OptionsBottomSheet;
