import dayjs from 'dayjs';

import RcvdMessage from '@pages/Chats/RcvdMessage';

import defaultProfile from '@assets/default/defaultProfile.svg';

import type { RcvdMessageProps } from '@pages/Chats/RcvdMessage/dto';

const NoMatchingMessage: React.FC = () => {
	const formattedTime = dayjs(new Date()).format('HH:mm');

	const messageProps: RcvdMessageProps = {
		fromUserNickname: '오딩이',
		profilePictureUrl: defaultProfile,
		content: '매칭이 들어오면 오딩이가 알려줄게!',
		isSenderChanged: true,
		isProfileImageVisible: true,
		isTimeVisible: false,
		formattedTime,
	};

	return <RcvdMessage {...messageProps} />;
};

export default NoMatchingMessage;
