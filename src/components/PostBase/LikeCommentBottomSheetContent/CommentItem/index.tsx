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
import MenuButtonList from '../../MenuButtonList';
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
	const [isCommentDeleteConfirmationModalOpen, setIsCommentDeleteConfirmationModalOpen] = useRecoilState(
		IsCommentDeleteConfirmationModalOpenAtom,
	);
	const [, setIsCommentReportModalOpen] = useRecoilState(IsCommentReportModalOpenAtom);
	const [, setUserBlockAtom] = useRecoilState(UserBlockAtom);
	const [, setIsBlockConfirmationModalOpen] = useRecoilState(IsBlockConfirmationModalOpenAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>();

	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	useEffect(() => {
		// 메뉴 위치 초기화
		setMenuPosition({ top: 0, left: 0 });
	}, [isMenuVisible]);

	const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
		setIsMenuVisible((prev) => !prev);
	};

	useEffect(() => {
		setTimeAgo(dayjs(comment.createdAt).locale('ko').fromNow());
	}, [comment]);

	// 댓글 삭제
	const deleteComment = async () => {
		try {
			await deleteCommentApi(comment.id); // 댓글 삭제 API 호출
			setIsCommentDeleteConfirmationModalOpen(false); // 모달 닫기
			getPostCommentList(); // 댓글 목록 갱신
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
		if (!commentId) return;
		setShowCommentMenuId((prevId) => (prevId === commentId ? null : commentId));
	};

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
			action: () => setShowCommentMenuId(null),
			icon: X,
		},
	];

	return (
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
				<MenuBtn onClick={() => handleCommentMenuClick(comment.id)}>
					<img src={More} alt="more" />
				</MenuBtn>
			</RightContainer>
			{showCommentMenuId === comment.id && (
				<MenuButtonList
					items={menuItems}
					isVisible={showCommentMenuId === comment.id}
					onClose={() => setIsMenuVisible(false)}
				/>
			)}
			{isCommentDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
		</StyledCommentItem>
	);
};

export default CommentItem;
