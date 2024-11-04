import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import PostBase from '../../components/PostBase/index.tsx';
import Modal from '../../components/Modal/index.tsx';
import PostCommentBottomSheet from '../../components/PostBottomSheets/PostCommentBottomSheet.tsx';
import MeatballBottomSheet from '../../components/PostBottomSheets/MeatballBottomSheet.tsx';
import ReportBottomSheet from '../../components/PostBottomSheets/ReportBottomSheet.tsx';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsPostCommentBottomSheetOpenAtom,
	IsPostCommentFailModalOpenAtom,
	IsPostCommentSuccessModalOpenAtom,
} from '../../recoil/Home/PostCommentBottomSheetAtom.ts';
import { IsMeatballBottomSheetOpenAtom } from '../../recoil/Home/MeatballBottomSheetAtom';
import {
	IsBlockFailModalOpenAtom,
	IsBlockSuccessModalOpenAtom,
	PostBlockAtom,
} from '../../recoil/Home/BlockBottomSheetAtom.ts';
import BlockConfirmationModal from '../../components/PostBottomSheets/BlockConfirmationModal.tsx';
import {
	IsReportFailModalOpenAtom,
	IsReportSuccessModalOpenAtom,
	PostReportAtom,
} from '../../recoil/Home/MeatballBottomSheetAtom.ts';

import { ModalProps } from '../../components/Modal/dto.ts';

const Post: React.FC = () => {
	const [, setIsMeatballBottomSheetOpen] = useRecoilState(IsMeatballBottomSheetOpenAtom);
	const [isBlockSuccessModalOpen, setIsBlockSuccessModalOpen] = useRecoilState(IsBlockSuccessModalOpenAtom);
	const [isBlockFailModalOpen, setIsBlockFailModalOpen] = useRecoilState(IsBlockFailModalOpenAtom);
	const postBlock = useRecoilValue(PostBlockAtom);
	const [isReportSuccessModalOpen, setIsReportSuccessModalOpen] = useRecoilState(IsReportSuccessModalOpenAtom);
	const [isReportFailModalOpen, setIsReportFailModalOpen] = useRecoilState(IsReportFailModalOpenAtom);
	const postReport = useRecoilValue(PostReportAtom);
	const [, setIsPostCommentBottomSheetOpen] = useRecoilState(IsPostCommentBottomSheetOpenAtom);
	const [isPostCommentSuccessModalOpen, setIsPostCommentSuccessModalOpen] = useRecoilState(
		IsPostCommentSuccessModalOpenAtom,
	);
	const [isPostCommentFailModalOpen, setIsPostCommentFailModalOpen] = useRecoilState(IsPostCommentFailModalOpenAtom);

	const location = useLocation();
	useEffect(() => {
		if (location.state && location.state.isCommentModalOpen) {
			setIsPostCommentBottomSheetOpen(true);
		}
	}, [location.state]);

	const handleMenuOpen = () => {
		setIsMeatballBottomSheetOpen(true);
	};

	// 신고하기 메뉴
	const reportSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsReportSuccessModalOpen(false);
		},
		content: `${postReport?.userName} 님의\nOOTD를 신고했어요\n사유 : ${postReport?.reason}`,
	};

	const reportFailModalProps: ModalProps = {
		onClose: () => {
			setIsReportFailModalOpen(false);
		},
		content: `신고에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	// 차단하기
	const blockSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsBlockSuccessModalOpen(false);
		},
		content: `${postBlock?.friendName} 님을 차단했어요`,
	};

	const blockFailModalProps: ModalProps = {
		onClose: () => {
			setIsBlockFailModalOpen(false);
		},
		content: `차단에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	// 코멘트 남기기
	const postCommentSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsPostCommentSuccessModalOpen(false);
		},
		content: '코멘트가 전달되었어요',
	};

	const postCommentFailModalProps: ModalProps = {
		onClose: () => {
			setIsPostCommentFailModalOpen(false);
		},
		content: '일시적인 오류입니다',
	};

	return (
		<>
			<PostBase onClickMenu={handleMenuOpen} />

			<MeatballBottomSheet />

			<ReportBottomSheet />
			{isReportSuccessModalOpen && <Modal {...reportSuccessModalProps} />}
			{isReportFailModalOpen && <Modal {...reportFailModalProps} />}

			<BlockConfirmationModal />
			{isBlockSuccessModalOpen && <Modal {...blockSuccessModalProps} />}
			{isBlockFailModalOpen && <Modal {...blockFailModalProps} />}

			<PostCommentBottomSheet />
			{isPostCommentSuccessModalOpen && <Modal {...postCommentSuccessModalProps} />}
			{isPostCommentFailModalOpen && <Modal {...postCommentFailModalProps} />}
		</>
	);
};

export default Post;
