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

	// 로그인된 사용자 ID를 가져오는 함수 (예를 들어, 세션이나 쿠키에서 가져옴)
	const getCurrentUserId = () => {
		return 18; // 예를 들어 로그인한 사용자 ID가 12인 경우
	};

	// 즐겨찾기 친구 목록을 서버에서 가져오는 함수
	const fetchUserInterests = async () => {
		setIsUserLoading(true);
		try {
			const currentUserId = getCurrentUserId();

			// 매칭 요청한 친구 목록 요청
			const requestedResponse: BaseResponse = await request.get('/user-relationships/requested');
			let requestedUserData: UserProps[] = [];

			if (requestedResponse.isSuccess) {
				requestedUserData = requestedResponse.result
					.filter((relationship: any) => relationship.requester.id === currentUserId) // 현재 사용자가 요청자일 경우 필터링
					.map((relationship: any) => {
						const target = relationship.target;
						return {
							userId: target.id,
							userImgUrl: target.profilePictureUrl,
							userName: target.nickname || target.name,
						};
					});
				console.log('Requested User Data: ', requestedResponse);
			} else {
				console.error('Failed to fetch requested users');
			}

			// 관심 친구 목록 요청
			const interestsResponse: UserInterestsResponse = await request.get('/user-interests');
			let interestedUserData: UserProps[] = [];

			if (interestsResponse.isSuccess) {
				interestedUserData = interestsResponse.result.map((user: any) => ({
					userId: user.friendId,
					userImgUrl: user.profilePictureUrl,
					userName: user.nickname || user.name,
				}));
			} else {
				console.error('Failed to fetch interested users');
			}

			// 두 데이터를 합쳐서 중복된 userId를 제거하고 users로 설정
			const combinedData = [...requestedUserData, ...interestedUserData];
			const uniqueUsers = Array.from(new Map(combinedData.map((user) => [user.userId, user])).values());

			setUsers(uniqueUsers);
		} catch (error) {
			console.error('Error fetching users:', error);
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
					userId: userId,
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
