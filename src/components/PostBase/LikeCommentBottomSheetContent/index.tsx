import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
	TabContainer,
	Tab,
	ContentContainer,
	Content,
	BigUserProfile,
	UserItem,
	CommentItem,
	CommentContent,
	InputLayout,
	MenuBtn,
	CommentDeleteButton,
} from './styles';

import { StyledText } from '../../Text/StyledText';
import theme from '../../../styles/theme';
import Loading from '../../Loading';
import Modal from '../../Modal';

import More from '../../../assets/default/more.svg';
import Delete from '../../../assets/default/delete.svg';

import { LikeCommentBottomSheetProps } from '../dto';
import { ModalProps } from '../../Modal/dto';
import { GetPostLikeListResponse } from '../../../apis/post-like/dto';
import { GetCommentListResponse } from '../../../apis/post-comment/dto';

import { getPostLikeListApi } from '../../../apis/post-like';
import { createCommentApi, getCommentListApi, deleteCommentApi } from '../../../apis/post-comment';

const LikeCommentBottomSheetContent: React.FC<LikeCommentBottomSheetProps> = ({ tab, likeCount, commentCount }) => {
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>(tab);
	const { postId } = useParams<{ postId: string }>();
	const [likes, setLikes] = useState<GetPostLikeListResponse['data']['likes']>([]);
	const [comments, setComments] = useState<GetCommentListResponse['data']['comments']>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const [showDeleteButtonId, setShowDeleteButtonId] = useState<number | null>(null); // 삭제 버튼 표시 관리
	const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null); // 모달에서 삭제할 댓글 ID
	const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false); // 모달 표시 관리
	const [inputValue, setInputValue] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const nav = useNavigate();

	useEffect(() => {
		setPage(1);
		setReachedEnd(false);
		setLikes([]);
		setComments([]);

		if (activeTab === 'likes') {
			getPostLikeList(1);
		} else if (activeTab === 'comments') {
			//getPostCommentList(1);
			getPostCommentList();
		}
	}, [activeTab]);

	// IntersectionObserver를 활용하여 무한 스크롤 감지
	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect();

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting && !isLoading) {
				//if (activeTab === 'likes') {
				getPostLikeList(page);
				/*
				} else if (activeTab === 'comments') {
					
					getPostCommentList();
				}
				*/
			}
		};

		observerRef.current = new IntersectionObserver(handleIntersection, {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		});

		if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

		return () => {
			if (observerRef.current) observerRef.current.disconnect();
		};
	}, [page, reachedEnd, loadMoreRef.current, activeTab]);

	// 좋아요 리스트 불러오기
	const getPostLikeList = async (currentPage: number) => {
		if (reachedEnd) return;

		setIsLoading(true);
		try {
			const response = await getPostLikeListApi(Number(postId), currentPage);
			const data = response.data;

			if (data.likes.length === 0) {
				setReachedEnd(true);
			} else {
				setLikes((prev) => [...prev, ...data.likes]);
				setPage((prev) => prev + 1);
			}
		} catch (error) {
			console.error('Error fetching likes:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// 댓글 리스트 불러오기
	const getPostCommentList = async () => {
		//페이징 처리 우선 주석
		//if (isLoading || reachedEnd) return;

		setIsLoading(true);
		try {
			const response = await getCommentListApi(Number(postId));
			const data = response.data;

			setComments(data.comments);

			/* //페이징 처리 우선 주석
			if (data.comments.length === 0) {
				setReachedEnd(true);
			} else {
				setComments((prev) => [...prev, ...data.comments]);
				setPage((prev) => prev + 1);
			}
			*/
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	}, []);

	// 댓글 작성
	const createComment = async () => {
		const content = inputValue.trim();
		try {
			const response = await createCommentApi(Number(postId), { content }); // API 호출
			setInputValue(''); // 입력창 초기화
			getPostCommentList();
		} catch (error) {
			console.error('댓글 작성 중 에러 발생:', error);
		}
	};

	//댓글 메뉴 클릭한 경우
	const handleCommentMenuClick = (commentId: number, isCommentWriter: Boolean) => {
		if (!commentId) return;

		if (isCommentWriter) {
			setShowDeleteButtonId((prev) => (prev === commentId ? null : commentId));
		} else {
			//댓글 신고 등 *****추후 수정******
			return;
		}
	};

	const deleteConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => setIsDeleteConfirmationModalOpen(false),
		content: '정말 댓글을 삭제하시겠습니까?',
		button: {
			content: '삭제',
			onClick: async () => {
				if (!deleteCommentId) return;
				try {
					await deleteCommentApi(deleteCommentId); // 댓글 삭제 API 호출
					setComments((prev) => prev.filter((comment) => comment.commentId !== deleteCommentId)); // 댓글 리스트 업데이트
				} catch (error) {
					console.error('Error deleting comment:', error);
				} finally {
					setIsDeleteConfirmationModalOpen(false);
					setDeleteCommentId(null);
				}
			},
		},
	};

	const handleUserClick = (userId: number) => {
		// 로컬 스토리지에서 사용자 ID 가져오기
		const myUserId = localStorage.getItem('my_id'); // 로컬 스토리지에 저장된 사용자 ID를 가져옴

		if (String(myUserId) === String(userId)) {
			// 나인 경우
			nav('/mypage');
		} else {
			// 다른 유저인 경우
			nav(`/users/${userId}`);
		}
	};

	return (
		<>
			<TabContainer>
				<Tab active={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
					<StyledText
						$textTheme={{ style: 'body2-bold' }}
						color={activeTab === 'likes' ? theme.colors.pink : theme.colors.gray3}
					>
						좋아요 {likeCount || 0}
					</StyledText>
				</Tab>
				<Tab active={activeTab === 'comments'} onClick={() => setActiveTab('comments')}>
					<StyledText
						$textTheme={{ style: 'body2-bold' }}
						color={activeTab === 'comments' ? theme.colors.pink : theme.colors.gray3}
					>
						코멘트 {commentCount || 0}
					</StyledText>
				</Tab>
			</TabContainer>

			<ContentContainer>
				{activeTab === 'likes' &&
					(likes.length === 0 ? (
						<Content $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
							아직 좋아요가 없습니다
						</Content>
					) : (
						likes.map((like) => (
							<UserItem key={like.user.id} onClick={() => handleUserClick(like.user.id)}>
								<BigUserProfile>
									<img src={like.user.profilePictureUrl} alt="user avatar" />
								</BigUserProfile>
								<StyledText className="name" $textTheme={{ style: 'body2-medium' }}>
									{like.user.nickname}
								</StyledText>
							</UserItem>
						))
					))}

				{activeTab === 'comments' && (
					<>
						{comments.length === 0 ? (
							<Content $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
								아직 댓글이 없습니다
							</Content>
						) : (
							comments.map((comment) => (
								<CommentItem key={comment.commentId}>
									<BigUserProfile>
										<img
											src={comment.user.profilePictureUrl}
											onClick={() => handleUserClick(comment.user.userId)}
											alt="user avatar"
										/>
									</BigUserProfile>
									<CommentContent>
										<StyledText
											onClick={() => handleUserClick(comment.user.userId)}
											$textTheme={{ style: 'body2-medium' }}
										>
											{comment.user.nickname}
										</StyledText>
										<StyledText $textTheme={{ style: 'body2-regular' }}>{comment.content}</StyledText>
									</CommentContent>
									<MenuBtn onClick={() => handleCommentMenuClick(comment.commentId, comment.isCommentWriter)}>
										<img src={More} alt="more" />
									</MenuBtn>
									{/*{showDeleteButtonId === comment.commentId && (*/}
									<CommentDeleteButton
										onClick={(e) => {
											e.stopPropagation();
											setDeleteCommentId(comment.commentId); // 삭제 대상 ID 설정
											setIsDeleteConfirmationModalOpen(true); // 모달 열기
										}}
									>
										<img src={Delete} alt="delete" />
									</CommentDeleteButton>
									{/*})}*/}
									{isDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
								</CommentItem>
							))
						)}
						<InputLayout>
							<textarea
								ref={textareaRef}
								placeholder="댓글 추가..."
								value={inputValue}
								onChange={handleInputChange}
							></textarea>
							<button
								onClick={createComment}
								disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
							>
								작성
							</button>
						</InputLayout>
					</>
				)}
				{isLoading && <Loading />}
				<div ref={loadMoreRef} />
			</ContentContainer>
		</>
	);
};
export default LikeCommentBottomSheetContent;
