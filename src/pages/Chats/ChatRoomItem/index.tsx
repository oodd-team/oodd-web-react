import { StyledText } from '../../../components/Text/StyledText';
import { UserImage, ChatRoomItemLayout, LeftBox, RightBox, LatestMessage } from './styles';
import theme from '../../../styles/theme';
import { ChatRoomDto } from '../RecentChat/dto';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OpponentInfoAtom } from '../../../recoil/util/OpponentInfo';
import ProfileImg from '/ProfileImg.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
dayjs.extend(relativeTime);

const ChatRoomItem: React.FC<ChatRoomDto & { swiperRef: React.MutableRefObject<SwiperCore | null> }> = ({
	swiperRef,
	id,
	fromUserId,
	requestStatus,
	createdAt,
	opponent,
	latestMessage,
}) => {
	let isUnread = false;
	const nav = useNavigate();
	const [, setOpponentInfo] = useRecoilState(OpponentInfoAtom);
	const [timeAgo, setTimeAgo] = useState<string | null>(null);
	const storageValue = localStorage.getItem('id');
	const userId = storageValue ? Number(storageValue) : -1;

	if (createdAt) {
		// 상대방에게서 온 pending 상태의 요청
		isUnread = fromUserId !== userId && requestStatus === 'pending';
	}

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
	}, [latestMessage.createdAt]);

	const onClickChatRoom = () => {
		if (requestStatus === 'pending' && swiperRef.current) {
			swiperRef?.current.slideTo(0);
		} else {
			setOpponentInfo(opponent);
			nav(`/chats/${id}`);
		}
	};

	return (
		<ChatRoomItemLayout onClick={onClickChatRoom}>
			<UserImage src={opponent.profilePictureUrl || ProfileImg} alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body2-medium' }} color="#1D1D1D">
					{opponent.nickname || opponent.name || '알수없음'}
				</StyledText>
				<LatestMessage $textTheme={{ style: 'caption2-regular' }} color="#1D1D1D">
					{latestMessage.content}
				</LatestMessage>
			</LeftBox>
			<RightBox $isUnread={isUnread}>
				<StyledText $textTheme={{ style: 'caption2-regular' }} color="#8e8e93">
					{timeAgo}
				</StyledText>
				// TODO: pending 상태 채팅방 목록에서 없애나?
				{!!timeAgo && isUnread && (
					<StyledText $textTheme={{ style: 'body6-regular' }} color={theme.colors.gray3}>
						응답 대기중
					</StyledText>
				)}
			</RightBox>
		</ChatRoomItemLayout>
	);
};

export default ChatRoomItem;
