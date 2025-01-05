import { memo } from 'react';

import theme from '@styles/theme';

import { StyledText } from '@components/Text/StyledText';

import type { UserProfileProps } from './dto';

import { UserProfileLayout, UserImg, UserDetailsContainer, StyledBio } from './style';

const UserProfile: React.FC<UserProfileProps> = memo(({ userImg, bio = '', nickname }) => {
	const truncatedBio = bio ? (bio.length > 50 ? bio.substring(0, 50) + '...' : bio) : '';
	return (
		<UserProfileLayout>
			<UserImg src={userImg} alt={`${nickname}'s profile`} />
			<UserDetailsContainer>
				<StyledText $textTheme={{ style: 'headline2-bold' }}>{nickname}</StyledText>
				<StyledBio $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.tertiary}>
					{truncatedBio}
				</StyledBio>
			</UserDetailsContainer>
		</UserProfileLayout>
	);
});

export default UserProfile;
