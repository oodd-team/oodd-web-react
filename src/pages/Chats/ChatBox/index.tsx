import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { useSocket } from '@context/SocketProvider';
import { OtherUserAtom } from '@recoil/util/OtherUser';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import SendIcon from '@assets/default/send-message.svg';

import { ChatBoxContainer, Textarea, SendButton } from './styles';

const ChatBox: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
	const [newMessage, setNewMessage] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const socket = useSocket();

	const { chatRoomId } = useParams();
	const currentUserId = getCurrentUserId();
	const otherUser = useRecoilValue(OtherUserAtom);
	const isOtherUserValid = !!(otherUser && otherUser.id);

	useEffect(() => {
		if (textareaRef.current && (!isOtherUserValid || disabled)) {
			textareaRef.current.disabled = true;
			textareaRef.current.placeholder = '메시지를 보낼 수 없는 채팅방입니다.';
		}
	}, []);

	// textarea 내용에 따라 높이 조정
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [newMessage]);

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNewMessage(e.target.value);
	};

	const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleNewMessageSubmit();
		}
	};

	const handleNewMessageSubmit = () => {
		if (newMessage === '') {
			return;
		}

		// 메시지 전송 api
		if (socket) {
			const sendMessageRequest = {
				chatRoomId: Number(chatRoomId),
				toUserId: otherUser?.id,
				content: newMessage,
				fromUserId: currentUserId,
				createdAt: new Date().toISOString(),
			};
			socket.emit('sendMessage', sendMessageRequest);
			setNewMessage('');
		}
	};

	return (
		<ChatBoxContainer>
			<Textarea
				$isOtherUserValid={isOtherUserValid}
				placeholder="메시지 보내기"
				ref={textareaRef}
				value={newMessage}
				onChange={handleMessageChange}
				onKeyDown={handleEnterKeyDown}
				onSubmit={handleNewMessageSubmit}
			/>
			<SendButton $isOtherUserValid={isOtherUserValid} onClick={handleNewMessageSubmit}>
				<img src={SendIcon} alt="" />
			</SendButton>
		</ChatBoxContainer>
	);
};

export default ChatBox;
