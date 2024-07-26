import { ChatBoxContainer, Textarea, SendIcon } from './styles';
import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { MockMessagesAtom } from '../../../recoil/MockMessages';

const ChatBox: React.FC = () => {
	const idRef = useRef(8);
	const [newMessage, setNewMessage] = useState<string>('');
	const [mockMessages, setMockMessages] = useRecoilState(MockMessagesAtom);

	const onChangeMessage = (e): void => {
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
				sender: 'user1',
				receiver: 'user2',
				text: newMessage,
				timestamp: new Date(),
			},
		]);
		setNewMessage('');
	};

	const onKeyDown = (e): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendNewMessage();
		}
	};

	return (
		<ChatBoxContainer>
			<Textarea value={newMessage} onKeyDown={onKeyDown} onChange={onChangeMessage} onSubmit={sendNewMessage} />
			<SendIcon onClick={sendNewMessage} />
		</ChatBoxContainer>
	);
};

export default ChatBox;
