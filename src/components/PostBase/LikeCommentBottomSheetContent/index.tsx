import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { UserBlockAtom } from '../../../recoil/Home/BlockBottomSheetAtom';

import { TabContainer, Tab, ContentContainer, Content, BigUserProfile, LikeItem, InputLayout } from './styles';

import { StyledText } from '../../Text/StyledText';
import theme from '../../../styles/theme';
import Loading from '../../Loading';
import Modal from '../../Modal';
import CommentItem from './CommentItem';

import { LikeCommentBottomSheetProps } from '../dto';
import { ModalProps } from '../../Modal/dto';
import { GetPostLikeListResponse } from '../../../apis/post-like/dto';
import { GetCommentListResponse } from '../../../apis/post-comment/dto';

import { getPostLikeListApi } from '../../../apis/post-like';
import { postUserBlockApi } from '../../../apis/user';
import { PostUserBlockRequest } from '../../../apis/user/dto';
import { createCommentApi, getCommentListApi } from '../../../apis/post-comment';
import { handleError } from '../../../apis/util/handleError';

const LikeCommentBottomSheetContent: React.FC<LikeCommentBottomSheetProps> = ({ tab, likeCount, commentCount }) => {
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>(tab);
	const { postId } = useParams<{ postId: string }>();
	const [likes, setLikes] = useState<GetPostLikeListResponse['data']['likes']>([]);
	const [postLikeCount, setPostLikeCount] = useState(likeCount);
	const [comments, setComments] = useState<GetCommentListResponse['data']['comments']>([]);
	const [postCommentCount, setPostCommentCount] = useState(commentCount);
	const [userBlock] = useRecoilState(UserBlockAtom);
	const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류입니다.\n관리자에게 문의해 주세요.');

	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

	// 좋아요 리스트 불러오기
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

	// 댓글 리스트 불러오기
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

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	}, []);

	// 댓글 작성
	const createComment = async () => {
		const content = inputValue.trim();
		if (!content) return; // 내용이 없으면 함수 종료

		try {
			await createCommentApi(Number(postId), { content }); // 댓글 작성 API 호출
			setInputValue(''); // 입력창 초기화
			await getPostCommentList(); // 댓글 목록 갱신
		} catch (error) {
			console.error('댓글 작성 중 에러 발생:', error);
		}
	};

	const sendBlock = async () => {
		try {
			const blockRequest: PostUserBlockRequest = {
				fromUserId: userBlock?.userId || -1,
				toUserId: userBlock?.friendId || -1,
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
			setIsBlockModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 차단하기 모달
	const blockModalProps: ModalProps = {
		isCloseButtonVisible: true,
		onClose: () => {
			setIsBlockModalOpen(false);
		},
		content: `${userBlock?.friendId || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		button: {
			content: '차단하기',
			onClick: sendBlock,
		},
	};

	// api 처리 상태 모달 (성공/실패)
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	// 유저 클릭한 경우
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
									getPostCommentList={getPostCommentList}
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
			{isBlockModalOpen && <Modal {...blockModalProps} />}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</>
	);
};
export default LikeCommentBottomSheetContent;
