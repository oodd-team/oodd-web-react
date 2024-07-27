import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MessagesContainer } from './styles';
import TopBar from './TopBar';
import RcvdMessage from './RcvdMessage';
import SentMessage from './SentMessage';
import DateBar from './DateBar';
import ChatBox from './ChatBox';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MockMessagesAtom } from '../../recoil/MockMessages';
import { isClickedMenuAtom } from '../../recoil/isClickedMenu';
import BottomSheet from '../../components/BottomSheet';
import SheetItemWithDivider from '../../components/SheetItemWithDivider';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import ConfirmationModal from '../../components/ConfirmationModal';

interface Message {
	id: number;
	text: string;
	sender: string;
	receiver: string;
	timestamp: Date;
}

interface ExtendedMessage extends Message {
	isFirst: boolean;
	isNewDate: boolean;
	printTime: boolean;
	formattedTime: string;
}

interface SheetItem {
	text: string;
	action: () => any;
}

// 타임스탬프를 메시지 옆에 출력되는 시간의 형태로 반환하는 함수
export const formatTime = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}`;
};

const ChatRoom: React.FC = () => {
	const { id } = useParams<string>();
	const [newMockMessages, setNewMockMessages] = useState<ExtendedMessage[]>([]);
	const mockMessages = useRecoilValue(MockMessagesAtom);
	const [isClickedMenu, setIsClickedMenu] = useRecoilState(isClickedMenuAtom);
	const [isClickedLeave, setIsClickedLeave] = useState<boolean>(false);
	const [isClickedBlock, setIsClickedBlock] = useState<boolean>(false);

	const sheetItems: SheetItem[] = [
		{
			text: '채팅방 나가기',
			action: (): void => {
				setIsClickedMenu(false);
				setIsClickedLeave(true);
			},
		},
		{
			text: '차단하기',
			action: (): void => {
				setIsClickedMenu(false);
				setIsClickedBlock(true);
			},
		},
	];

	// BottomSheet 닫는 함수
	const closeSheet = () => {
		setIsClickedMenu(false);
	};

	// DateBar 표시 여부를 결정하는 함수
	const isNextDay = (curDate: Date, lastDate: Date): boolean => {
		return (
			curDate.getFullYear() !== lastDate.getFullYear() ||
			curDate.getMonth() !== lastDate.getMonth() ||
			curDate.getDate() !== lastDate.getDate()
		);
	};

	// 기존 대화 내역에 대한 정보 추가
	useEffect(() => {
		const temp: ExtendedMessage[] = mockMessages.map((message: Message, index: number) => {
			let isFirst = false;
			let isNewDate = false;
			let printTime = false;

			const prevMessage = index !== 0 ? mockMessages[index - 1] : null;
			const nextMessage = index !== mockMessages.length - 1 ? mockMessages[index + 1] : null;

			// 첫 메시지거나, 전송자가 바뀐 경우에
			// 프로필 사진 출력 또는 간격 설정
			if (prevMessage === null || prevMessage.sender !== message.sender) {
				isFirst = true;
			}

			// 첫 메시지가 아니고, 날짜가 바뀐 경우에
			// 날짜 표시줄 출력
			if (prevMessage !== null && isNextDay(message.timestamp, prevMessage.timestamp)) {
				isNewDate = true;
			}

			// 가장 마지막 메시지이거나
			// 전송자가 바뀌기 직전 또는 시간이 바뀌기 직전인 경우
			// 메시지 전송 시각 출력
			if (
				nextMessage === null ||
				message.sender !== nextMessage.sender ||
				formatTime(message.timestamp) !== formatTime(nextMessage.timestamp)
			) {
				printTime = true;
			}

			return { ...message, isFirst, isNewDate, printTime, formattedTime: formatTime(message.timestamp) };
		});

		setNewMockMessages(temp);
	}, [mockMessages]);

	return (
		<div
			style={{ margin: 'auto', maxWidth: '32rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
		>
			{isClickedLeave && (
				<ConfirmationModal
					content="채팅방을 나가면 지난 대화 내용을 볼 수 없어요"
					confirms={[
						{
							text: '취소',
							action: () => {
								setIsClickedLeave(false);
							},
						},
						{
							text: '채팅방 나가기',
							action: () => {
								setIsClickedLeave(false);
							},
						},
					]}
					onClickBackground={() => {
						setIsClickedLeave(false);
					}}
				/>
			)}
			{isClickedBlock && (
				<ConfirmationModal
					content="IDID님을 정말로 차단하시겠어요?"
					confirms={[
						{
							text: '취소',
							action: () => {
								setIsClickedBlock(false);
							},
						},
						{
							text: '차단하기',
							action: () => {
								setIsClickedBlock(false);
							},
						},
					]}
					onClickBackground={() => {
						setIsClickedBlock(false);
					}}
				/>
			)}
			{isClickedMenu && (
				<BottomSheet
					shadow={true}
					component={<SheetItemWithDivider items={sheetItems} marginBottom={'60px'} />}
					onClickBackground={closeSheet}
				/>
			)}
			<TopBar />
			<MessagesContainer>
				{newMockMessages.map((message: ExtendedMessage) => {
					return (
						<div key={message.id}>
							{message.isNewDate && (
								<DateBar formattedDate={format(message.timestamp, 'yyyy년 MM월 dd일 EEEE', { locale: ko })} />
							)}
							{message.sender === 'user1' ? <SentMessage {...message} /> : <RcvdMessage {...message} />}
						</div>
					);
				})}
			</MessagesContainer>
			<ChatBox></ChatBox>
		</div>
	);
};

export default ChatRoom;
