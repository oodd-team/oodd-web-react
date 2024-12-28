import { StyledText } from '@components/Text/StyledText';
import { UserImage, ChatRoomItemLayout, LeftBox, RightBox, LatestMessage } from './styles';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OtherUserAtom } from '@recoil/util/OtherUser';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import type { ChatRoomData } from '@apis/chatting/dto';
import defaultProfile from '@assets/default/defaultProfile.svg';
import theme from '@styles/theme';
dayjs.extend(relativeTime);

const ChatRoomItem: React.FC<ChatRoomData> = ({ id, otherUser, latestMessage }) => {
	const [timeAgo, setTimeAgo] = useState<string | null>(null);
	const [, setOtherUser] = useRecoilState(OtherUserAtom);
	const nav = useNavigate();

	const handleChatRoomClick = () => {
		setOtherUser(otherUser);
		nav(`/chats/${id}`);
	};

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

	return (
		<ChatRoomItemLayout onClick={handleChatRoomClick}>
			<UserImage src={otherUser?.profilePictureUrl || defaultProfile} alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.text.primary}>
					{otherUser?.nickname || '알수없음'}
				</StyledText>
				<LatestMessage $textTheme={{ style: 'caption2-regular' }} color={theme.colors.text.primary}>
					{latestMessage.content}
				</LatestMessage>
			</LeftBox>
			<RightBox>
				<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.text.caption}>
					{timeAgo}
				</StyledText>
			</RightBox>
		</ChatRoomItemLayout>
	);
};

export default ChatRoomItem;
