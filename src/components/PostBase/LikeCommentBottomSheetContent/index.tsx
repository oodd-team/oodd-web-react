import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StyledText } from '../../Text/StyledText';
import theme from '../../../styles/theme';
import request from '../../../apis/core';
import { LikeCommentBottomSheetProps, LikesResponse, CommentsResponse } from '../dto';
import { TabContainer, Tab, ContentContainer, Content, UserItem } from './styles';

const LikeCommentBottomSheetContent: React.FC<LikeCommentBottomSheetProps> = ({ tab }) => {
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>(tab);
	const { postId } = useParams<{ postId: string }>();
	const [likes, setLikes] = useState<LikesResponse['result']['likes']>([]);
	const [comments, setComments] = useState<CommentsResponse['result']['comments']>([]);
	const nav = useNavigate();

	useEffect(() => {
		if (activeTab === 'likes') {
			setActiveTab('likes');
			fetchLikes();
		} else if (activeTab === 'comments') {
			setActiveTab('comments');
			fetchComments();
		}
	}, [activeTab]);

	// 좋아요 리스트 불러오기
	const fetchLikes = async () => {
		try {
			const response = await request.get<LikesResponse>(`/posts/${postId}/like`);
			if (response.isSuccess) {
				setLikes(response.result.likes);
			} else {
				console.error('Failed to fetch likes:', response.message);
			}
		} catch (error) {
			console.error('Error fetching likes:', error);
		}
	};

	// 코멘트 리스트 불러오기
	const fetchComments = async () => {
		try {
			const response = await request.get<CommentsResponse>(`/posts/${postId}/comments`);
			if (response.isSuccess) {
				setComments(response.result.comments);
			} else {
				console.error('Failed to fetch comments:', response.message);
			}
		} catch (error) {
			console.error('Error fetching comments:', error);
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

	return (
		<>
			<TabContainer>
				<Tab active={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
					<StyledText
						$textTheme={{ style: 'body2-bold' }}
						color={activeTab === 'likes' ? theme.colors.pink : theme.colors.gray3}
					>
						좋아요 {likes.length}
					</StyledText>
				</Tab>
				<Tab active={activeTab === 'comments'} onClick={() => setActiveTab('comments')}>
					<StyledText
						$textTheme={{ style: 'body2-bold' }}
						color={activeTab === 'comments' ? theme.colors.pink : theme.colors.gray3}
					>
						코멘트 {comments.length}
					</StyledText>
				</Tab>
			</TabContainer>

			<ContentContainer>
				{activeTab === 'likes' &&
					(likes.length === 0 ? (
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
								<span>{like.user.nickname}</span>
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
							<UserItem key={comment.id} onClick={() => handleUserClick(comment.user.id)}>
								<img src={comment.user.profilePictureUrl} alt="user avatar" />
								<div>
									<span>{comment.user.nickname}</span>
									<p>{comment.content}</p>
								</div>
							</UserItem>
						))
					))}
			</ContentContainer>
		</>
	);
};
export default LikeCommentBottomSheetContent;
