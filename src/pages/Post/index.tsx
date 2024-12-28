import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useRecoilState } from 'recoil';
import { postIdAtom, userAtom } from '@recoil/Post/PostAtom.ts';
import { isPostRepresentativeAtom } from '@recoil/Post/PostAtom';

import PostBase from './PostBase/index.tsx';
import OptionsBottomSheet from '@components/BottomSheet/OptionsBottomSheet/index.tsx';
import { OptionsBottomSheetProps } from '@components/BottomSheet/OptionsBottomSheet/dto.ts';
import Modal from '@components/Modal';
import { ModalProps } from '@components/Modal/dto';
import BottomSheet from '@components/BottomSheet';
import { BottomSheetProps } from '@components/BottomSheet/dto';
import BottomSheetMenu from '@components/BottomSheetMenu';
import { BottomSheetMenuProps } from '@components/BottomSheetMenu/dto';

import Edit from '@assets/default/edit.svg';
import Pin from '@assets/default/pin.svg';
import Delete from '@assets/default/delete.svg';

import { modifyPostRepresentativeStatusApi, deletePostApi } from '@apis/post';

const Post: React.FC = () => {
	const userId = localStorage.getItem('current_user_id');
	const user = useRecoilValue(userAtom);
	const postId = useRecoilValue(postIdAtom);
	const [isMyPost, setIsMyPost] = useState(false);
	const [isPostRepresentative, setIsPostRepresentative] = useRecoilState(isPostRepresentativeAtom);

	const [isMyPostMenuBottomSheetOpen, setIsMyPostMenuBottomSheetOpen] = useState(false);
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false);

	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
	const [isApiResponseModalOpen, setIsApiResponseModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const [postPinStatus, setPostPinStatus] = useState<'지정' | '해제'>('지정');
	const navigate = useNavigate();

	useEffect(() => {
		// 현재 게시글이 내 게시글인지 확인
		if (user?.id && postId) {
			setIsMyPost(Number(userId) === user.id);
		}
	}, [user, postId]);

	const handleMenuOpen = () => {
		{
			isMyPost ? setIsMyPostMenuBottomSheetOpen(true) : setIsOptionsBottomSheetOpen(true);
		}
	};

	useEffect(() => {
		setPostPinStatus(isPostRepresentative ? '해제' : '지정');
	}, [isPostRepresentative]);

	// MyPost 전용 메뉴 구성
	const myPostMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: `대표 OOTD ${postPinStatus}하기`,
				action: () => {
					setIsMyPostMenuBottomSheetOpen(false);
					modifyPostRepresentativeStatus();
				},
				icon: Pin,
			},
			{
				text: 'OOTD 수정하기',
				action: () => {
					setIsMyPostMenuBottomSheetOpen(false);
					navigate('/upload', { state: { mode: 'edit', postId: postId } });
				},
				icon: Edit,
			},
			{
				text: 'OOTD 삭제하기',
				action: () => {
					setIsMyPostMenuBottomSheetOpen(false);
					setIsDeleteConfirmationModalOpen(true);
				},
				icon: Delete,
			},
		],
	};

	// 일반 Post 메뉴 구성
	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'post',
		targetId: {
			userId: user.id || -1,
			postId: postId || -1,
		},
		targetNickname: user.nickname || '알수없음',
		isBottomSheetOpen: isOptionsBottomSheetOpen,
		onClose: () => {
			setIsOptionsBottomSheetOpen(false);
		},
	};

	const menuBottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isMyPostMenuBottomSheetOpen,
		Component: BottomSheetMenu,
		componentProps: isMyPost ? myPostMenuProps : optionsBottomSheetProps,
		onCloseBottomSheet: () => setIsMyPostMenuBottomSheetOpen(false),
	};

	const modifyPostRepresentativeStatus = async () => {
		try {
			const response = await modifyPostRepresentativeStatusApi(Number(postId));

			if (response.isSuccess) {
				setModalContent(`대표 OOTD ${postPinStatus}에 성공했어요`);
				setIsPostRepresentative((prev) => !prev);
			} else {
				setModalContent(`대표 OOTD ${postPinStatus}에 실패했어요\n잠시 뒤 다시 시도해 보세요`);
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
				setModalContent('OOTD 삭제에 성공했어요');

				setTimeout(() => {
					navigate(`/profile/${userId}`);
				}, 1000);
			} else {
				setModalContent(`OOTD 삭제에 실패했어요\n잠시 뒤 다시 시도해 보세요`);
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
		content: modalContent,
	};

	return (
		<>
			<PostBase onClickMenu={handleMenuOpen} />

			<OptionsBottomSheet {...optionsBottomSheetProps} />
			<BottomSheet {...menuBottomSheetProps} />

			{isDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
			{isApiResponseModalOpen && <Modal {...apiResponseModalProps} />}
		</>
	);
};

export default Post;
