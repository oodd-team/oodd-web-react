import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { MessagesContainer } from './styles';
import { OODDFrame } from '../../../components/Frame/Frame';
import TopBar from '../../../components/TopBar';
import RcvdMessage from './RcvdMessage';
import SentMessage from './SentMessage';
import DateBar from './DateBar';
import ChatBox from './ChatBox';
import BottomSheet from '../../../components/BottomSheet';
import BottomSheetMenu from '../../../components/BottomSheetMenu';
import Modal from '../../../components/Modal';
import Loading from '../../../components/Loading';
import { ExtendedMessageDto } from './dto';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import { BottomSheetMenuProps } from '../../../components/BottomSheetMenu/dto';
import { ModalProps } from '../../../components/Modal/dto';
import { createExtendedMessages } from './createExtendedMessages';
import { AllMesagesAtom } from '../../../recoil/Chats/AllMessages';
import { OpponentInfoAtom } from '../../../recoil/util/OpponentInfo';
import { useSocket } from '../../../context/SocketProvider';
import Back from '../../../assets/arrow/left.svg';
import KebabMenu from '../../../assets/default/more.svg';
import Exit from '../../../assets/default/leave.svg';
import Block from '../../../assets/default/block.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { chatRoomMessagesData } from '../../../apis/chatting/dto';
import { postUserBlockApi } from '../../../apis/user';
import { PostUserBlockRequest } from '../../../apis/user/dto';
import { handleError } from '../../../apis/util/handleError';

const ChatRoom: React.FC = () => {
	const [extendedMessages, setextendedMessages] = useState<ExtendedMessageDto[]>([]);
	const [allMessages, setAllMessages] = useRecoilState(AllMesagesAtom);

	const [isMenuBottomSheetOpen, setIsMenuBottomSheetOpen] = useState(false);
	const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
	const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');

	const [isLoading, setIsLoading] = useState(true);
	const [isScroll, setIsScroll] = useState(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const messageLengthRef = useRef(0);

	const storageValue = localStorage.getItem('my_id');
	const userId = storageValue ? Number(storageValue) : -1;
	const { chatRoomId } = useParams();
	const opponentInfo = useRecoilValue(OpponentInfoAtom);

	const nav = useNavigate();
	const socket = useSocket();

	// 프로필 사진 클릭 시 프로필 페이지로 이동
	const handleUserClick = useCallback(() => {
		const opponentId = opponentInfo?.id ? opponentInfo.id : -1;
		if (opponentId === -1) {
			setModalContent('유저 정보를 찾을 수 없습니다.');
			setIsStatusModalOpen(true);
		} else {
			nav(`/users/${opponentId}`);
		}
	}, [opponentInfo, nav]);

	// 유저 차단 api
	const postUserBlock = async () => {
		try {
			const data: PostUserBlockRequest = {
				fromUserId: userId,
				toUserId: opponentInfo?.id || -1,
				action: 'block',
			};
			const response = await postUserBlockApi(data);

			if (response.isSuccess) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error, 'user');
			setModalContent(errorMessage);
		} finally {
			setIsBlockModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 채팅방 나가기 api
	const leaveChatRoom = () => {
		if (socket) {
			const data = {
				chatRoomId: Number(chatRoomId),
				userId: userId,
			};
			socket.emit('leaveChatRoom', data);
			nav('/chats', { replace: true });
		}
	};

	// 전체 메시지 조회
	const getChatRoomMessages = (data: chatRoomMessagesData[]) => {
		setAllMessages(data);
		if (data.length > messageLengthRef.current) {
			setIsScroll((prev) => !prev);
		}
		setIsLoading(false);
	};

	// 새 메시지 수신
	const getNewMessage = (data: chatRoomMessagesData) => {
		setAllMessages((prevMessages) => [...prevMessages, data]);
		setIsScroll((prev) => !prev);
	};

	useEffect(() => {
		if (socket) {
			// 채팅방 입장
			socket.emit('joinChatRoom', Number(chatRoomId));

			// 전체 메시지 조회
			socket.emit('getChatRoomMessages', Number(chatRoomId));
			socket.on('chatRoomMessages', getChatRoomMessages);

			// 최근 메시지 조회
			socket.on('newMessage', getNewMessage);
		}

		// 컴포넌트 언마운트 시 실행
		return () => {
			if (socket.connected) {
				socket.removeListener('chatRoomMessages');
				socket.removeListener('newMessage');
			}
		};
	}, [chatRoomId]);

	// 메시지 렌더링에 필요한 정보 추가
	useEffect(() => {
		const temp = createExtendedMessages(allMessages, userId, opponentInfo);
		setextendedMessages(temp);
	}, [allMessages]);

	const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) ref.current.scrollIntoView();
	};

	useEffect(() => {
		// 채팅방 입장 시 스크롤 아래로 이동
		const messagesContainer = chatWindowRef.current?.parentElement;

		if (messagesContainer) {
			messagesContainer.style.scrollBehavior = 'auto';
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}, []);

	// 메시지 수신 시 스크롤 아래로 이동
	useEffect(() => {
		if (isScroll) {
			scrollToBottom(chatWindowRef);
			setIsScroll((prev) => !prev);
		}
	}, [isScroll]);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '채팅방 나가기',
				action: () => {
					setIsMenuBottomSheetOpen(false);
					setIsLeaveModalOpen(true);
				},
				icon: Exit,
			},
			{
				text: '차단하기',
				action: () => {
					setIsMenuBottomSheetOpen(false);
					setIsBlockModalOpen(true);
				},
				icon: Block,
			},
		],
		marginBottom: '4.38rem',
	};

	const leaveModalProps: ModalProps = {
		content: '채팅방을 나가면\n지난 대화 내용을 볼 수 없어요.',
		isCloseButtonVisible: true,
		button: {
			content: '나가기',
			onClick: leaveChatRoom,
		},
		onClose: () => {
			setIsLeaveModalOpen(false);
		},
	};

	const blockModalProps: ModalProps = {
		content: 'IDID님을 정말로 차단하시겠어요?',
		isCloseButtonVisible: true,
		button: {
			content: '차단하기',
			onClick: postUserBlock,
		},
		onClose: () => {
			setIsBlockModalOpen(false);
		},
	};

	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	const kebabMenuBottomSheet: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isMenuBottomSheetOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsMenuBottomSheetOpen(false);
		},
	};

	return (
		<OODDFrame>
			{isLoading && <Loading />}
			{isLeaveModalOpen && <Modal {...leaveModalProps} />}
			{isBlockModalOpen && <Modal {...blockModalProps} />}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
			<BottomSheet {...kebabMenuBottomSheet} />
			<TopBar
				text={opponentInfo?.nickname || '알수없음'}
				LeftButtonSrc={Back}
				RightButtonSrc={KebabMenu}
				onLeftClick={() => {
					nav(-1);
				}}
				onRightClick={() => {
					setIsMenuBottomSheetOpen(true);
				}}
				$withBorder={true}
			/>
			<MessagesContainer $isLoading={isLoading}>
				{extendedMessages.map((message: ExtendedMessageDto) => {
					return (
						<div key={message.id}>
							{message.isDateBarVisible && (
								<DateBar formattedDate={dayjs(message.createdAt).locale('ko').format('YYYY년 MM월 DD일 dddd')} />
							)}
							{message.sentMessage ? (
								<SentMessage {...message.sentMessage} />
							) : message.rcvdMessage ? (
								<RcvdMessage {...message.rcvdMessage} onClickProfile={handleUserClick} />
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
