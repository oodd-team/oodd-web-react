import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { MessagesContainer } from './styles';
import TopBar from '../../../components/TopBar';
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
import { useNavigate, useParams } from 'react-router-dom';
import request from '../../../apis/core';
import { MockUserIdAtom } from '../../../recoil/MockUserId';
import { AllMesagesAtom } from '../../../recoil/AllMessages';
import { OpponentInfoAtom } from '../../../recoil/OpponentInfo';
import ProfileImg from '/ProfileImg.svg';
import Back from '../../../assets/Chats/Back.svg';
import KebabMenu from '../../../assets/Chats/KebabMenu.svg';
import { useSocket } from '../../../recoil/SocketProvider';
import { ApiDto } from './dto';

const ChatRoom: React.FC = () => {
	const [extendedMessages, setextendedMessages] = useState<ExtendedMessageDto[]>([]);
	const [allMessages, setAllMessages] = useRecoilState(AllMesagesAtom);
	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const [isOpenLeave, setIsOpenLeave] = useState<boolean>(false);
	const [isOpenBlock, setIsOpenBlock] = useState<boolean>(false);

	const [isScroll, setIsScroll] = useState<boolean>(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const messageLengthRef = useRef(0);

	const userId = useRecoilValue(MockUserIdAtom);
	const opponentInfo = useRecoilValue(OpponentInfoAtom);
	const { roomId, opponentId } = useParams();
	const nav = useNavigate();
	const socket = useSocket();

	useEffect(() => {
		// 채팅방 입장
		socket.emit('enterChatRoom', roomId);

		// 전체 메시지 조회
		socket.on('AllMessages', (messages) => {
			setAllMessages(messages);
			if (messages.length > messageLengthRef.current) {
				setIsScroll(true);
				setIsLoaded(true);
			}
		});

		// 최근 메시지 조회
		socket.on('latestMessage', (message) => {
			setAllMessages([...allMessages, message]);
			setIsScroll(true);
		});

		// 컴포넌트 언마운트 시 실행
		return () => {
			if (socket.connected) {
				socket.removeListener('AllMessages');
				socket.removeListener('latestMessage');
			}
		};
	}, [socket, roomId]);

	function scrollToBottom(ref: React.RefObject<HTMLDivElement>) {
		if (ref.current) ref.current.scrollIntoView();
	}

	// 채팅방 입장 시 스크롤 아래로 이동
	useEffect(() => {
		const messagesContainer = chatWindowRef.current?.parentElement; // MessagesContainer에 접근
		if (messagesContainer) {
			messagesContainer.style.scrollBehavior = 'auto';
			messagesContainer.scrollTop = messagesContainer.scrollHeight; // 애니메이션 없이 스크롤 이동
		}
	}, []);

	// 메시지 수신 시 스크롤 아래로 이동
	useEffect(() => {
		if (isScroll) {
			chatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
			scrollToBottom(chatWindowRef);
			setIsScroll(false);
		}
	}, [isScroll]);

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
						const response = await request.patch<ApiDto>(`/chat-rooms/${roomId}/leave/${userId}`);

						if (response.isSuccess) {
							nav(-1);
						} else {
							console.error(response.message);
						}
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
				const blockUser = async () => {
					try {
						const requestBody = {
							userId: userId,
							friendId: opponentInfo?.id,
							action: 'toggle',
						};
						const response = await request.put<ApiDto>('/block', requestBody);

						if (response.isSuccess) {
							nav(-1);
						} else {
							console.error(response.message);
						}
					} catch {}
				};
				blockUser();
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
			const formattedTime = dayjs(message.createdAt).format('HH:mm');

			// 채팅의 첫 메시지가 아니고, 날짜가 바뀐 경우 날짜 표시줄 출력
			let isNewDate = prevMessage !== null && isNextDay(message.createdAt, prevMessage.createdAt);

			// 채팅의 첫 메시지이거나 전송자 또는 날짜가 바뀐 경우 프로필 사진 출력
			let isFirst = prevMessage === null || prevMessage.fromUser.id !== message.fromUser.id || isNewDate;

			// 가장 마지막 메시지이거나,
			// 전송자 또는 시간 또는 날짜가 바뀌기 직전인 경우
			// 메시지 전송 시각 출력
			let isPrintTime =
				nextMessage === null ||
				message.fromUser.id !== nextMessage.fromUser.id ||
				formattedTime !== dayjs(nextMessage.createdAt).format('HH:mm') ||
				isNextDay(nextMessage.createdAt, message.createdAt);

			// 채팅의 첫 메시지가 아니고, 전송자가 바뀐 경우 margin-top 추가
			let isSenderChanged = prevMessage !== null && !isNewDate && prevMessage.fromUser.id !== message.fromUser.id;

			// 보낸 메시지일 경우 sentMessage 속성 추가
			// 받은 메시지일 경우 rcvdMessage 속성 추가
			if (message.fromUser.id === userId) {
				const sentMessage: SentMessageProps = { content: message.content, isSenderChanged, isPrintTime, formattedTime };
				return { ...message, isNewDate, sentMessage };
			} else {
				const rcvdMessage: RcvdMessageProps = {
					fromUserName: opponentInfo?.name || '알수없음',
					profilePictureUrl: opponentInfo?.profilePictureUrl || ProfileImg,
					content: message.content,
					isFirst,
					isSenderChanged,
					isPrintTime,
					formattedTime,
				};
				return { ...message, isNewDate, rcvdMessage };
			}
		});

		setextendedMessages(temp);
	}, [allMessages]);

	return (
		<OODDFrame>
			{isOpenLeave && <ConfirmationModal {...leaveModal} />}
			{isOpenBlock && <ConfirmationModal {...blockModal} />}
			<BottomSheet {...kebabMenuBottomSheet} />
			<TopBar
				text={opponentInfo?.name || '알수없음'}
				LeftButtonSrc={Back}
				RightButtonSrc={KebabMenu}
				onLeftClick={() => {
					nav(-1);
				}}
				onRightClick={() => {
					setIsOpenMenu(true);
				}}
				$withBorder={true}
			/>
			<MessagesContainer style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
				{extendedMessages.map((message: ExtendedMessageDto) => {
					return (
						<div key={message.id}>
							{message.isNewDate && (
								<DateBar formattedDate={dayjs(message.createdAt).locale('ko').format('YYYY년 MM월 DD일 dddd')} />
							)}
							{message.sentMessage ? (
								<SentMessage {...message.sentMessage} />
							) : message.rcvdMessage ? (
								<RcvdMessage {...message.rcvdMessage} />
							) : null}
						</div>
					);
				})}
				<div ref={chatWindowRef} />
			</MessagesContainer>
			<ChatBox></ChatBox>
		</OODDFrame>
	);
};

export default ChatRoom;
