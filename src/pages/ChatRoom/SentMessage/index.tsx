import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { Message, TimeWrapper, MessageLayout } from './styles';

interface SentMessageProps {
	text: string; // 메시지 내용
	isFirst: boolean; // 상대방 메시지 등과의 마진 값 설정
	printTime: boolean; // 메시지 옆 시간 표시 여부
	formattedTime: string; // 타임스탬프를 HH:MM 형태로 변환한 값
}

const SentMessage: React.FC<SentMessageProps> = ({ text, printTime, formattedTime }) => {
	return (
		<MessageLayout>
			{printTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
			<Message>
				<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
					{text}
				</StyledText>
			</Message>
		</MessageLayout>
	);
};

export default SentMessage;
