import React, { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

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

import request from '../../apis/core';
import { BaseApiResponse } from '../../apis/util/dto';
import { modifyPostRepresentativeStatusApi, modifyPostApi, deletePostApi } from '../../apis/post';

const MyPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(false);
	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
	const [isPinPostResultModalOpen, setIsPinPostResultModalOpen] = useState(false);
	const [pinPostResultlModalContent, setPinPostResultlModalContent] = useState('');
	const navigate = useNavigate();

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '대표 OOTD로 지정하기',
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
				setPinPostResultlModalContent('대표 게시물 지정에 성공했어요');
				//navigate('/mypage');
			} else {
				setPinPostResultlModalContent(`대표 게시물 지정에 실패했어요\n잠시 뒤 다시 시도해 보세요`);
			}
		} catch (error) {
			console.error('Error pinning post:', error);
		} finally {
			setIsPinPostResultModalOpen(true);
		}
	};

	const handlePostDelete = async () => {
		try {
			const response = await request.delete<BaseApiResponse>(`/posts/${postId}`);
			if (response.message === 'Post deleted successfully') {
				console.log(response.message);
				navigate('/mypage'); // 성공적으로 삭제 후 다른 페이지로 이동
			} else {
				console.error('Unexpected response:', response.message);
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		} finally {
			setIsDeleteConfirmationModalOpen(false); // 확인 모달을 닫음
		}
	};

	const deleteConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => setIsDeleteConfirmationModalOpen(false),
		content: '해당 OOTD를 삭제하시겠습니까?',
		button: {
			content: '삭제하기',
			onClick: handlePostDelete,
		},
	};

	const pinPostResultModalProps: ModalProps = {
		onClose: () => setIsPinPostResultModalOpen(false),
		content: pinPostResultlModalContent,
	};

	return (
		<>
			<PostBase onClickMenu={handleMenuOpen} />

			<BottomSheet {...menuBottomSheetProps} />

			{isDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
			{isPinPostResultModalOpen && <Modal {...pinPostResultModalProps} />}
		</>
	);
};

export default MyPost;
