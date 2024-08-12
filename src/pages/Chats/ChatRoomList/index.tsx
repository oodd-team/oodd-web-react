import { StyledText } from '../../../components/Text/StyledText';
import { UserImage, ChatRoomListLayout, LeftBox, RightBox } from './styles';
import theme from '../../../styles/theme';
import { ChatRoomDto } from '../RecentChat/dto';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { OpponentInfoAtom } from '../../../recoil/OpponentInfo';
import ProfileImg from '../../../../public/ProfileImg.svg';

// createdAt은 어디에 사용?
const ChatRoomList: React.FC<ChatRoomDto> = ({ id, createdAt, opponent, latestMessage }) => {
	let isUnread = false;
	const nav = useNavigate();
	const [opponentInfo, setOpponentInfo] = useRecoilState(OpponentInfoAtom);

	if (latestMessage.createdAt && latestMessage.toUserReadAt) {
		isUnread = latestMessage.createdAt.getTime() > latestMessage.toUserReadAt.getTime();
	}

	const onClickChatRoom = () => {
		setOpponentInfo(opponent);
		nav(`/chats/${id}/${opponent.id}`);
	};

	return (
		<ChatRoomListLayout onClick={onClickChatRoom}>
			<UserImage src={opponent.profilePictureUrl || ProfileImg} alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					{opponent.name}
				</StyledText>
				<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray3}>
					{latestMessage.content}
				</StyledText>
			</LeftBox>
			<RightBox $isUnread={isUnread}>
				<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.193 }} color={theme.colors.gray3}>
					30분 전
				</StyledText>
				{isUnread && (
					<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.193 }} color={theme.colors.gray3}>
						응답 대기중
					</StyledText>
				)}
			</RightBox>
		</ChatRoomListLayout>
	);
};

export default ChatRoomList;
