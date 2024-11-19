import React, { useEffect, useState, useRef } from 'react';
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
	MenuBtn,
} from './styles';

import { StyledText } from '../../Text/StyledText';
import theme from '../../../styles/theme';
import Loading from '../../Loading';

import More from '../../../assets/default/more.svg';

import { LikeCommentBottomSheetProps } from '../dto';
import { CommentsResponse } from '../dto';
import { GetPostLikeListResponse } from '../../../apis/post-like/dto';

import request from '../../../apis/core';
import { getPostLikeListApi } from '../../../apis/post-like';

const LikeCommentBottomSheetContent: React.FC<LikeCommentBottomSheetProps> = ({ tab, likeCount, commentCount }) => {
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>(tab);
	const { postId } = useParams<{ postId: string }>();
	const [likes, setLikes] = useState<GetPostLikeListResponse['data']['likes']>([]);
	const [comments, setComments] = useState<CommentsResponse['result']['comments']>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [reachedEnd, setReachedEnd] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);
	const nav = useNavigate();

	useEffect(() => {
		setPage(1);
		setReachedEnd(false);
		setLikes([]);
		setComments([]);

		if (activeTab === 'likes') {
			getPostLikeList(1);
		} else if (activeTab === 'comments') {
			getPostCommentList(1);
		}
	}, [activeTab]);

	// IntersectionObserver를 활용하여 무한 스크롤 감지
	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect();

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting && !isLoading) {
				if (activeTab === 'likes') {
					getPostLikeList(page);
				} else if (activeTab === 'comments') {
					getPostCommentList(page);
				}
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
	}, [page, isLoading, reachedEnd, loadMoreRef.current, activeTab]);

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

	// 코멘트 리스트 불러오기
	const getPostCommentList = async (currentPage: number) => {
		if (isLoading || reachedEnd) return;

		setIsLoading(true);
		try {
			const response = await request.get<CommentsResponse>(`/posts/${postId}/comments`, {
				params: { page: currentPage },
			});
			const data = response.result;

			if (data.comments.length === 0) {
				setReachedEnd(true);
			} else {
				setComments((prev) => [...prev, ...data.comments]);
				setPage((prev) => prev + 1);
			}
		} catch (error) {
			console.error('Error fetching comments:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUserClick = (userId: number) => {
		// 로컬 스토리지에서 사용자 ID 가져오기
		const myUserId = localStorage.getItem('id'); // 로컬 스토리지에 저장된 사용자 ID를 가져옴

		if (String(myUserId) === String(userId)) {
			// 나인 경우
			nav('/mypage');
		} else {
			// 다른 유저인 경우
			nav(`/users/${userId}`);
		}
	};

	//댓글 메뉴 클릭한 경우 ***** 추후 수정 *****
	const handleCommentMenuClick = () => {};

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
						<Content
							$textTheme={{ style: 'body2-medium' }}
							color={theme.colors.gray3}
							style={{ textAlign: 'center', marginTop: '20px' }}
						>
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

				{activeTab === 'comments' &&
					(comments.length === 0 ? (
						<Content
							$textTheme={{ style: 'body2-medium' }}
							color={theme.colors.gray3}
							style={{ textAlign: 'center', marginTop: '20px' }}
						>
							아직 댓글이 없습니다
						</Content>
					) : (
						comments.map((comment) => (
							<CommentItem key={comment.id}>
								<BigUserProfile>
									<img
										src={comment.user.profilePictureUrl}
										onClick={() => handleUserClick(comment.user.id)}
										alt="user avatar"
									/>
								</BigUserProfile>
								<CommentContent>
									<StyledText onClick={() => handleUserClick(comment.user.id)} $textTheme={{ style: 'body2-medium' }}>
										{comment.user.nickname}
									</StyledText>
									<StyledText $textTheme={{ style: 'caption2-medium' }}>{comment.content}</StyledText>
								</CommentContent>
								<MenuBtn onClick={handleCommentMenuClick}>
									<img src={More} alt="more" />
								</MenuBtn>
							</CommentItem>
						))
					))}
				{isLoading && <Loading />}
				<div ref={loadMoreRef} />
			</ContentContainer>
		</>
	);
};
export default LikeCommentBottomSheetContent;
