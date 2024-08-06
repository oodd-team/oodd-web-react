import { useState, useEffect } from 'react';
import { MessagesContainer } from './styles';
import TopBar from './TopBar';
import RcvdMessage from './RcvdMessage';
import SentMessage from './SentMessage';
import DateBar from './DateBar';
import ChatBox from './ChatBox';
import { useRecoilValue } from 'recoil';
import { MockMessagesAtom } from '../../../recoil/MockMessages';
import BottomSheet from '../../../components/BottomSheet';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { OODDFrame } from '../../../components/Frame/Frame';
import { MessageDto, ExtendedMessageDto, SentMessageProps, RcvdMessageProps } from '../dto';
import { ConfirmationModalDto } from '../../../components/ConfirmationModal/dto';
import Exit from '../../../assets/BottomSheetMenu/Exit.svg';
import Block from '../../../assets/BottomSheetMenu/Block.svg';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import BottomSheetMenu from '../../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../../components/BottomSheetMenu/dto';

const ChatRoom: React.FC = () => {
	const [newMockMessages, setNewMockMessages] = useState<ExtendedMessageDto[]>([]);
	const mockMessages = useRecoilValue(MockMessagesAtom);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [isOpenExit, setIsOpenExit] = useState<boolean>(false);
	const [isOpenBlock, setIsOpenBlock] = useState<boolean>(false);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '채팅방 나가기',
				action: () => {
					setIsOpenMenu(false);
				},
				icon: Exit,
			},
			{
				text: '차단하기',
				action: () => {
					setIsOpenMenu(false);
				},
				icon: Block,
			},
		],
		marginBottom: '4.38rem',
	};

	const exitModal: ConfirmationModalDto = {
		content: '채팅방을 나가면 지난 대화 내용을 볼 수 없어요',
		confirms: [
			{
				text: '취소',
				action: () => {
					setIsOpenExit(false);
				},
			},
			{
				text: '채팅방 나가기',
				action: () => {
					setIsOpenExit(false);
				},
			},
		],
		onClickBackground: () => {
			setIsOpenExit(false);
		},
	};

	const blockModal: ConfirmationModalDto = {
		content: 'IDID님을 정말로 차단하시겠어요?',
		confirms: [
			{
				text: '취소',
				action: () => {
					setIsOpenBlock(false);
				},
			},
			{
				text: '차단하기',
				action: () => {
					setIsOpenBlock(false);
				},
			},
		],
		onClickBackground: () => {
			setIsOpenBlock(false);
		},
	};

	const MenuBottomSheet: BottomSheetProps = {
		isOpenBottomSheet: isOpenMenu,
		isBackgroundDimmed: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsOpenMenu(false);
		},
	};

	// DateBar 표시 여부를 결정하는 함수
	const isNextDay = (curDate: dayjs.Dayjs, lastDate: dayjs.Dayjs): boolean => {
		return !curDate.isSame(lastDate, 'day');
	};

	// 기존 대화 내역에 대한 정보 추가
	useEffect(() => {
		const temp: ExtendedMessageDto[] = mockMessages.map((message: MessageDto, index: number) => {
			const prevMessage = index !== 0 ? mockMessages[index - 1] : null;
			const nextMessage = index !== mockMessages.length - 1 ? mockMessages[index + 1] : null;
			const formattedTime = message.timestamp.format('HH:mm');

			// 채팅의 첫 메시지가 아니고, 날짜가 바뀐 경우 날짜 표시줄 출력
			let isNewDate = prevMessage !== null && isNextDay(message.timestamp, prevMessage.timestamp);

			// 채팅의 첫 메시지이거나 전송자 또는 날짜가 바뀐 경우 프로필 사진 출력
			let isFirst = prevMessage === null || prevMessage.sender !== message.sender || isNewDate;

			// 가장 마지막 메시지이거나,
			// 전송자 또는 시간 또는 날짜가 바뀌기 직전인 경우
			// 메시지 전송 시각 출력
			let printTime =
				nextMessage === null ||
				message.sender !== nextMessage.sender ||
				formattedTime !== nextMessage.timestamp.format('HH:mm') ||
				isNextDay(nextMessage.timestamp, message.timestamp);

			// 보낸 메시지일 경우 sentMessage 속성 추가
			// 받은 메시지일 경우 rcvdMessage 속성 추가
			if (message.sender === 'me') {
				const sentMessage: SentMessageProps = { text: message.text, printTime, formattedTime };
				return { ...message, isNewDate, sentMessage };
			} else {
				const rcvdMessage: RcvdMessageProps = {
					sender: message.sender,
					text: message.text,
					isFirst,
					printTime,
					formattedTime,
				};
				return { ...message, isNewDate, rcvdMessage };
			}
		});

		setNewMockMessages(temp);
	}, [mockMessages]);

	return (
		<OODDFrame>
			{isOpenExit && <ConfirmationModal {...exitModal} />}
			{isOpenBlock && <ConfirmationModal {...blockModal} />}
			<BottomSheet {...MenuBottomSheet} />
			<TopBar
				handleMenu={() => {
					setIsOpenMenu(true);
				}}
			/>
			<MessagesContainer>
				{newMockMessages.map((message: ExtendedMessageDto) => {
					return (
						<div key={message.id}>
							{message.isNewDate && (
								<DateBar formattedDate={message.timestamp.locale('ko').format('YYYY년 MM월 DD일 dddd')} />
							)}
							{message.sentMessage ? (
								<SentMessage {...message.sentMessage} />
							) : message.rcvdMessage ? (
								<RcvdMessage {...message.rcvdMessage} />
							) : null}
						</div>
					);
				})}
			</MessagesContainer>
			<ChatBox></ChatBox>
		</OODDFrame>
	);
};

export default ChatRoom;
