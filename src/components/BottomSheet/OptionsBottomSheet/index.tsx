import { useState } from 'react';
import BottomSheet from '..';
import BottomSheetMenu from '@components/BottomSheetMenu';
import ReportBottomSheetMenu from './ReportBottomSheetMenu';
import Modal from '@components/Modal';

import { OptionsBottomSheetProps } from './dto';
import { BottomSheetProps } from '../dto';
import { BottomSheetMenuProps } from '@components/BottomSheetMenu/dto';
import { ReportBottomSheetMenuProps } from './ReportBottomSheetMenu/dto';
import { ModalProps } from '@components/Modal/dto';

import { SendPostReportRequest } from '@apis/post-report/dto';
import { PostUserReportRequest } from '@apis/user-report/dto';
import { PostUserBlockRequest } from '@apis/user-block/dto';

import { StyledText } from '@components/Text/StyledText';
import { handleError } from '@apis/util/handleError';
import blockIcon from '@assets/default/block.svg';
import reportIcon from '@assets/default/report.svg';
import closeIcon from '@assets/default/modal-close-white.svg';

import {
	ReportBottomSheetLayout,
	ReportModalLayout,
	ReportModalWrapper,
	ReportModalContainer,
	ReportModalHeader,
	CloseButton,
	ReportModalBox,
} from './styles';
import theme from '@styles/theme';
import { postUserBlockApi } from '@apis/user-block';
import { postUserReportApi } from '@apis/user-report';
import { sendPostReportApi } from '@apis/post-report';
import { getCurrentUserId } from '@utils/getCurrentUserId';

const OptionsBottomSheet: React.FC<OptionsBottomSheetProps> = ({
	domain,
	targetId,
	targetNickname,
	isBottomSheetOpen,
	onClose,
}) => {
	const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
	const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');
	const currentUserId = getCurrentUserId();

	const handleBackgroundClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (e.target === e.currentTarget) {
			setIsReportBottomSheetOpen(false);
		}
	};

	// 유저 차단 api
	const postUserBlock = async () => {
		try {
			const request: PostUserBlockRequest = {
				fromUserId: currentUserId,
				toUserId: targetId.userId || -1,
				action: 'block',
			};
			const response = await postUserBlockApi(request);

			if (response.isSuccess) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error, 'user');
			setModalContent(errorMessage);
		} finally {
			setIsBlockModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 유저 또는 게시글 신고 api
	const sendReport = async (reason: string) => {
		try {
			let reportData: PostUserReportRequest | SendPostReportRequest;

			if (domain === 'user') {
				reportData = {
					fromUserId: currentUserId,
					toUserId: targetId.userId || -1,
					reason: reason,
				};
			} else {
				reportData = {
					requesterId: currentUserId,
					postId: targetId.postId || -1,
					reason: reason,
				};
			}

			const response =
				domain === 'user'
					? await postUserReportApi(reportData as PostUserReportRequest)
					: await sendPostReportApi(reportData as SendPostReportRequest);

			if (response.isSuccess) {
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
					onClose();
					setIsBlockModalOpen(true);
				},
				icon: blockIcon,
			},
			{
				text: '신고하기',
				action: () => {
					onClose();
					setIsReportBottomSheetOpen(true);
				},
				icon: reportIcon,
			},
		],
	};

	// 더보기 바텀시트
	const optionsBottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		Component: BottomSheetMenu,
		componentProps: optionsBottomSheetMenuProps,
		onCloseBottomSheet: onClose,
	};

	// 차단하기 모달
	const blockModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => {
			setIsBlockModalOpen(false);
		},
		content: `${targetNickname || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		button: {
			content: '차단하기',
			onClick: postUserBlock,
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
		onCloseBottomSheet: () => {
			setIsReportBottomSheetOpen(false);
		},
	};

	// api 처리 상태 모달 (성공/실패)
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<>
			<BottomSheet {...optionsBottomSheetProps} />
			{isBlockModalOpen && <Modal {...blockModalProps} />}
			{/* 신고하기 바텀시트 모바일 & 태블릿 UI */}
			<ReportBottomSheetLayout>
				<BottomSheet {...reportBottomSheetProps} />
			</ReportBottomSheetLayout>
			{/* 신고하기 바텀시트 데스크탑 UI */}
			{isReportBottomSheetOpen && (
				<ReportModalLayout>
					<ReportModalWrapper onClick={handleBackgroundClick}>
						<ReportModalContainer>
							<ReportModalHeader>
								<StyledText $textTheme={{ style: 'heading1-bold' }} color={theme.colors.white}>
									신고 사유 선택
								</StyledText>
								<CloseButton
									onClick={() => {
										setIsReportBottomSheetOpen(false);
									}}
								>
									<img src={closeIcon} alt="" />
								</CloseButton>
							</ReportModalHeader>
							<ReportModalBox>
								<ReportBottomSheetMenu {...reportBottomSheetMenuProps} />
							</ReportModalBox>
						</ReportModalContainer>
					</ReportModalWrapper>
				</ReportModalLayout>
			)}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</>
	);
};

export default OptionsBottomSheet;
