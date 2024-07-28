import { StyledText } from '../../../components/Text/StyledText';
import { UserImage, ChatListLayout, LeftBox, RightBox } from './styles';
import theme from '../../../styles/theme';

interface ChatListProps {
	isWaiting: boolean; // 응답 대기중 표시 여부 결정
}

// TODO: isWaiting 불투명도 영역 설정
// 와이어프레임에는 ChatList 전체가 불투명도 50%
// 그 외에는 RrightBox만 불투명도 50%
const ChatList: React.FC<ChatListProps> = ({ isWaiting }) => {
	return (
		<ChatListLayout>
			<UserImage src="../../../../0.png" alt="user" />
			<LeftBox>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					IDID
				</StyledText>
				<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1.2 }} color={theme.colors.gray3}>
					ㅋㅋㅋㅋ
				</StyledText>
			</LeftBox>
			<RightBox $isWaiting={isWaiting}>
				<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.193 }} color={theme.colors.gray3}>
					30분 전
				</StyledText>
				{isWaiting && (
					<StyledText $textTheme={{ style: 'body6-regular', lineHeight: 1.193 }} color={theme.colors.black}>
						응답 대기중
					</StyledText>
				)}
			</RightBox>
		</ChatListLayout>
	);
};

export default ChatList;
