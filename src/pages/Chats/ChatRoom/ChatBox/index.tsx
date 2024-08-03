import { ChatBoxContainer, Textarea, SendIcon } from './styles';
import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { MockMessagesAtom } from '../../../../recoil/MockMessages';
import Send from '../../../../assets/Chats/Send.svg';
import dayjs from 'dayjs';

const ChatBox: React.FC = () => {
	const idRef = useRef(9);
	const [newMessage, setNewMessage] = useState<string>('');
	const [mockMessages, setMockMessages] = useRecoilState(MockMessagesAtom);

	const onChangeMessage = (e: any): void => {
		setNewMessage(e.target.value);
	};
	const sendNewMessage = (): void => {
		if (newMessage === '') {
			return;
		}
		setMockMessages([
			...mockMessages,
			{
				id: idRef.current++,
				sender: 'me',
				receiver: 'user2',
				text: newMessage,
				timestamp: dayjs(),
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
