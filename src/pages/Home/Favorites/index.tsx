import React, { useState, useEffect } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { FavoritesContainer, FavoritesMent, FeedContainer, UserContainer, UserRow } from './styles';
import Feed from './Feed';
import { FeedProps, UserProps, UserInterestsResponse, UserPostsResponse } from './dto';
import User from './User';
import Loading from '../../../components/Loading';
import request, { BaseResponse } from '../../../apis/core';

const Favorites: React.FC = () => {
	const [selectedUser, setSelectedUser] = useState<number | null>(null); // 초기값을 null로 설정
	const [users, setUsers] = useState<UserProps[]>([]);
	const [feeds, setFeeds] = useState<FeedProps[]>([]);
	const [isUserLoading, setIsUserLoading] = useState(false);
	const [isFeedLoading, setIsFeedLoading] = useState(false);

	// 관심 친구 목록을 서버에서 가져오는 함수
	const fetchUserInterests = async () => {
		setIsUserLoading(true);
		try {
			// 매칭 요청한 친구 목록 요청
			const requestedResponse: BaseResponse = await request.get('/user-relationships/requested');

			// 관심 친구 목록 요청
			const interestsResponse: UserInterestsResponse = await request.get('/user-interests');

			// 매칭 요청한 친구 목록 처리
			const requestedUserData = requestedResponse.isSuccess
				? requestedResponse.result.map((relationship: any) => {
						const target = relationship.target;
						return {
							userId: target.id,
							userImgUrl: target.profilePictureUrl,
							userName: target.nickname || target.name,
						};
					})
				: [];

			// 관심 친구 목록 처리
			const userData = interestsResponse.isSuccess
				? interestsResponse.result.map((user: any) => ({
						userId: user.friendId,
						userImgUrl: user.profilePictureUrl,
						userName: user.nickname || user.name,
					}))
				: [];

			// 두 데이터를 합쳐서 users로 설정
			setUsers([...requestedUserData, ...userData]);
		} catch (error) {
			console.error('Error fetching user interests:', error);
		} finally {
			setIsUserLoading(false);
		}
	};

	// 특정 유저의 게시물을 가져오는 함수
	const fetchUserPosts = async (userId: number) => {
		setIsFeedLoading(true);
		try {
			const response: UserPostsResponse = await request.get(`/posts?userId=${userId}`);
			if (response.isSuccess) {
				const feedData = response.result.posts.map((post: any) => ({
					postId: post.postId, // postId 추가
					profileUrl: users.find((user) => user.userId === userId)?.userImgUrl || '',
					userName: users.find((user) => user.userId === userId)?.userName || '',
					feedImgUrl: post.firstPhoto,
					hasLiked: post.hasLiked,
					hasInterested: post.hasInterested,
				}));
				setFeeds(feedData);
			} else {
				console.error('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			setIsFeedLoading(false);
		}
	};

	// 관심 친구 목록을 가져오는 effect
	useEffect(() => {
		fetchUserInterests();
	}, []);

	// 특정 친구를 클릭했을 때 해당 유저의 게시물을 가져오는 effect
	useEffect(() => {
		if (selectedUser !== null) {
			fetchUserPosts(selectedUser);
		}
	}, [selectedUser]);

	// 유저를 클릭했을 때 상태를 업데이트하고 해당 유저의 게시물을 불러옴
	const handleUserClick = (userId: number) => {
		setSelectedUser(userId === selectedUser ? null : userId); // userId를 selectedUser로 설정
	};

	return (
		<FavoritesContainer>
			<FavoritesMent>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Likes & Saved
				</StyledText>
			</FavoritesMent>
			<UserContainer>
				{isUserLoading ? (
					<Loading />
				) : (
					<UserRow>
						{users.map((user) => (
							<User
								key={user.userId}
								user={user}
								isSelected={selectedUser === user.userId}
								onClick={() => handleUserClick(user.userId)} // userId를 전달
							/>
						))}
					</UserRow>
				)}
			</UserContainer>
			<FeedContainer>
				{isFeedLoading ? <Loading /> : feeds.map((feed, index) => <Feed key={index} feed={feed} />)}
			</FeedContainer>
		</FavoritesContainer>
	);
};

export default Favorites;
