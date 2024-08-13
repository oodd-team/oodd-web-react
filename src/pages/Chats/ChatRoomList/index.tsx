import { StyledText } from '../../../components/Text/StyledText';
import { UserImage, ChatRoomListLayout, LeftBox, RightBox } from './styles';
import theme from '../../../styles/theme';
import { ChatRoomDto } from '../RecentChat/dto';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OpponentInfoAtom } from '../../../recoil/OpponentInfo';
import ProfileImg from '/ProfileImg.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
dayjs.extend(relativeTime);

// createdAt은 어디에 사용?
const ChatRoomList: React.FC<ChatRoomDto> = ({ id, createdAt, opponent, latestMessage }) => {
	let isUnread = false;
	const nav = useNavigate();
	const [opponentInfo, setOpponentInfo] = useRecoilState(OpponentInfoAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>(null);

	if (latestMessage.createdAt) {
		// toUserReadAt이 내가 마지막으로 읽은 시간이 아니라면
		// 즉 해당 메시지의 receiver가 해당 메시지를 읽은 시간이라면
		// toUserReadAt === null일 때 isUnread가 될 수 없고,
		// (내가 메시지를 보내고 상대방이 읽지 않은 상황에도 응답 대기중 발생)
		// fromUserId가 필요할 듯
		isUnread = false;
	}

	useEffect(() => {
		if (latestMessage.createdAt) {
			// 초기 시간 설정
			setTimeAgo(dayjs(latestMessage.createdAt).locale('ko').fromNow());

			// 60초마다 `timeAgo`를 업데이트
			const interval = setInterval(() => {
				setTimeAgo(dayjs(latestMessage.createdAt).locale('ko').fromNow());
			}, 60000);

			// 컴포넌트 언마운트 시 타이머 정리
			return () => clearInterval(interval);
		} else {
			setTimeAgo(null);
		}
	}, [latestMessage.createdAt]);

	const onClickChatRoom = () => {
		setOpponentInfo(opponent);
		nav(`/chats/${id}/${opponent.id}`);
	};

	return (
		<ChatRoomListLayout onClick={onClickChatRoom}>
			<UserImage src={opponent.profilePictureUrl || ProfileImg} alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					{opponent.name || '알수없음'}
				</StyledText>
				<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray3}>
					{latestMessage.content}
				</StyledText>
			</LeftBox>
			<RightBox $isUnread={isUnread}>
				<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.193 }} color={theme.colors.gray3}>
					{timeAgo}
				</StyledText>
				{timeAgo && isUnread && (
					<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.193 }} color={theme.colors.gray3}>
						응답 대기중
					</StyledText>
				)}
			</RightBox>
		</ChatRoomListLayout>
	);
};

export default ChatRoomList;
