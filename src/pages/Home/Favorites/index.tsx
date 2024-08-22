import React, { useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { FavoritesContainer, FavoritesMent, FeedContainer, UserContainer, UserRow } from './styles';
import Feed from './Feed';
import { FeedProps, UserProps } from './dto';
import User from './User';
import profileImg3 from './../../../assets/Home/profileImg3.svg';
import tag from "./../../../assets/Home/tag.svg";
import feedImg from "./../../../assets/Home/feedImg.svg";

// 추후 변경
const userData: UserProps[] = [
	{ userImgUrl: tag, userName: 'IDID' },
	{ userImgUrl: tag, userName: 'IDID2' },
	{ userImgUrl: tag, userName: 'IDID3' },
	{ userImgUrl: tag, userName: 'IDID4' },
	{ userImgUrl: tag, userName: 'IDID5' },
	{ userImgUrl: tag, userName: 'IDID6' },
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
	{
		profileUrl: profileImg3,
		userName: 'IDID4',
		feedImgUrl: feedImg,
	},
	{
		profileUrl: profileImg3,
		userName: 'IDID5',
		feedImgUrl: feedImg,
	},
	{
		profileUrl: profileImg3,
		userName: 'IDID6',
		feedImgUrl: feedImg,
	},
];

// 즐겨찾기 탭입니다.
const Favorites: React.FC = () => {
	const [selectedUsers, setSelectedUsers] = useState<number | null>(0);
	const handleUserClick = (index: number) => {
		setSelectedUsers(index === selectedUsers ? null : index);
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
					{userData.map((user, index) => (
						<User key={index} user={user} isSelected={selectedUsers === index} onClick={() => handleUserClick(index)} />
					))}
				</UserRow>
			</UserContainer>
			<FeedContainer>
				{feedData.map((feed) => (
					<Feed feed={feed} />
				))}
			</FeedContainer>
		</FavoritesContainer>
	);
};

export default Favorites;
