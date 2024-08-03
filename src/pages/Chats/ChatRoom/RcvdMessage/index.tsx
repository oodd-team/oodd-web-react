import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { RcvdMessageProps } from '../../dto';
import { FirstMessageLayout, UserImage, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

const RcvdMessage: React.FC<RcvdMessageProps> = ({ sender, text, isFirst, printTime, formattedTime }) => {
	if (isFirst) {
		return (
			<FirstMessageLayout>
				<UserImage src="../../../../../0.png" alt="user" />
				<MessageBox>
					<StyledText $textTheme={{ style: 'body5-medium', lineHeight: 1 }} color={theme.colors.black}>
						{sender}
					</StyledText>
					<Message>
						<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
							{text}
						</StyledText>
					</Message>
				</MessageBox>
				{printTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
			</FirstMessageLayout>
		);
	} else {
		return (
			<MessageLayout>
				<Message>
					<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
						{text}
					</StyledText>
				</Message>
				{printTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
			</MessageLayout>
		);
	}
};

export default RcvdMessage;
