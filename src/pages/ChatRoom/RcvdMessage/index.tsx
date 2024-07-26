import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { FirstMessageLayout, UserImage, MessageBox, Message, TimeWrapper, MessageLayout } from './styles';

interface RcvdMessageProps {
	sender: string; // 사용자명
	text: string; // 메시지 내용
	isFirst: boolean; // 사용자 프로필 표시 여부
	printTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}

const RcvdMessage: React.FC<RcvdMessageProps> = ({ sender, text, isFirst, printTime, formattedTime }) => {
	if (isFirst) {
		return (
			<FirstMessageLayout>
				<UserImage src="../../../../../0.png" alt="user" />
				<MessageBox>
					<StyledText textTheme={{ style: 'body5-medium', lineHeight: 1 }} color={theme.colors.black}>
						{sender}
					</StyledText>
					<Message>
						<StyledText textTheme={{ style: 'body6-regular', lineHeight: 0.8 }} color={theme.colors.black}>
							{text}
						</StyledText>
					</Message>
				</MessageBox>
				<TimeWrapper>
					{printTime && (
						<StyledText textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray3}>
							{formattedTime}
						</StyledText>
					)}
				</TimeWrapper>
			</FirstMessageLayout>
		);
	} else {
		return (
			<MessageLayout>
				<Message>
					<StyledText textTheme={{ style: 'body6-regular', lineHeight: 0.8 }} color={theme.colors.black}>
						{text}
					</StyledText>
				</Message>
				<TimeWrapper>
					{printTime && (
						<StyledText textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray3}>
							{formattedTime}
						</StyledText>
					)}
				</TimeWrapper>
			</MessageLayout>
		);
	}
};

export default RcvdMessage;
