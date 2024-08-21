import { ChatBoxContainer, Textarea, SendIcon } from './styles';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Send from '../../../../assets/Chats/Send.svg';
import { useParams } from 'react-router-dom';
import { OpponentInfoAtom } from '../../../../recoil/OpponentInfo';
import { useSocket } from '../../../../context/SocketProvider';

const ChatBox: React.FC = () => {
	const opponentInfo = useRecoilValue(OpponentInfoAtom);
	const storageValue = localStorage.getItem('id');
	const userId = storageValue ? Number(storageValue) : -1;
	const { roomId } = useParams();
	const roomIdNumber = Number(roomId);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const [newMessage, setNewMessage] = useState('');

	const socket = useSocket();
	const isOpponentValid = !!(opponentInfo && opponentInfo.id && opponentInfo.name);

	useEffect(() => {
		if (textareaRef.current && !isOpponentValid) {
			textareaRef.current.disabled = true;
			textareaRef.current.placeholder = '메시지를 보낼 수 없습니다.';
		}
	}, []);

	const onChangeMessage = (e: any): void => {
		setNewMessage(e.target.value);
	};
	const sendNewMessage = (): void => {
		if (newMessage === '') {
			return;
		}

		// 메시지 전송
		if (socket) {
			socket.emit('message', roomIdNumber, userId, opponentInfo?.id, newMessage);
			setNewMessage('');
		}
	};

	const onKeyDown = (e: any): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendNewMessage();
		}
	};

	return (
		<ChatBoxContainer>
			<Textarea
				$isOpponentValid={isOpponentValid}
				ref={textareaRef}
				value={newMessage}
				onKeyDown={onKeyDown}
				onChange={onChangeMessage}
				onSubmit={sendNewMessage}
			/>
			<SendIcon $isOpponentValid={isOpponentValid} src={Send} alt="send" onClick={sendNewMessage} />
		</ChatBoxContainer>
	);
};

export default ChatBox;
