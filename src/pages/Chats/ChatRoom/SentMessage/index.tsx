import React from 'react';
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
					<Message $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
						{content}
					</Message>
				</MessageLayout>
			</>
		);
	},
);

export default SentMessage;
