import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { TabContainer, Tab, ContentContainer, Content, UserItem, CommentItem, CommentContent, MenuBtn } from './styles';

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
	const nav = useNavigate();

	useEffect(() => {
		if (activeTab === 'likes') {
			setActiveTab('likes');
			getPostLikeList();
		} else if (activeTab === 'comments') {
			setActiveTab('comments');
			fetchComments();
		}
	}, [activeTab]);

	// 좋아요 리스트 불러오기
	const getPostLikeList = async () => {
		setIsLoading(true);
		try {
			const response = await getPostLikeListApi(Number(postId));
			const data = response.data;
			setLikes(data.likes);
		} catch (error) {
			console.error('Error fetching likes:', error);
		} finally {
			setIsLoading(false);
		}
	};

	// 코멘트 리스트 불러오기
	const fetchComments = async () => {
		setIsLoading(true);
		try {
			const response = await request.get<CommentsResponse>(`/posts/${postId}/comments`);
			if (response.isSuccess) {
				setComments(response.result.comments);
			} else {
				console.error('Failed to fetch comments:', response.message);
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
					(isLoading ? (
						<Loading />
					) : likes.length === 0 ? (
						<Content>
							<StyledText
								$textTheme={{ style: 'body2-medium' }}
								color={theme.colors.gray3}
								style={{ textAlign: 'center', marginTop: '20px' }}
							>
								아직 좋아요가 없습니다
							</StyledText>
						</Content>
					) : (
						likes.map((like) => (
							<UserItem key={like.user.id} onClick={() => handleUserClick(like.user.id)}>
								<img src={like.user.profilePictureUrl} alt="user avatar" />
								<StyledText className="name" $textTheme={{ style: 'body2-medium' }}>
									{like.user.nickname}
								</StyledText>
							</UserItem>
						))
					))}

				{activeTab === 'comments' &&
					(comments.length === 0 ? (
						<Content>
							<StyledText
								$textTheme={{ style: 'body2-medium' }}
								color={theme.colors.gray3}
								style={{ textAlign: 'center', marginTop: '20px' }}
							>
								아직 댓글이 없습니다
							</StyledText>
						</Content>
					) : (
						comments.map((comment) => (
							<CommentItem key={comment.id}>
								<img
									src={comment.user.profilePictureUrl}
									onClick={() => handleUserClick(comment.user.id)}
									alt="user avatar"
								/>
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
			</ContentContainer>
		</>
	);
};
export default LikeCommentBottomSheetContent;
