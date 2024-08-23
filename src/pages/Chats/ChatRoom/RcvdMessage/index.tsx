import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { RcvdMessageProps } from '../../dto';
import { FirstMessageLayout, UserImage, UsernameText, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

const RcvdMessage: React.FC<RcvdMessageProps & { onClickProfile: () => void }> = ({
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
						<UsernameText onClick={onClickProfile} style={{ cursor: 'pointer' }} color={theme.colors.black}>
							{fromUserName}
						</UsernameText>
						<Message>
							<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
								{content}
							</StyledText>
						</Message>
					</MessageBox>
					{isPrintTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</FirstMessageLayout>
			</>
		);
	} else {
		return (
			<>
				{isSenderChanged && <div style={{ margin: '0', padding: '0', height: '2.25rem' }} />}
				<MessageLayout>
					<Message>
						<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
							{content}
						</StyledText>
					</Message>
					{isPrintTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</MessageLayout>
			</>
		);
	}
};

export default RcvdMessage;
