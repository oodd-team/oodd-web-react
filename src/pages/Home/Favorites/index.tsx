import React, { useState } from 'react';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { FavoritesContainer, FavoritesMent, FeedContainer, UserContainer, UserRow } from './styles';
import Feed from './Feed';
import { FeedProps, UserProps } from './dto';
import User from './User';

// 추후 변경
const userData: UserProps[] = [
	{ userImgUrl: './../../../../assets/Home/tag.svg', userName: 'IDID' },
	{ userImgUrl: './../../../../assets/Home/tag.svg', userName: 'IDID2' },
	{ userImgUrl: './../../../../assets/Home/tag.svg', userName: 'IDID3' },
	{ userImgUrl: './../../../../assets/Home/tag.svg', userName: 'IDID4' },
	{ userImgUrl: './../../../../assets/Home/tag.svg', userName: 'IDID5' },
	{ userImgUrl: './../../../../assets/Home/tag.svg', userName: 'IDID6' },
];

// 추후 변경
const feedData: FeedProps[] = [
	{
		profileUrl: './../../../../assets/Home/profileImg3.svg',
		userName: 'IDID',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
	{
		profileUrl: './../../../../assets/Home/profileImg3.svg',
		userName: 'IDID2',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
	{
		profileUrl: './../../../../assets/Home/profileImg3.svg',
		userName: 'IDID3',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
	{
		profileUrl: './../../../../assets/Home/profileImg3.svg',
		userName: 'IDID4',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
	{
		profileUrl: './../../../../assets/Home/profileImg3.svg',
		userName: 'IDID5',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
	{
		profileUrl: './../../../../assets/Home/profileImg3.svg',
		userName: 'IDID6',
		feedImgUrl: './../../../../assets/Home/feedImg.svg',
	},
];

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
