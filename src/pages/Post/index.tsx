import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import {
	IsOpenPostCommentBottomSheetAtom,
	IsOpenPostCommentFailModalAtom,
	IsOpenPostCommentSuccessModalAtom,
} from '../../recoil/Home/PostCommentBottomSheetAtom.ts';

import PostBase from '../../components/PostBase/index.tsx';
import BottomSheet from '../../components/BottomSheet/index.tsx';
import { BottomSheetProps } from '../../components/BottomSheet/dto.ts';
import BottomSheetMenu from '../../components/BottomSheetMenu/index.tsx';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto.ts';
import Modal from '../../components/Modal/index.tsx';
import ConfirmationModal from '../../components/ConfirmationModal/index.tsx';
import PostCommentBottomSheet from '../Home/BottomSheets/PostCommentBottomSheet.tsx';
import ReportTextarea from '../Home/ReportTextarea.tsx';

import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';

import { ModalProps } from '../../components/Modal/dto.ts';

const Post: React.FC = () => {
	const [userName, _] = useState('밍');
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [isReportSheetOpen, setIsReportSheetOpen] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
	const [, setIsOpenPostCommentBottomSheet] = useRecoilState(IsOpenPostCommentBottomSheetAtom);
	const [isOpenPostCommentSuccessModal, setIsOpenPostCommentSuccessModal] = useRecoilState(
		IsOpenPostCommentSuccessModalAtom,
	);
	const [isOpenPostCommentFailModal, setIsOpenPostCommentFailModal] = useRecoilState(IsOpenPostCommentFailModalAtom);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setIsBottomSheetOpen(false);
					setIsReportSheetOpen(true);
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsBottomSheetOpen(false);
					setIsConfirmationModalOpen(true);
				},
				icon: block,
			},
		],
		marginBottom: '3.125rem',
	};

	const reportSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '스팸',
				action: () => {
					setIsReportSheetOpen(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '부적절한 콘텐츠',
				action: () => {
					setIsReportSheetOpen(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '선정적',
				action: () => {
					setIsReportSheetOpen(false);
					setIsModalOpen(true);
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

	const bottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
			setShowInput(false);
		},
	};

	const handleBottomSheetOpen = () => {
		setIsBottomSheetOpen(true);
	};

	const confirmationModalProps = {
		content: `${userName}님을 정말로 차단하시겠습니까?`,
		isCancelButtonVisible: true,
		confirm: {
			text: '차단하기',
			action: () => {
				setIsConfirmationModalOpen(false);
				setIsBlockedModalOpen(true); // 차단 완료 모달 열기
			},
		},
		onCloseModal: () => {
			setIsConfirmationModalOpen(false);
		},
	};

	// 코멘트 남기기 버튼
	const postCommentSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsOpenPostCommentSuccessModal(false);
		},
		content: '코멘트가 전달되었어요',
	};

	const postCommentFailModalProps: ModalProps = {
		onClose: () => {
			setIsOpenPostCommentFailModal(false);
		},
		content: '일시적인 오류입니다',
	};

	return (
		<>
			<PostBase onClickMenu={handleBottomSheetOpen} />

			<BottomSheet {...bottomSheetProps} />
			{/* TODO: 신고하기 바텀시트 공통 컴포넌트로 분리하면서 수정 필요 */}
			<BottomSheet
				isOpenBottomSheet={isReportSheetOpen}
				isHandlerVisible={true}
				Component={() => (
					<div style={{ overflow: 'auto' }}>
						<BottomSheetMenu {...reportSheetMenuProps} />
						{showInput && (
							<ReportTextarea
								onCloseReportSheet={() => setIsReportSheetOpen(false)}
								onOpenModal={() => setIsModalOpen(true)}
							/>
						)}
					</div>
				)}
				onCloseBottomSheet={() => {
					setIsReportSheetOpen(false);
					setShowInput(false);
				}}
			/>

			{isModalOpen && <Modal content={`${userName}님의 OOTD를 신고했어요.`} onClose={() => setIsModalOpen(false)} />}
			{isConfirmationModalOpen && <ConfirmationModal {...confirmationModalProps} />}
			{isBlockedModalOpen && (
				<Modal content={`${userName}님을 차단했어요.`} onClose={() => setIsBlockedModalOpen(false)} />
			)}

			<PostCommentBottomSheet />
			{isOpenPostCommentSuccessModal && <Modal {...postCommentSuccessModalProps} />}
			{isOpenPostCommentFailModal && <Modal {...postCommentFailModalProps} />}
		</>
	);
};

export default Post;
