import type { ChatRoomMessagesData } from '@apis/chatting/dto';

import { RcvdMessageProps } from '../RcvdMessage/dto';
import { SentMessageProps } from '../SentMessage/dto';

export interface ExtendedMessageDto extends ChatRoomMessagesData {
	isDateBarVisible: boolean;
	sentMessage?: SentMessageProps;
	rcvdMessage?: RcvdMessageProps;
}
