import { StyledText } from '../../../components/Text/StyledText';
import { UserImage, ChatListLayout, LeftBox, RightBox } from './styles';
import theme from '../../../styles/theme';
import { ChatRoomDto } from '../RecentChat/dto';

// createdAt은 어디에 사용?
const ChatList: React.FC<ChatRoomDto> = ({ id, createdAt, opponent, latestMessage }) => {
	let isUnread = false;
	if (latestMessage.createdAt && latestMessage.toUserReadAt) {
		isUnread = latestMessage.createdAt.getTime() > latestMessage.toUserReadAt.getTime();
	}

	return (
		<ChatListLayout id={String(id)}>
			<UserImage src="../../../../0.png" alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					{opponent.id}
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
		</ChatListLayout>
	);
};

export default ChatList;
