import React from 'react';
import theme from '../../../../styles/theme';
import { RcvdMessageProps } from '../../dto';
import { FirstMessageLayout, UserImage, UsernameText, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

const RcvdMessage: React.FC<RcvdMessageProps & { onClickProfile: () => void }> = React.memo(
	({
		fromUserName,
		profilePictureUrl,
		content,
		isFirst,
		isSenderChanged,
		isPrintTime,
		formattedTime,
		onClickProfile,
	}) => {
		if (isFirst) {
			return (
				<>
					{isSenderChanged && <div style={{ margin: '0', padding: '0', height: '1rem' }} />}
					<FirstMessageLayout>
						<UserImage onClick={onClickProfile} src={profilePictureUrl} alt="프로필 사진" />
						<MessageBox>
							<UsernameText onClick={onClickProfile} $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
								{fromUserName}
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
					<Message $textTheme={{ style: 'body6-regular' }} color={theme.colors.black}>
						{content}
					</Message>
					{isPrintTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</MessageLayout>
			);
		}
	},
);

export default RcvdMessage;
