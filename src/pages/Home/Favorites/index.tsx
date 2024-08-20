import React, { useState, useEffect } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { FavoritesContainer, FavoritesMent, FeedContainer, UserContainer, UserRow } from './styles';
import Feed from './Feed';
import { FeedProps, UserProps, UserInterestsResponse, UserPostsResponse } from './dto';
import User from './User';
import request from '../../../apis/core';

// 추후 변경
/*
const userData: UserProps[] = [
	{ userImgUrl: tag, userName: 'IDID' },
	{ userImgUrl: tag, userName: 'IDID2' },
	{ userImgUrl: tag, userName: 'IDID3' },
];

// 추후 변경
const feedData: FeedProps[] = [
	{
		profileUrl: profileImg3,
		userName: 'IDID',
		feedImgUrl: feedImg,
	},
	{
		profileUrl: profileImg3,
		userName: 'IDID2',
		feedImgUrl: feedImg,
	},
	{
		profileUrl: profileImg3,
		userName: 'IDID3',
		feedImgUrl: feedImg,
	},
];
*/

// 즐겨찾기 탭입니다.
const Favorites: React.FC = () => {
	const [selectedUser, setSelectedUser] = useState<number | null>(0);
	const [users, setUsers] = useState<UserProps[]>([]);
	const [feeds, setFeeds] = useState<FeedProps[]>([]);

	// 관심 친구 목록을 서버에서 가져오는 함수
	const fetchUserInterests = async () => {
		try {
			const response: UserInterestsResponse = await request.get('/user-interests');
			if (response.isSuccess) {
				const userData = response.result.map((user: any) => ({
					userId: user.friendId,
					userImgUrl: user.profilePictureUrl,
					userName: user.nickname,
				}));
				setUsers(userData);
			} else {
				console.error('Failed to fetch user interests');
			}
		} catch (error) {
			console.error('Error fetching user interests:', error);
		}
	};

	// 특정 유저의 게시물을 가져오는 함수
	const fetchUserPosts = async (userId: number) => {
		try {
			const response: UserPostsResponse = await request.get(`/posts?userId=${userId}`);
			if (response.isSuccess) {
				const feedData = response.result.posts.map((post: any) => ({
					profileUrl: users.find((user) => user.userId === userId)?.userImgUrl || '',
					userName: users.find((user) => user.userId === userId)?.userName || '',
					feedImgUrl: post.firstPhoto,
				}));
				setFeeds(feedData);
			} else {
				console.error('Failed to fetch posts');
			}
		} catch (error) {
			console.error('Error fetching posts:', error);
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
	const handleUserClick = (index: number) => {
		setSelectedUser(index === selectedUser ? null : index);
	};

	return (
		<FavoritesContainer>
			<FavoritesMent>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Likes & Saved
				</StyledText>
			</FavoritesMent>
			<UserContainer>
				<UserRow>
					{users.map((user, index) => (
						<User key={index} user={user} isSelected={selectedUser === index} onClick={() => handleUserClick(index)} />
					))}
				</UserRow>
			</UserContainer>
			<FeedContainer>
				{feeds.map((feed, index) => (
					<Feed key={index} feed={feed} />
				))}
			</FeedContainer>
		</FavoritesContainer>
	);
};

export default Favorites;
