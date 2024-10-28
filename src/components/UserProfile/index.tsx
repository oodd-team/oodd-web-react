import React from 'react';
import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { UserProfileContainer, UserImg, UserDetails, BioStyledText } from './style';

interface UserProfileProps {
	userImg: string;
	bio: string;
	nickname: string;
}

const UserProfile: React.FC<UserProfileProps> = React.memo(({ userImg, bio, nickname }) => {
	return (
		<UserProfileContainer>
			<UserImg $imgUrl={userImg} />
			<UserDetails>
				<StyledText $textTheme={{ style: 'headline2-bold' }}>{nickname}</StyledText>
				<BioStyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.gray3}>
					{bio}
				</BioStyledText>
			</UserDetails>
		</UserProfileContainer>
	);
});

export default UserProfile;
