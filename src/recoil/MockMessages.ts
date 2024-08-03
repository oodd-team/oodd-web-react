import { atom } from 'recoil';
import { MessageDto } from '../pages/Chats/dto';

export const MockMessagesAtom = atom<MessageDto[]>({
	key: 'MockMessagesAtom',
	default: [
		{
			id: 0,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'me',
			receiver: 'user2',
			timestamp: new Date('2024-07-21T23:15:30'),
		},
		{
			id: 1,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'me',
			receiver: 'user2',
			timestamp: new Date('2024-07-21T23:15:35'),
		},
		{
			id: 2,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'me',
			receiver: 'user2',
			timestamp: new Date('2024-07-21T23:16:17'),
		},
		{
			id: 3,
			text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'me',
			timestamp: new Date('2024-07-21T23:16:30'),
		},
		{
			id: 4,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'me',
			timestamp: new Date('2024-07-21T23:16:50'),
		},
		{
			id: 5,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'me',
			timestamp: new Date('2024-07-21T23:20:51'),
		},
		{
			id: 6,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'me',
			receiver: 'user2',
			timestamp: new Date('2024-07-22T01:57:50'),
		},
		{
			id: 7,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'me',
			receiver: 'user2',
			timestamp: new Date('2024-08-02T00:16:59'),
		},
		{
			id: 7,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'me',
			receiver: 'user2',
			timestamp: new Date('2024-08-03T00:16:59'),
		},
	],
});
