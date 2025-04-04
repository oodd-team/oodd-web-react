import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';

import 'dayjs/locale/ko';
import { postUserBlockApi } from '@apis/user-block';
import { handleError } from '@apis/util/handleError';
import { useSocket } from '@context/SocketProvider';
import { AllMesagesAtom } from '@recoil/Chats/AllMessages';
import { OtherUserAtom } from '@recoil/util/OtherUser';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import Back from '@assets/arrow/left.svg';
import Block from '@assets/default/block.svg';
import Exit from '@assets/default/leave.svg';
import KebabMenu from '@assets/default/more.svg';

import BottomSheet from '@components/BottomSheet';
import BottomSheetMenu from '@components/BottomSheet/BottomSheetMenu';
import { OODDFrame } from '@components/Frame/Frame';
import Loading from '@components/Loading';
import Modal from '@components/Modal';
import TopBar from '@components/TopBar';

import type { ChatRoomMessagesData } from '@apis/chatting/dto';
import type { PostUserBlockRequest } from '@apis/user-block/dto';
import type { BottomSheetMenuProps } from '@components/BottomSheet/BottomSheetMenu/dto';
import type { BottomSheetProps } from '@components/BottomSheet/dto';
import type { ModalProps } from '@components/Modal/dto';

import type { ExtendedMessageDto } from './dto';

import ChatBox from '../ChatBox/index';
import DateBar from '../DateBar/index';
import RcvdMessage from '../RcvdMessage/index';
import SentMessage from '../SentMessage/index';

import { createExtendedMessages } from './createExtendedMessages';
import { MessagesContainer } from './styles';

const ChatRoom: React.FC = () => {
	const [extendedMessages, setExtendedMessages] = useState<ExtendedMessageDto[]>([]);
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

	const nav = useNavigate();
	const socket = useSocket();

	const { chatRoomId } = useParams();
	const currentUserId = getCurrentUserId();
	const otherUser = useRecoilValue(OtherUserAtom);

	// 메시지 수신 시 아래로 스크롤 (스크롤 아래 고정)
	const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) ref.current.scrollIntoView();
	};

	// 프로필 사진 클릭 시 프로필 페이지로 이동
	const handleUserClick = useCallback(() => {
		const otherUserId = otherUser?.id ? otherUser.id : -1;
		if (otherUserId === -1) {
			setModalContent('유저 정보를 찾을 수 없습니다.');
			setIsStatusModalOpen(true);
		} else {
			nav(`/profile/${otherUserId}`);
		}
	}, [otherUser, nav]);

	// 유저 차단 api
	const postUserBlock = async () => {
		try {
			const data: PostUserBlockRequest = {
				requesterId: currentUserId,
				targetId: otherUser?.id || -1,
				action: 'block',
			};
			const response = await postUserBlockApi(data);

			if (response.isSuccess) {
				setModalContent('정상적으로 처리되었습니다.');
				nav('/chats');
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
				userId: currentUserId,
			};
			socket.emit('leaveChatRoom', data);
			nav('/chats', { replace: true });
		}
	};

	// 전체 메시지 조회 socket api
	const getChatRoomMessages = (data: ChatRoomMessagesData[]) => {
		setAllMessages(data);
		if (data.length > messageLengthRef.current) {
			setIsScroll((prev) => !prev);
		}
		setIsLoading(false);
	};

	// 새 메시지 수신 socket api
	const getNewMessage = (data: ChatRoomMessagesData) => {
		setAllMessages((prevMessages) => [...prevMessages, data]);
		setIsScroll((prev) => !prev);
	};

	// 채팅방 입장 시 스크롤 아래로 이동
	useEffect(() => {
		const messagesContainer = chatWindowRef.current?.parentElement;

		if (messagesContainer) {
			messagesContainer.style.scrollBehavior = 'auto';
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}, []);

	// 메시지 수신 시
	useEffect(() => {
		// 렌더링에 필요한 정보 추가
		const temp = createExtendedMessages(allMessages, currentUserId, otherUser);
		setExtendedMessages(temp);

		// 스크롤 아래로 이동
		if (isScroll) {
			scrollToBottom(chatWindowRef);
			setIsScroll((prev) => !prev);
		}
	}, [allMessages]);

	useEffect(() => {
		if (socket) {
			// 채팅방 입장
			socket.emit('joinChatRoom', { chatRoomId: Number(chatRoomId) });

			// 전체 메시지 조회
			socket.emit('getChatRoomMessages', { chatRoomId: Number(chatRoomId) });
			socket.on('chatRoomMessages', getChatRoomMessages);

			// 최근 메시지 조회
			socket.on('newMessage', getNewMessage);
		}

		// 컴포넌트 언마운트 시 실행
		return () => {
			if (socket) {
				socket.off('chatRoomMessages');
				socket.off('newMessage');
			}
		};
	}, [chatRoomId, socket]);

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

	const kebabMenuBottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
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
			<TopBar
				text={otherUser?.nickname || '알수없음'}
				LeftButtonSrc={Back}
				RightButtonSrc={KebabMenu}
				onClickLeftButton={() => {
					nav(-1);
				}}
				onClickRightButton={() => {
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
			<ChatBox />
			{isLoading && <Loading />}
			{isLeaveModalOpen && <Modal {...leaveModalProps} />}
			{isBlockModalOpen && <Modal {...blockModalProps} />}
			{isStatusModalOpen && <Modal {...statusModalProps} />}
			<BottomSheet {...kebabMenuBottomSheetProps} />
		</OODDFrame>
	);
};

export default ChatRoom;
