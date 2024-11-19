import React from 'react';
import theme from '../../../../styles/theme';
import { SentMessageProps } from '../dto';
import { Message, TimeWrapper, MessageLayout } from './styles';

const SentMessage: React.FC<SentMessageProps> = React.memo(
	({ content, isSenderChanged, isTimeVisible, formattedTime }) => {
		return (
			<>
				<MessageLayout $isSenderChanged={isSenderChanged}>
					{isTimeVisible && <TimeWrapper>{formattedTime}</TimeWrapper>}
					<Message $textTheme={{ style: 'body2-regular' }} color={theme.colors.black}>
						{content}
					</Message>
				</MessageLayout>
			</>
		);
	},
);

export default SentMessage;
