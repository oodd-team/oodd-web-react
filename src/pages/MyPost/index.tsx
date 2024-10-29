import React, { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { OODDFrame } from '../../components/Frame/Frame';
import PostBase from '../../components/PostBase';
import ConfirmationModal from '../../components/ConfirmationModal';
import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';

import edit from '../../assets/MyPost/edit.svg';
//import delete from '../../assets/MyPost/delete.svg';
import pin from '../../assets/MyPost/pin.svg';

import request from '../../apis/core';
import { BaseApiResponse } from '../../apis/util/dto';

const MyPost: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '대표 OOTD로 지정하기',
				action: () => {
					setIsBottomSheetOpen(false);
					handlePinPost();
				},
				icon: pin,
			},
			{
				text: 'OODD 수정하기',
				action: () => {
					setIsBottomSheetOpen(false);
					handleEditPost();
				},
				icon: edit,
			},
			{
				text: 'OOTD 삭제하기',
				action: () => {
					setIsBottomSheetOpen(false);
					handleDeletePost();
				},
				icon: edit,
			},
		],
		marginBottom: '50px',
	};

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => setIsBottomSheetOpen(false),
	};

	const handleBottomSheetOpen = () => {
		setIsBottomSheetOpen(true);
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
			setIsConfirmationModalOpen(false); // 확인 모달을 닫음
		}
	};

	const handleDeletePost = () => {
		setIsConfirmationModalOpen(true);
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
			setIsConfirmationModalOpen(false); // 확인 모달을 닫음
		}
	};

	const handleCancelDelete = () => {
		setIsConfirmationModalOpen(false);
	};

	return (
		<OODDFrame>
			<PostBase onClickMenu={handleBottomSheetOpen} />

			<BottomSheet {...bottomSheetProps} />

			{isConfirmationModalOpen && (
				<ConfirmationModal
					content="해당 OOTD를 삭제하시겠습니까?"
					isCancelButtonVisible={true}
					confirm={{ text: '삭제하기', action: handleConfirmDelete }}
					onCloseModal={handleCancelDelete}
				/>
			)}
		</OODDFrame>
	);
};

export default MyPost;
