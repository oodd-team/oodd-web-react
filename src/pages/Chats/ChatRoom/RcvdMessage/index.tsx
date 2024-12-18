import React from 'react';
import theme from '@styles/theme';
import type { RcvdMessageProps } from '../dto';
import { FirstMessageLayout, UserImage, UsernameText, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

const RcvdMessage: React.FC<RcvdMessageProps & { onClickProfile: () => void }> = React.memo(
	({
		fromUserNickname,
		profilePictureUrl,
		content,
		isProfileImageVisible,
		isSenderChanged,
		isTimeVisible,
		formattedTime,
		onClickProfile,
	}) => {
		if (isProfileImageVisible) {
			return (
				<>
					<FirstMessageLayout $isSenderChanged={isSenderChanged}>
						<UserImage onClick={onClickProfile} src={profilePictureUrl} alt="프로필 사진" />
						<MessageBox>
							<UsernameText onClick={onClickProfile} $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
								{fromUserNickname}
							</UsernameText>
							<Message $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
								{content}
							</Message>
						</MessageBox>
					</FirstMessageLayout>
				</>
			);
		} else {
			return (
				<MessageLayout>
					<Message $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
						{content}
					</Message>
					{isTimeVisible && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</MessageLayout>
			);
		}
	},
);

export default RcvdMessage;
