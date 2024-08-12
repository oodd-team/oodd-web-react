import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { RcvdMessageProps } from '../../dto';
import { FirstMessageLayout, UserImage, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

const RcvdMessage: React.FC<RcvdMessageProps> = ({
	fromUserName,
	profilePictureUrl,
	text,
	isFirst,
	isSenderChanged,
	isPrintTime,
	formattedTime,
}) => {
	if (isFirst) {
		return (
			<>
				{isSenderChanged && <div style={{ margin: '0', padding: '0', height: '2.25rem' }} />}
				<FirstMessageLayout>
					<UserImage src={profilePictureUrl} alt="프로필 사진" />
					<MessageBox>
						<StyledText $textTheme={{ style: 'body5-medium', lineHeight: 1 }} color={theme.colors.black}>
							{fromUserName}
						</StyledText>
						<Message>
							<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
								{text}
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
							{text}
						</StyledText>
					</Message>
					{isPrintTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
				</MessageLayout>
			</>
		);
	}
};

export default RcvdMessage;
