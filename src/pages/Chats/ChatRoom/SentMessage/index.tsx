import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { SentMessageProps } from '../../dto';
import { Message, TimeWrapper, MessageLayout } from './styles';

const SentMessage: React.FC<SentMessageProps> = ({ text, isSenderChanged, isPrintTime, formattedTime }) => {
	return (
		<>
			{isSenderChanged && <div style={{ margin: '0', padding: '0', height: '2.25rem' }} />}
			<MessageLayout>
				{isPrintTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
				<Message>
					<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
						{text}
					</StyledText>
				</Message>
			</MessageLayout>
		</>
	);
};

export default SentMessage;
