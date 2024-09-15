import React from 'react';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { SentMessageProps } from '../../dto';
import { Message, TimeWrapper, MessageLayout } from './styles';

const SentMessage: React.FC<SentMessageProps> = React.memo(
	({ content, isSenderChanged, isPrintTime, formattedTime }) => {
		return (
			<>
				{isSenderChanged && <div style={{ margin: '0', padding: '0', height: '1rem' }} />}
				<MessageLayout>
					{isPrintTime && <TimeWrapper>{formattedTime}</TimeWrapper>}
					<Message>
						<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.1 }} color={theme.colors.black}>
							{content}
						</StyledText>
					</Message>
				</MessageLayout>
			</>
		);
	},
);

export default SentMessage;
