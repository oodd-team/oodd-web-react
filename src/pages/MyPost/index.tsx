import React, { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import PostBase from '../../components/PostBase';
import Modal from '../../components/Modal';
import { ModalProps } from '../../components/Modal/dto';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';

import Edit from '../../assets/BottomSheetMenu/Edit.svg';
import Pin from '../../assets/BottomSheetMenu/Pin.svg';
import Delete from '../../assets/BottomSheetMenu/Delete.svg';

import request from '../../apis/core';
import { BaseApiResponse } from '../../apis/util/dto';

const MyPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(false);
	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
	const navigate = useNavigate();

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '대표 OOTD로 지정하기',
				action: () => {
					setIsMenuBottomSheetOpen(false);
					handlePinPost();
				},
				icon: Pin,
			},
			{
				text: 'OODD 수정하기',
				action: () => {
					setIsMenuBottomSheetOpen(false);
					handleEditPost();
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

	const handleEditPost = () => {
		navigate('/upload', { state: { mode: 'edit', postId: postId } });
	};

	const handlePinPost = async () => {
		// localStorage에서 storedUserId를 가져옴
		const storedUserId = localStorage.getItem('id');

		if (!storedUserId) {
			console.error('User ID not found');
			return;
		}

		try {
			const response = await request.patch<BaseApiResponse>(`/posts/${postId}/isRepresentative/${storedUserId}`, {
				isRepresentative: true,
			});

			if (response.isSuccess) {
				console.log('Post pinned successfully:', response.result);
				// PostDetail 재로드
				//fetchPostDetail();
				navigate('/mypage');
			} else {
				console.error('Failed to pin post:', response.message);
			}
		} catch (error) {
			console.error('Error pinning post:', error);
		} finally {
			setIsDeleteConfirmationModalOpen(false); // 확인 모달을 닫음
		}
	};

	const handleConfirmDelete = async () => {
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
			onClick: handleConfirmDelete,
		},
	};

	return (
		<>
			<PostBase onClickMenu={handleMenuOpen} />

			<BottomSheet {...menuBottomSheetProps} />

			{isDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
		</>
	);
};

export default MyPost;
