import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { isPostRepresentativeAtom } from '../../recoil/Post/PostAtom';

import PostBase from '../../components/PostBase';
import Modal from '../../components/Modal';
import { ModalProps } from '../../components/Modal/dto';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';

import Edit from '../../assets/default/edit.svg';
import Pin from '../../assets/default/pin.svg';
import Delete from '../../assets/default/delete.svg';

import { modifyPostRepresentativeStatusApi, deletePostApi } from '../../apis/post';

const MyPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [isPostRepresentative, setIsPostRepresentative] = useRecoilState(isPostRepresentativeAtom);
	const [postPinStatus, setPostPinStatus] = useState<'지정' | '해제'>('지정');
	const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(false);
	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
	const [isApiResponseModalOpen, setIsApiResponseModalOpen] = useState(false);
	const [pinPostResultlModalContent, setPinPostResultlModalContent] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		if (isPostRepresentative) {
			setPostPinStatus('해제');
		} else {
			setPostPinStatus('지정');
		}
	}, [isPostRepresentative]);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: `대표 OOTD ${postPinStatus}하기`,
				action: () => {
					setIsMenuBottomSheetOpen(false);
					modifyPostRepresentativeStatus();
				},
				icon: Pin,
			},
			{
				text: 'OODD 수정하기',
				action: () => {
					setIsMenuBottomSheetOpen(false);
					handlePostEdit();
				},
				icon: Edit,
			},
			{
				text: 'OOTD 삭제하기',
				action: () => {
					setIsMenuBottomSheetOpen(false);
					setIsDeleteConfirmationModalOpen(true);
				},
				icon: Delete,
			},
		],
		marginBottom: '50px',
	};

	const menuBottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isMenuBottomSheetOpen,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => setIsMenuBottomSheetOpen(false),
	};

	const handleMenuOpen = () => {
		setIsMenuBottomSheetOpen(true);
	};

	const handlePostEdit = () => {
		navigate('/upload', { state: { mode: 'edit', postId: postId } });
	};

	const modifyPostRepresentativeStatus = async () => {
		try {
			const response = await modifyPostRepresentativeStatusApi(Number(postId));

			if (response.isSuccess) {
				setPinPostResultlModalContent(`대표 OOTD ${postPinStatus}에 성공했어요`);
				setIsPostRepresentative((prev) => !prev);
			} else {
				setPinPostResultlModalContent(`대표 OOTD ${postPinStatus}에 실패했어요\n잠시 뒤 다시 시도해 보세요`);
			}
		} catch (error) {
			console.error('Error pinning post:', error);
		} finally {
			setIsApiResponseModalOpen(true);
		}
	};

	const deletePost = async () => {
		try {
			const response = await deletePostApi(Number(postId));

			if (response.isSuccess) {
				setPinPostResultlModalContent('OOTD 삭제에 성공했어요');
				// 1초 뒤에 mypage로 이동
				setTimeout(() => {
					navigate('/mypage');
				}, 1000);
			} else {
				setPinPostResultlModalContent(`OOTD 삭제에 실패했어요\n잠시 뒤 다시 시도해 보세요`);
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		} finally {
			setIsApiResponseModalOpen(true);
			setIsDeleteConfirmationModalOpen(false); // 확인 모달을 닫음
		}
	};

	const deleteConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => setIsDeleteConfirmationModalOpen(false),
		content: '해당 OOTD를 삭제하시겠습니까?',
		button: {
			content: '삭제하기',
			onClick: deletePost,
		},
	};

	const apiResponseModalProps: ModalProps = {
		onClose: () => setIsApiResponseModalOpen(false),
		content: pinPostResultlModalContent,
	};

	return (
		<>
			<PostBase onClickMenu={handleMenuOpen} />

			<BottomSheet {...menuBottomSheetProps} />

			{isDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
			{isApiResponseModalOpen && <Modal {...apiResponseModalProps} />}
		</>
	);
};

export default MyPost;
