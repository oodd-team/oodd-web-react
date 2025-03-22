import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useRecoilState } from 'recoil';

import { modifyPostRepresentativeStatusApi, deletePostApi } from '@apis/post';
import { isPostRepresentativeAtom, postIdAtom, userAtom } from '@recoil/Post/PostAtom';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import back from '@assets/arrow/left.svg';
import Delete from '@assets/default/delete.svg';
import Edit from '@assets/default/edit.svg';
import Pin from '@assets/default/pin.svg';

import BottomSheet from '@components/BottomSheet';
import BottomSheetMenu from '@components/BottomSheet/BottomSheetMenu';
import OptionsBottomSheet from '@components/BottomSheet/OptionsBottomSheet';
import { OODDFrame } from '@components/Frame/Frame';
import Modal from '@components/Modal';
import Skeleton from '@components/Skeleton';
import TopBar from '@components/TopBar/index';

import type { BottomSheetMenuProps } from '@components/BottomSheet/BottomSheetMenu/dto';
import type { BottomSheetProps } from '@components/BottomSheet/dto';
import type { OptionsBottomSheetProps } from '@components/BottomSheet/OptionsBottomSheet/dto';
import type { ModalProps } from '@components/Modal/dto';

import PostBase from './PostBase/index';

import { PicWrapper, NameWrapper, InfoWrapper, PostWrapper } from './styles';

const Post: React.FC = () => {
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

	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();
	const currentUserId = getCurrentUserId();

	const handleMenuOpen = () => {
		if (isMyPost) {
			setIsMyPostMenuBottomSheetOpen(true);
		} else {
			setIsOptionsBottomSheetOpen(true);
		}
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
					navigate(`/profile/${currentUserId}`);
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

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		// 현재 게시글이 내 게시글인지 확인
		if (user?.id && postId) {
			setIsMyPost(currentUserId === user.id);
		}
	}, [user, postId]);

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
					navigate('/post/upload/content', { state: { mode: 'edit', postId: postId } });
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

	if (isLoading) {
		return (
			<OODDFrame>
				<TopBar LeftButtonSrc={back} onClickLeftButton={() => navigate(-1)} />
				<InfoWrapper>
					<PicWrapper>
						<Skeleton width={40} height={40} borderRadius={40} />
					</PicWrapper>
					<NameWrapper>
						<Skeleton width={100} height={20} />
					</NameWrapper>
				</InfoWrapper>
				<PostWrapper>
					<Skeleton width="100%" height={800} />
				</PostWrapper>
			</OODDFrame>
		);
	}

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
