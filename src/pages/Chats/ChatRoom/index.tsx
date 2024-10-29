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
import ConfirmationModal from '../../../components/ConfirmationModal';
import Modal from '../../../components/Modal';
import Loading from '../../../components/Loading';
import { ExtendedMessageDto } from '../dto';
import { BottomSheetProps } from '../../../components/BottomSheet/dto';
import { BottomSheetMenuProps } from '../../../components/BottomSheetMenu/dto';
import { ConfirmationModalProps } from '../../../components/ConfirmationModal/dto';
import { ModalProps } from '../../../components/Modal/dto';
import { createExtendedMessages } from './createExtendedMessages';
import { AllMesagesAtom } from '../../../recoil/Chats/AllMessages';
import { OpponentInfoAtom } from '../../../recoil/util/OpponentInfo';
import { useSocket } from '../../../context/SocketProvider';
import { ApiDto } from './dto';
import request from '../../../apis/core';
import Back from '../../../assets/arrow/left.svg';
import KebabMenu from '../../../assets/default/more.svg';
import Exit from '../../../assets/default/leave.svg';
import Block from '../../../assets/default/block.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const ChatRoom: React.FC = () => {
	const [extendedMessages, setextendedMessages] = useState<ExtendedMessageDto[]>([]);
	const [allMessages, setAllMessages] = useRecoilState(AllMesagesAtom);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLeaveOpen, setIsLeaveOpen] = useState(false);
	const [isBlockOpen, setIsBlockOpen] = useState(false);
	const [isCannotBlockOpen, setIsCannotBlockOpen] = useState(false);
	const [isCannotCheckOpen, setIsCannotCheckOpen] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [isScroll, setIsScroll] = useState(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);
	const messageLengthRef = useRef(0);

	const storageValue = localStorage.getItem('id');
	const userId = storageValue ? Number(storageValue) : -1;
	const { roomId } = useParams();
	const opponentInfo = useRecoilValue(OpponentInfoAtom);
	const isOpponentValid = !!(opponentInfo && opponentInfo.id && opponentInfo.name);

	const nav = useNavigate();
	const socket = useSocket();

	useEffect(() => {
		// 채팅방 입장
		socket.emit('enterChatRoom', roomId);

		// 전체 메시지 조회
		socket.on('AllMessages', (messages) => {
			setAllMessages(messages.reverse());
			if (messages.length > messageLengthRef.current) {
				setIsScroll((prev) => !prev);
			}
			setIsLoading(false);
		});

		// 최근 메시지 조회
		socket.on('latestMessage', (message) => {
			setAllMessages((prevMessages) => [...prevMessages, message]);
			setIsScroll((prev) => !prev);
		});

		// 컴포넌트 언마운트 시 실행
		return () => {
			if (socket.connected) {
				socket.removeListener('AllMessages');
				socket.removeListener('latestMessage');
			}
		};
	}, [socket, roomId]);

	// 메시지 렌더링에 필요한 정보 추가
	useEffect(() => {
		const temp = createExtendedMessages(allMessages, userId, opponentInfo);
		setextendedMessages(temp);
	}, [allMessages]);

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
			scrollToBottom(chatWindowRef);
			setIsScroll((prev) => !prev);
		}
	}, [isScroll]);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '채팅방 나가기',
				action: () => {
					setIsLeaveOpen(true);
					setIsMenuOpen(false);
				},
				icon: Exit,
			},
			{
				text: '차단하기',
				action: () => {
					if (isOpponentValid) {
						setIsBlockOpen(true);
						setIsMenuOpen(false);
					} else {
						setIsCannotBlockOpen(true);
						setIsMenuOpen(false);
					}
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
							nav('/chats', { replace: true });
						} else {
							console.error(response.message);
						}
					} catch (error) {
						console.error(error);
					}
				};
				leaveChatRoom();
				setIsLeaveOpen(false);
			},
		},
		onCloseModal: () => {
			setIsLeaveOpen(false);
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
							nav('/chats', { replace: true });
						} else {
							console.error(response.message);
						}
					} catch {}
				};
				blockUser();
				setIsBlockOpen(false);
			},
		},
		onCloseModal: () => {
			setIsBlockOpen(false);
		},
	};

	const cannotBlockModal: ModalProps = {
		content: '차단할 수 없는 사용자입니다',
		onClose: () => {
			setIsCannotBlockOpen(false);
		},
	};

	const cannotCheckModal: ModalProps = {
		content: '사용자 정보가 없습니다',
		onClose: () => {
			setIsCannotCheckOpen(false);
		},
	};

	const kebabMenuBottomSheet: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isMenuOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsMenuOpen(false);
		},
	};

	// 프로필 사진 클릭 시 프로필 페이지로 이동
	const onClickProfile = useCallback(() => {
		const opponentId = opponentInfo?.id ? opponentInfo.id : -1;
		if (opponentId === -1) {
			setIsCannotCheckOpen(true);
		} else {
			nav(`/users/${opponentId}`);
		}
	}, [opponentInfo, nav]);

	return (
		<OODDFrame>
			{isLoading && <Loading />}
			{isLeaveOpen && <ConfirmationModal {...leaveModal} />}
			{isBlockOpen && <ConfirmationModal {...blockModal} />}
			{isCannotBlockOpen && <Modal {...cannotBlockModal} />}
			{isCannotCheckOpen && <Modal {...cannotCheckModal} />}
			<BottomSheet {...kebabMenuBottomSheet} />
			<TopBar
				text={opponentInfo?.nickname || opponentInfo?.name || '알수없음'}
				LeftButtonSrc={Back}
				RightButtonSrc={KebabMenu}
				onLeftClick={() => {
					nav(-1);
				}}
				onRightClick={() => {
					setIsMenuOpen(true);
				}}
				$withBorder={true}
			/>
			<MessagesContainer $isLoading={isLoading}>
				{extendedMessages.map((message: ExtendedMessageDto) => {
					return (
						<div key={message.id}>
							{message.isNewDate && (
								<DateBar formattedDate={dayjs(message.createdAt).locale('ko').format('YYYY년 MM월 DD일 dddd')} />
							)}
							{message.sentMessage ? (
								<SentMessage {...message.sentMessage} />
							) : message.rcvdMessage ? (
								<RcvdMessage {...message.rcvdMessage} onClickProfile={onClickProfile} />
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
