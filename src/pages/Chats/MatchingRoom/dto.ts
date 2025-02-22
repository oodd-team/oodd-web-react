import { MatchingData } from '@apis/matching/dto';

import { RcvdMessageProps } from '../RcvdMessage/dto';
import { SentMessageProps } from '../SentMessage/dto';

export interface ExtendedMessageDto extends MatchingData {
	isDateBarVisible: boolean;
	sentMessage?: SentMessageProps;
	rcvdMessage?: RcvdMessageProps;
}
