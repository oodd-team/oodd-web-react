import React, { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { IsBlockConfirmationModalOpenAtom, UserBlockAtom } from '../../../../recoil/Home/BlockBottomSheetAtom';
import {
	IsCommentDeleteConfirmationModalOpenAtom,
	IsCommentReportModalOpenAtom,
} from '../../../../recoil/Post/PostCommentAtom';

import { BigUserProfile, CommentItem as StyledCommentItem, CommentContent, MenuBtn } from './styles';

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

const CommentItem: React.FC<CommentItemProps> = ({ comment, handleUserClick, getPostCommentList }) => {
	const [showCommentMenuId, setShowCommentMenuId] = useState<number | null>(null);
	const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null); // 메뉴 표시할 댓글 ID
	const [isCommentDeleteConfirmationModalOpen, setIsCommentDeleteConfirmationModalOpen] = useRecoilState(
		IsCommentDeleteConfirmationModalOpenAtom,
	);
	const [, setIsCommentReportModalOpen] = useRecoilState(IsCommentReportModalOpenAtom);
	const [, setUserBlockAtom] = useRecoilState(UserBlockAtom);
	const [, setIsBlockConfirmationModalOpen] = useRecoilState(IsBlockConfirmationModalOpenAtom);

	useEffect(() => {
		console.log(comment);
	}, [comment]);

	// 댓글 삭제
	const deleteComment = async () => {
		if (!deleteCommentId) return;

		try {
			await deleteCommentApi(deleteCommentId); // 댓글 삭제 API 호출
			setDeleteCommentId(null); // 삭제 ID 초기화
			setIsCommentDeleteConfirmationModalOpen(false); // 모달 닫기
			await getPostCommentList(); // 댓글 목록 갱신
		} catch (error) {
			console.error('댓글 삭제 중 에러 발생:', error);
		}
	};

	const deleteConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => setIsCommentDeleteConfirmationModalOpen(false),
		content: '정말 댓글을 삭제하시겠습니까?',
		button: {
			content: '삭제',
			onClick: deleteComment,
		},
	};

	// 댓글 메뉴 클릭한 경우
	const handleCommentMenuClick = (commentId: number) => {
		console.log('메뉴 클릭');
		if (!commentId) return;
		console.log('메뉴 클릭!!!');
		setShowCommentMenuId((prevId) => (prevId === commentId ? null : commentId));
	};

	const menuItems = [
		...(comment.isCommentWriter
			? [
					{
						text: '삭제',
						action: () => {
							setDeleteCommentId(comment.id);
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
			action: () => setShowCommentMenuId(null),
			icon: X,
		},
	];

	return (
		<StyledCommentItem key={comment.id}>
			<BigUserProfile>
				<img
					src={comment.user.profilePictureUrl}
					onClick={() => handleUserClick(comment.user.userId)}
					alt="user avatar"
				/>
			</BigUserProfile>
			<CommentContent>
				<StyledText onClick={() => handleUserClick(comment.user.userId)} $textTheme={{ style: 'body2-medium' }}>
					{comment.user.nickname}
				</StyledText>
				<StyledText $textTheme={{ style: 'body2-regular' }}>{comment.content}</StyledText>
			</CommentContent>
			<MenuBtn onClick={() => handleCommentMenuClick(comment.id)}>
				<img src={More} alt="more" />
			</MenuBtn>

			{showCommentMenuId === comment.id && (
				<MenuButtonList items={menuItems} isVisible={showCommentMenuId === comment.id} />
			)}
			{isCommentDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
		</StyledCommentItem>
	);
};

export default CommentItem;
