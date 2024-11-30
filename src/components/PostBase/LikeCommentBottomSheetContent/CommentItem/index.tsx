import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { IsBlockConfirmationModalOpenAtom, UserBlockAtom } from '../../../../recoil/Home/BlockBottomSheetAtom';
import {
	IsCommentDeleteConfirmationModalOpenAtom,
	IsCommentReportModalOpenAtom,
} from '../../../../recoil/Post/PostCommentAtom';

import theme from '../../../../styles/theme';
import {
	StyledBigUserProfile,
	CommentItem as StyledCommentItem,
	CommentContent,
	RightContainer,
	MenuBtn,
} from './styles';

import { StyledText } from '../../../Text/StyledText';
import MenuButtonList from '../MenuButtonList';
import Modal from '../../../Modal';

import { ModalProps } from '../../../Modal/dto';
import { CommentItemProps } from './dto';

import More from '../../../../assets/default/more.svg';
import Delete from '../../../../assets/default/delete.svg';
import Block from '../../../../assets/default/block.svg';
import Report from '../../../../assets/default/report.svg';
import X from '../../../../assets/default/x.svg';

import { deleteCommentApi } from '../../../../apis/post-comment';

import { handleError } from '../../../../apis/util/handleError';

const CommentItem: React.FC<CommentItemProps> = ({ comment, handleUserClick, getPostCommentList }) => {
	const [selectedCommentId, setSelectedCommentId] = useState<number>(comment.id);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	const [isCommentDeleteConfirmationModalOpen, setIsCommentDeleteConfirmationModalOpen] = useRecoilState(
		IsCommentDeleteConfirmationModalOpenAtom,
	);
	const [, setIsCommentReportModalOpen] = useRecoilState(IsCommentReportModalOpenAtom);
	const [, setUserBlockAtom] = useRecoilState(UserBlockAtom);
	const [, setIsBlockConfirmationModalOpen] = useRecoilState(IsBlockConfirmationModalOpenAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>();

	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');

	useEffect(() => {
		setTimeAgo(dayjs(comment.createdAt).locale('ko').fromNow());
	}, [comment]);

	// 댓글 메뉴 클릭한 경우
	const handleMenuOpen = (commentId: number, event: React.MouseEvent<HTMLButtonElement>) => {
		setSelectedCommentId(commentId);
		const rect = event.currentTarget.getBoundingClientRect();
		setMenuPosition({ top: rect.bottom + window.scrollY - 90, left: rect.left + window.scrollX - 100 });
		setIsMenuVisible(true);
	};

	// 댓글 삭제
	const deleteComment = async (commentId: number) => {
		try {
			console.log('comment.id: ', comment.id);
			console.log('clickedCommentID: ', commentId);
			await deleteCommentApi(commentId); // 댓글 삭제 API 호출
			getPostCommentList(); // 댓글 목록 갱신
		} catch (error) {
			const errorMessage = handleError(error, 'postComment');
			setModalContent(errorMessage); // 에러 메시지 설정
			setIsStatusModalOpen(true); // 상태 모달 열기
		} finally {
			setIsCommentDeleteConfirmationModalOpen(false); // 모달 닫기
			setIsMenuVisible(false);
		}
	};

	const deleteConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => setIsCommentDeleteConfirmationModalOpen(false),
		content: '정말 댓글을 삭제하시겠습니까?',
		button: {
			content: '삭제',
			onClick: () => deleteComment(selectedCommentId),
		},
	};

	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => setIsStatusModalOpen(false),
	};

	// 본인 댓글인지, 타 사용자 댓글인지에 따른 조건부 메뉴 항목
	const menuItems = [
		...(comment.isCommentWriter
			? [
					{
						text: '삭제',
						action: () => {
							setIsCommentDeleteConfirmationModalOpen(true);
						},
						icon: Delete,
						color: 'red',
					},
				]
			: [
					{
						text: '신고하기',
						action: () => {
							setIsCommentReportModalOpen(true);
						},
						icon: Report,
					},
					{
						text: '차단하기',
						action: () => {
							const storedUserId = localStorage.getItem('id');
							if (storedUserId) {
								setUserBlockAtom({
									userId: Number(storedUserId),
									friendId: comment.user.userId,
									friendName: comment.user.nickname,
									action: 'toggle',
								});
								setIsBlockConfirmationModalOpen(true);
							}
						},
						icon: Block,
					},
				]),
		{
			text: '취소',
			action: () => setIsMenuVisible(false),
			icon: X,
		},
	];

	return (
		<>
			<StyledCommentItem key={comment.id}>
				<StyledBigUserProfile>
					<img
						src={comment.user.profilePictureUrl}
						onClick={() => handleUserClick(comment.user.userId)}
						alt="user avatar"
					/>
				</StyledBigUserProfile>
				<CommentContent>
					<StyledText onClick={() => handleUserClick(comment.user.userId)} $textTheme={{ style: 'body2-medium' }}>
						{comment.user.nickname}
					</StyledText>
					<StyledText $textTheme={{ style: 'body2-regular' }}>{comment.content}</StyledText>
				</CommentContent>
				<RightContainer>
					<StyledText className="timeAgo" $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray3}>
						{timeAgo}
					</StyledText>
					<MenuBtn onClick={(event) => handleMenuOpen(comment.id, event)}>
						<img src={More} alt="more" />
					</MenuBtn>
				</RightContainer>
			</StyledCommentItem>
			{isMenuVisible && (
				<MenuButtonList items={menuItems} onClose={() => setIsMenuVisible(false)} position={menuPosition} />
			)}
			{isCommentDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</>
	);
};

export default CommentItem;
