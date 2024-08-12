import { ChatBoxContainer, Textarea, SendIcon } from './styles';
import { useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Send from '../../../../assets/Chats/Send.svg';
import { AllMesagesAtom } from '../../../../recoil/AllMessages';
import { MockUserIdAtom } from '../../../../recoil/MockUserId';
import { useParams } from 'react-router-dom';
import { SocketStateAtom } from '../../../../recoil/SocketState';

const ChatBox: React.FC = () => {
	const messageId = useRef(0);
	const { roomId, opponentId } = useParams<{ roomId: string; opponentId: string }>();
	const roomIdNumber = Number(roomId);
	const opponentIdNumber = Number(opponentId);
	const userId = useRecoilValue(MockUserIdAtom);
	const [newMessage, setNewMessage] = useState<string>('');
	const [allMessages, setAllMessages] = useRecoilState(AllMesagesAtom);
	const socket = useRecoilValue(SocketStateAtom);

	const onChangeMessage = (e: any): void => {
		setNewMessage(e.target.value);
	};
	const sendNewMessage = (): void => {
		if (newMessage === '') {
			return;
		}

		// 메시지 전송
		if (socket) {
			socket.emit('message', roomIdNumber, userId, opponentIdNumber, newMessage);
		}

		setAllMessages([
			...allMessages,
			{
				chatRoomId: roomIdNumber,
				id: messageId.current++,
				toUserId: userId,
				fromUserId: opponentIdNumber,
				text: newMessage,
				datetime: new Date(),
			},
		]);
		setNewMessage('');
	};

	const onKeyDown = (e: any): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendNewMessage();
		}
	};

	return (
		<ChatBoxContainer>
			<Textarea value={newMessage} onKeyDown={onKeyDown} onChange={onChangeMessage} onSubmit={sendNewMessage} />
			<SendIcon src={Send} alt="send" onClick={sendNewMessage} />
		</ChatBoxContainer>
	);
};

export default ChatBox;
