import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import {
	IsOpenPostCommentFailModalAtom,
	IsOpenPostCommentSuccessModalAtom,
} from '../../recoil/Home/PostCommentBottomSheetAtom.ts';

import PostBase from '../../components/PostBase/index.tsx';
import BottomSheet from '../../components/BottomSheet/index.tsx';
import BottomSheetMenu from '../../components/BottomSheetMenu/index.tsx';
import Modal from '../../components/Modal/index.tsx';
import ConfirmationModal from '../../components/ConfirmationModal/index.tsx';
import PostCommentBottomSheet from '../Home/BottomSheets/PostCommentBottomSheet.tsx';
import ReportTextarea from '../Home/ReportTextarea.tsx';

import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';

import { BottomSheetProps } from '../../components/BottomSheet/dto.ts';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto.ts';
import { ModalProps } from '../../components/Modal/dto.ts';

const Post: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [userName, setUserName] = useState('');
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [activeSheet, setActiveSheet] = useState<'menu' | 'report' | null>(null); // 활성화된 바텀시트 관리
	const [showInput, setShowInput] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
	const [isOpenPostCommentSuccessModal, setIsOpenPostCommentSuccessModal] = useRecoilState(
		IsOpenPostCommentSuccessModalAtom,
	);
	const [isPostCommentFailModalOpen, setIsPostCommentFailModalOpen] = useRecoilState(IsPostCommentFailModalOpenAtom);

	useEffect(() => {}, []);
	// 메뉴 바텀시트 아이템 설정
	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setActiveSheet('report'); // 신고 바텀시트 열기
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsConfirmationModalOpen(true); // 차단 모달 열기
				},
				icon: block,
			},
		],
		marginBottom: '3.125rem',
	};

	// 신고 바텀시트 아이템 설정
	const reportBottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '스팸',
				action: () => setIsModalOpen(true),
			},
			{
				text: '부적절한 콘텐츠',
				action: () => setIsModalOpen(true),
			},
			{
				text: '선정적',
				action: () => setIsModalOpen(true),
			},
			{
				text: '직접 입력',
				action: () => setShowInput((prev) => !prev),
			},
		],
		marginBottom: '3.125rem',
	};

	// BottomSheet props 설정
	const bottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isBottomSheetOpen,
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: activeSheet === 'menu' ? bottomSheetMenuProps : reportBottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
			setActiveSheet(null);
			setShowInput(false);
		},
	};

	// 차단 모달 설정
	const confirmationModalProps = {
		content: `${userName}님을 정말로 차단하시겠습니까?`,
		isCancelButtonVisible: true,
		confirm: {
			text: '차단하기',
			action: () => {
				setIsConfirmationModalOpen(false);
				setIsBlockedModalOpen(true);
			},
		},
		onCloseModal: () => setIsConfirmationModalOpen(false),
	};

	const handleBottomSheetOpen = (sheet: 'menu' | 'report') => {
		setActiveSheet(sheet);
		setIsBottomSheetOpen(true);
	};

	const postCommentSuccessModalProps: ModalProps = {
		content: '코멘트가 전달되었어요',
		onClose: () => setIsOpenPostCommentSuccessModal(false),
	};

	const postCommentFailModalProps: ModalProps = {
		content: '일시적인 오류입니다',
		onClose: () => setIsOpenPostCommentFailModal(false),
	};

	return (
		<>
			<PostBase onClickMenu={() => handleBottomSheetOpen('menu')} />

			<BottomSheet {...bottomSheetProps} />

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
