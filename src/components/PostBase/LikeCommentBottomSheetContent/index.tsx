import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import {
	IsCommentDeleteConfirmationModalOpenAtom,
	IsCommentReportModalOpenAtom,
	selectedCommentAtom,
} from '../../../recoil/Post/PostCommentAtom';

import { TabContainer, Tab, ContentContainer, Content, BigUserProfile, LikeItem, InputLayout } from './styles';

import { StyledText } from '../../Text/StyledText';
import theme from '../../../styles/theme';
import Loading from '../../Loading';
import Modal from '../../Modal';
import CommentItem from './CommentItem';
import MenuButtonList from './MenuButtonList';

import { LikeCommentBottomSheetProps } from '../dto';
import { ModalProps } from '../../Modal/dto';
import { GetPostLikeListResponse } from '../../../apis/post-like/dto';
import { Comment, GetCommentListResponse } from '../../../apis/post-comment/dto';

import Delete from '../../../assets/default/delete.svg';
import Block from '../../../assets/default/block.svg';
import Report from '../../../assets/default/report.svg';
import X from '../../../assets/default/x.svg';

import { getPostLikeListApi } from '../../../apis/post-like';
import { postUserBlockApi } from '../../../apis/user-block';
import { PostUserBlockRequest } from '../../../apis/user-block/dto';
import { createCommentApi, deleteCommentApi, getCommentListApi } from '../../../apis/post-comment';
import { handleError } from '../../../apis/util/handleError';

const LikeCommentBottomSheetContent: React.FC<LikeCommentBottomSheetProps> = ({ tab, likeCount, commentCount }) => {
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>(tab);
	const { postId } = useParams<{ postId: string }>();

	const [likes, setLikes] = useState<GetPostLikeListResponse['data']['likes']>([]);
	const [postLikeCount, setPostLikeCount] = useState(likeCount);
	const [comments, setComments] = useState<GetCommentListResponse['data']['comments']>([]);
	const [postCommentCount, setPostCommentCount] = useState(commentCount);
	const [isBlockConfirmationModalOpen, setIsBlockConfirmationModalOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');

	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const [inputValue, setInputValue] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [selectedComment, setSelectedComment] = useRecoilState(selectedCommentAtom);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [menuPosition, setMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

	const [isCommentDeleteConfirmationModalOpen, setIsCommentDeleteConfirmationModalOpen] = useRecoilState(
		IsCommentDeleteConfirmationModalOpenAtom,
	);
	const [, setIsCommentReportModalOpen] = useRecoilState(IsCommentReportModalOpenAtom);

	const nav = useNavigate();

	useEffect(() => {
		setPage(1);
		setReachedEnd(false);
		setLikes([]);
		setComments([]);

		if (activeTab === 'likes') {
			getPostLikeList(1);
		} else if (activeTab === 'comments') {
			getPostCommentList();
		}
	}, [activeTab]);

	// IntersectionObserver를 활용하여 무한 스크롤 감지
	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect();

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting && !isLoading) {
				console.log('호출');
				getPostLikeList(page);
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

	// 좋아요 리스트 불러오기 api
	const getPostLikeList = async (currentPage: number) => {
		if (reachedEnd || isLoading) return;

		setIsLoading(true);
		try {
			const response = await getPostLikeListApi(Number(postId), currentPage);
			const data = response.data;

			if (data.likes.length === 0) {
				setReachedEnd(true);
			} else {
				setLikes((prev) => {
					// 기존 likes와 새로 불러온 likes를 합치되 중복 제거
					const mergedLikes = [...prev, ...data.likes];
					const uniqueLikes = mergedLikes.filter(
						(like, index, self) => index === self.findIndex((l) => l.user.id === like.user.id),
					);
					return uniqueLikes;
				});
				setPostLikeCount(data.totalCount);

				if (data.likes.length < 10) {
					setReachedEnd(true);
				} else {
					setPage((prev) => prev + 1);
				}
			}
		} catch (error) {
			console.error('Error fetching likes:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// 댓글 리스트 불러오기 api
	const getPostCommentList = async () => {
		setIsLoading(true);
		try {
			const response = await getCommentListApi(Number(postId));
			const data = response.data;

			setComments(data.comments);
			setPostCommentCount(data.totalCount);
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// 댓글 작성 Input
	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	}, []);

	// 댓글 작성 api
	const createComment = async () => {
		if (isSubmitting) return; // 중복 요청 방지
		setIsSubmitting(true);

		const content = inputValue.trim();
		if (!content) return; // 내용이 없으면 함수 종료

		try {
			await createCommentApi(Number(postId), { content }); // 댓글 작성 API 호출
			setInputValue(''); // 입력창 초기화
			await getPostCommentList(); // 댓글 목록 갱신
		} catch (error) {
			const errorMessage = handleError(error, 'postComment');
			setModalContent(errorMessage); // 에러 메시지 설정
			setIsStatusModalOpen(true); // 상태 모달 열기
		} finally {
			setIsSubmitting(false); // 상태 초기화
		}
	};

	// 댓글 삭제 api
	const deleteComment = async () => {
		try {
			if (!selectedComment) {
				setModalContent('선택된 댓글이 없습니다.');
				return;
			}
			await deleteCommentApi(selectedComment.id); // 댓글 삭제 API 호출
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

	// 유저 차단 api
	const postUserBlock = async () => {
		const storedUserId = localStorage.getItem('my_id');

		// 사용자 ID 또는 선택된 댓글이 없으면 함수 종료
		if (!storedUserId || !selectedComment) {
			setModalContent('유저 정보를 찾을 수 없습니다.');
			setIsStatusModalOpen(true);
			return;
		}

		try {
			const blockRequest: PostUserBlockRequest = {
				fromUserId: Number(storedUserId),
				toUserId: selectedComment.user.id,
				action: 'block',
			};

			const response = await postUserBlockApi(blockRequest);

			if (response.isSuccess) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error, 'user');
			setModalContent(errorMessage);
		} finally {
			setIsBlockConfirmationModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 본인 댓글 메뉴 항목
	const MyCommentMenuItems = [
		{
			text: '삭제',
			action: () => {
				setIsCommentDeleteConfirmationModalOpen(true);
				setIsMenuVisible(false);
			},
			icon: Delete,
			color: 'red',
		},
		{
			text: '취소',
			action: () => setIsMenuVisible(false),
			icon: X,
		},
	];

	// 타 사용자 댓글 메뉴 항목
	const OtherCommentMenuItems = [
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
				setIsBlockConfirmationModalOpen(true);
				setIsMenuVisible(false);
			},
			icon: Block,
		},
		{
			text: '취소',
			action: () => setIsMenuVisible(false),
			icon: X,
		},
	];

	// 차단하기 모달
	const blockConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => {
			setIsBlockConfirmationModalOpen(false);
		},
		content: `${selectedComment?.user.nickname || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		button: {
			content: '차단하기',
			onClick: postUserBlock,
		},
	};

	// 댓글 삭제 확인 모달
	const deleteConfirmationModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => setIsCommentDeleteConfirmationModalOpen(false),
		content: '정말 댓글을 삭제하시겠습니까?',
		button: {
			content: '삭제',
			onClick: deleteComment,
		},
	};

	// api 처리 상태 모달 (성공/실패)
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	// 댓글 메뉴 클릭한 경우
	const handleMenuOpen = (comment: Comment, event: React.MouseEvent<HTMLButtonElement>) => {
		setSelectedComment(comment);
		const rect = event.currentTarget.getBoundingClientRect();
		setMenuPosition({ top: rect.bottom + window.scrollY - 90, left: rect.left + window.scrollX - 100 });
		setIsMenuVisible(true);
	};

	// 유저 클릭한 경우
	const handleUserClick = (userId: number) => {
		// 로컬 스토리지에서 사용자 ID 가져오기
		const myUserId = localStorage.getItem('my_id'); // 로컬 스토리지에 저장된 사용자 ID를 가져옴

		if (String(myUserId) === String(userId)) {
			// 나인 경우
			nav(`/profile/${userId}`);
		} else {
			// 다른 유저인 경우
			nav(`/users/${userId}`);
		}
	};

	return (
		<>
			<TabContainer>
				<Tab $active={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
					<StyledText
						$textTheme={{ style: 'body2-bold' }}
						color={activeTab === 'likes' ? theme.colors.pink : theme.colors.gray3}
					>
						좋아요 {postLikeCount || 0}
					</StyledText>
				</Tab>
				<Tab $active={activeTab === 'comments'} onClick={() => setActiveTab('comments')}>
					<StyledText
						$textTheme={{ style: 'body2-bold' }}
						color={activeTab === 'comments' ? theme.colors.pink : theme.colors.gray3}
					>
						코멘트 {postCommentCount || 0}
					</StyledText>
				</Tab>
			</TabContainer>

			<ContentContainer $isCommentTab={activeTab === 'comments'}>
				{activeTab === 'likes' &&
					(postLikeCount === 0 ? (
						<Content $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
							아직 좋아요가 없습니다
						</Content>
					) : (
						likes.map((like) => (
							<LikeItem key={like.user.id} onClick={() => handleUserClick(like.user.id)}>
								<BigUserProfile>
									<img src={like.user.profilePictureUrl} alt="user avatar" />
								</BigUserProfile>
								<StyledText className="name" $textTheme={{ style: 'body2-medium' }}>
									{like.user.nickname}
								</StyledText>
							</LikeItem>
						))
					))}

				{activeTab === 'comments' && (
					<>
						{postCommentCount === 0 ? (
							<Content $textTheme={{ style: 'body2-medium' }} color={theme.colors.gray3}>
								아직 댓글이 없습니다
							</Content>
						) : (
							comments.map((comment) => (
								<CommentItem
									comment={comment}
									handleUserClick={handleUserClick}
									handleMenuOpen={handleMenuOpen}
									key={comment.id}
								/>
							))
						)}
						<InputLayout>
							<textarea
								ref={textareaRef}
								placeholder="댓글 추가..."
								value={inputValue}
								onChange={handleInputChange}
								onKeyDown={(e) => {
									// 엔터 키 감지
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault(); // 기본 엔터 동작 방지 (줄바꿈)
										createComment(); // 댓글 작성 함수 호출
									}
								}}
							></textarea>
							<button
								onClick={createComment}
								disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
							>
								작성
							</button>
						</InputLayout>
						{isMenuVisible && (
							<MenuButtonList
								items={selectedComment?.isCommentWriter ? MyCommentMenuItems : OtherCommentMenuItems}
								onClose={() => setIsMenuVisible(false)}
								position={menuPosition}
							/>
						)}
						{isCommentDeleteConfirmationModalOpen && <Modal {...deleteConfirmationModalProps} />}
						{isStatusModalOpen && <Modal {...statusModalProps} />}
					</>
				)}
				{isLoading && <Loading />}
				<div ref={loadMoreRef} />
			</ContentContainer>
			{isBlockConfirmationModalOpen && <Modal {...blockConfirmationModalProps} />}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</>
	);
};
export default LikeCommentBottomSheetContent;
