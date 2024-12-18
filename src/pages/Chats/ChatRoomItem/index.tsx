import { StyledText } from '@components/Text/StyledText';
import { UserImage, ChatRoomItemLayout, LeftBox, RightBox, LatestMessage } from './styles';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OpponentInfoAtom } from '@recoil/util/OpponentInfo';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import type { ChatRoomData } from '@apis/chatting/dto';
import defaultProfile from '@assets/default/defaultProfile.svg';
dayjs.extend(relativeTime);

const ChatRoomItem: React.FC<ChatRoomData> = ({ chatRoomId, otherUser, latestMessage }) => {
	const nav = useNavigate();
	const [, setOpponentInfo] = useRecoilState(OpponentInfoAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>(null);

	useEffect(() => {
		if (latestMessage.createdAt) {
			// 초기 시간 설정
			setTimeAgo(dayjs(latestMessage.createdAt).locale('ko').fromNow());

			// 1초마다 `timeAgo`를 업데이트
			const interval = setInterval(() => {
				setTimeAgo(dayjs(latestMessage.createdAt).locale('ko').fromNow());
			}, 1000);

			// 컴포넌트 언마운트 시 타이머 정리
			return () => clearInterval(interval);
		} else {
			setTimeAgo(null);
		}
	}, []);

	const onClickChatRoom = () => {
		setOpponentInfo(otherUser);
		nav(`/chats/${chatRoomId}`);
	};

	return (
		<ChatRoomItemLayout onClick={onClickChatRoom}>
			<UserImage src={otherUser?.profileUrl || defaultProfile} alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body2-medium' }} color="#1D1D1D">
					{otherUser?.nickname || '알수없음'}
				</StyledText>
				<LatestMessage $textTheme={{ style: 'caption2-regular' }} color="#1D1D1D">
					{latestMessage.content}
				</LatestMessage>
			</LeftBox>
			<RightBox>
				<StyledText $textTheme={{ style: 'caption2-regular' }} color="#8e8e93">
					{timeAgo}
				</StyledText>
			</RightBox>
		</ChatRoomItemLayout>
	);
};

export default ChatRoomItem;
