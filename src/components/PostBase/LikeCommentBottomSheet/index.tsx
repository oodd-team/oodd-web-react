import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../../apis/core';
import { LikeCommentBottomSheetProps, LikesResponse, CommentsResponse } from '../dto';
import { TabContainer, Tab, ContentContainer, UserItem } from './styles';

const LikeCommentBottomSheet: React.FC<LikeCommentBottomSheetProps> = ({ tab }) => {
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>(tab);
	const { postId } = useParams<{ postId: string }>();
	const [likes, setLikes] = useState<LikesResponse['result']['likes']>([]);
	const [comments, setComments] = useState<CommentsResponse['result']['comments']>([]);

	useEffect(() => {
		if (activeTab === 'likes') {
			fetchLikes();
		} else if (activeTab === 'comments') {
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

	return (
		<>
			<TabContainer>
				<Tab active={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
					좋아요 {likes.length}
				</Tab>
				<Tab active={activeTab === 'comments'} onClick={() => setActiveTab('comments')}>
					코멘트 {comments.length}
				</Tab>
			</TabContainer>

			<ContentContainer>
				{activeTab === 'likes' &&
					likes.map((like) => (
						<UserItem key={like.user.id}>
							<img src={like.user.profilePictureUrl} alt="user avatar" />
							<span>{like.user.nickname}</span>
						</UserItem>
					))}

				{activeTab === 'comments' &&
					comments.map((comment) => (
						<UserItem key={comment.id}>
							<img src={comment.user.profilePictureUrl} alt="user avatar" />
							<div>
								<span>{comment.user.nickname}</span>
								<p>{comment.content}</p>
							</div>
						</UserItem>
					))}
			</ContentContainer>
		</>
	);
};
export default LikeCommentBottomSheet;
