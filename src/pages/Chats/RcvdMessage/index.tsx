import { memo, ReactNode } from 'react';

import theme from '@styles/theme';

import type { RcvdMessageProps } from './dto';

import { FirstMessageLayout, UserImage, UsernameText, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

const RcvdMessage: React.FC<RcvdMessageProps & { onClickProfile?: () => void; children?: ReactNode }> = memo(
	({
		fromUserNickname,
		profilePictureUrl,
		content,
		isProfileImageVisible,
		isSenderChanged,
		isTimeVisible,
		formattedTime,
		onClickProfile,
		children,
	}) => {
		if (isProfileImageVisible) {
			return (
				<FirstMessageLayout $isSenderChanged={isSenderChanged}>
					<UserImage onClick={onClickProfile} src={profilePictureUrl} alt="프로필 사진" />
					<MessageBox>
						<UsernameText
							onClick={onClickProfile}
							$textTheme={{ style: 'body2-regular' }}
							color={theme.colors.text.primary}
						>
							{fromUserNickname}
						</UsernameText>
						<Message $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
							{children}
							{content}
						</Message>
					</MessageBox>
					{isTimeVisible && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</FirstMessageLayout>
			);
		} else {
			return (
				<MessageLayout>
					<Message $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
						{children}
						{content}
					</Message>
					{isTimeVisible && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</MessageLayout>
			);
		}
	},
);

export default RcvdMessage;
