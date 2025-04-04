import dayjs from 'dayjs';

import RcvdMessage from '@pages/Chats/RcvdMessage';

import defaultProfile from '@assets/default/defaultProfile.svg';

import type { MatchingData } from '@apis/matching/dto';
import type { RcvdMessageProps } from '@pages/Chats/RcvdMessage/dto';

import type { CardProps } from '../Card/dto';

import Card from '../Card';

const MatchingMessage: React.FC<MatchingData> = ({ id, message, createdAt, chatRoomId, requester }: MatchingData) => {
	const formattedTime = dayjs(createdAt).format('HH:mm');

	const firstMessageProps: RcvdMessageProps = {
		fromUserNickname: '오딩이',
		profilePictureUrl: defaultProfile,
		content: '얘가 너 소개받고 싶대',
		isSenderChanged: false,
		isProfileImageVisible: true,
		isTimeVisible: false,
		formattedTime,
	};

	const matchingMessageProps: RcvdMessageProps = {
		fromUserNickname: '오딩이',
		profilePictureUrl: defaultProfile,
		content: message,
		isSenderChanged: false,
		isProfileImageVisible: false,
		isTimeVisible: false,
		formattedTime,
	};

	const cardProps: CardProps = {
		id,
		chatRoomId,
		requester,
	};

	return (
		<>
			<RcvdMessage {...firstMessageProps} />
			<div style={{ maxWidth: '90%' }}>
				<RcvdMessage {...matchingMessageProps}>
					<Card {...cardProps} />
				</RcvdMessage>
			</div>
		</>
	);
};

export default MatchingMessage;
