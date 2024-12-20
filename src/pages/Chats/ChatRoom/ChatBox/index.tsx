import { ChatBoxContainer, Textarea, SendButton } from './styles';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { OpponentInfoAtom } from '../../../../recoil/util/OpponentInfo';
import { useSocket } from '../../../../context/SocketProvider';

const ChatBox: React.FC = () => {
	const opponentInfo = useRecoilValue(OpponentInfoAtom);
	const storageValue = localStorage.getItem('my_id');
	const userId = storageValue ? Number(storageValue) : -1;
	const { chatRoomId } = useParams();
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const [newMessage, setNewMessage] = useState('');

	const socket = useSocket();
	const isOpponentValid = !!(opponentInfo && opponentInfo.id);

	// textarea 내용에 따라 높이 조정
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [newMessage]);

	useEffect(() => {
		if (textareaRef.current && !isOpponentValid) {
			textareaRef.current.disabled = true;
			textareaRef.current.placeholder = '메시지를 보낼 수 없습니다.';
		}
	}, []);

	const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setNewMessage(e.target.value);
	};

	const sendNewMessage = (): void => {
		if (newMessage === '') {
			return;
		}

		// 메시지 전송
		if (socket) {
			const sendMessageRequest = {
				chatRoomId: Number(chatRoomId),
				toUserId: opponentInfo?.id,
				content: newMessage,
				fromUserId: userId,
				createdAt: new Date().toISOString(),
			};

			socket.emit('sendMessage', sendMessageRequest);
			setNewMessage('');
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendNewMessage();
		}
	};

	return (
		<ChatBoxContainer>
			<Textarea
				$isOpponentValid={isOpponentValid}
				placeholder="메시지 보내기"
				ref={textareaRef}
				value={newMessage}
				onKeyDown={onKeyDown}
				onChange={onChangeMessage}
				onSubmit={sendNewMessage}
			/>
			<SendButton $isOpponentValid={isOpponentValid} onClick={sendNewMessage} />
		</ChatBoxContainer>
	);
};

export default ChatBox;
