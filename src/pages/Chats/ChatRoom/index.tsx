import { useState, useEffect } from 'react';
import { MessagesContainer } from './styles';
import TopBar from './TopBar';
import RcvdMessage from './RcvdMessage';
import SentMessage from './SentMessage';
import DateBar from './DateBar';
import ChatBox from './ChatBox';
import { useRecoilState, useRecoilValue } from 'recoil';
import BottomSheet from '../../../components/BottomSheet';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import ConfirmationModal from '../../../components/ComfirmationModal';
import { OODDFrame } from '../../../components/Frame/Frame';
import { MessageDto, ExtendedMessageDto, SentMessageProps, RcvdMessageProps } from '../dto';
import { ConfirmationModalProps } from '../../../components/ComfirmationModal/dto';
import Exit from '../../../assets/BottomSheetMenu/Exit.svg';
import Block from '../../../assets/BottomSheetMenu/Block.svg';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import BottomSheetMenu from '../../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../../components/BottomSheetMenu/dto';
import { useParams } from 'react-router-dom';
import request from '../../../apis/core';
import { MockUserIdAtom } from '../../../recoil/MockUserId';
import { AllMesagesAtom } from '../../../recoil/AllMessages';

const ChatRoom: React.FC = () => {
	const [extendedMessages, setExtendedMessages] = useState<ExtendedMessageDto[]>([]);
	const [allMessages, setAllMessages] = useRecoilState(AllMesagesAtom);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [isOpenLeave, setIsOpenLeave] = useState<boolean>(false);
	const [isOpenBlock, setIsOpenBlock] = useState<boolean>(false);
	const userId = useRecoilValue(MockUserIdAtom);
	const roomId = useParams();

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '채팅방 나가기',
				action: () => {
					setIsOpenLeave(true);
					setIsOpenMenu(false);
				},
				icon: Exit,
			},
			{
				text: '차단하기',
				action: () => {
					setIsOpenBlock(true);
					setIsOpenMenu(false);
				},
				icon: Block,
			},
		],
		marginBottom: '4.38rem',
	};

	const leaveModal: ConfirmationModalProps = {
		content: '채팅방을 나가면\n지난 대화 내용을 볼 수 없어요',
		isCancelButtonVisible: true,
		confirm: {
			text: '채팅방 나가기',
			action: () => {
				const leaveChatRoom = async () => {
					try {
						await request.patch(`/chat-rooms/${roomId}/leave/${userId}`);
					} catch (error) {
						console.error(error);
					}
				};
				leaveChatRoom();
				setIsOpenLeave(false);
			},
		},
		onCloseModal: () => {
			setIsOpenLeave(false);
		},
	};

	const blockModal: ConfirmationModalProps = {
		content: 'IDID님을 정말로 차단하시겠어요?',
		isCancelButtonVisible: true,
		confirm: {
			text: '차단하기',
			action: () => {
				setIsOpenBlock(false);
			},
		},
		onCloseModal: () => {
			setIsOpenBlock(false);
		},
	};

	const kebabMenuBottomSheet: BottomSheetProps = {
		isOpenBottomSheet: isOpenMenu,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsOpenMenu(false);
		},
	};

	// DateBar 표시 여부를 결정하는 함수
	const isNextDay = (curDate: Date, lastDate: Date): boolean => {
		const curDateDayjs = dayjs(curDate);
		const lastDateDayjs = dayjs(lastDate);
		return !curDateDayjs.isSame(lastDateDayjs, 'day');
	};

	// 기존 대화 내역에 대한 정보 추가
	useEffect(() => {
		const temp: ExtendedMessageDto[] = allMessages.map((message: MessageDto, index: number) => {
			const prevMessage = index !== 0 ? allMessages[index - 1] : null;
			const nextMessage = index !== allMessages.length - 1 ? allMessages[index + 1] : null;
			const formattedTime = dayjs(message.datetime).format('HH:mm');

			// 채팅의 첫 메시지가 아니고, 날짜가 바뀐 경우 날짜 표시줄 출력
			let isNewDate = prevMessage !== null && isNextDay(message.datetime, prevMessage.datetime);

			// 채팅의 첫 메시지이거나 전송자 또는 날짜가 바뀐 경우 프로필 사진 출력
			let isFirst = prevMessage === null || prevMessage.fromUserId !== message.fromUserId || isNewDate;

			// 가장 마지막 메시지이거나,
			// 전송자 또는 시간 또는 날짜가 바뀌기 직전인 경우
			// 메시지 전송 시각 출력
			let isPrintTime =
				nextMessage === null ||
				message.fromUserId !== nextMessage.fromUserId ||
				formattedTime !== dayjs(nextMessage.datetime).format('HH:mm') ||
				isNextDay(nextMessage.datetime, message.datetime);

			// 채팅의 첫 메시지가 아니고, 전송자가 바뀐 경우 margin-top 추가
			let isSenderChanged = prevMessage !== null && !isNewDate && prevMessage.fromUserId !== message.fromUserId;

			// 보낸 메시지일 경우 sentMessage 속성 추가
			// 받은 메시지일 경우 rcvdMessage 속성 추가
			if (message.fromUserId === userId) {
				const sentMessage: SentMessageProps = { text: message.text, isSenderChanged, isPrintTime, formattedTime };
				return { ...message, isNewDate, sentMessage };
			} else {
				const rcvdMessage: RcvdMessageProps = {
					fromUserId: message.fromUserId,
					text: message.text,
					isFirst,
					isSenderChanged,
					isPrintTime,
					formattedTime,
				};
				return { ...message, isNewDate, rcvdMessage };
			}
		});

		setExtendedMessages(temp);
	}, [allMessages]);

	return (
		<OODDFrame>
			{isOpenLeave && <ConfirmationModal {...leaveModal} />}
			{isOpenBlock && <ConfirmationModal {...blockModal} />}
			<BottomSheet {...kebabMenuBottomSheet} />
			<TopBar
				handleMenu={() => {
					setIsOpenMenu(true);
				}}
			/>
			<MessagesContainer>
				{extendedMessages.map((message: ExtendedMessageDto) => {
					return (
						<div key={message.id}>
							{message.isNewDate && (
								<DateBar formattedDate={dayjs(message.datetime).locale('ko').format('YYYY년 MM월 DD일 dddd')} />
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
