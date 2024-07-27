import { atom } from 'recoil';

interface Messages {
	id: number;
	text: string;
	sender: string;
	receiver: string;
	timestamp: Date;
	isFirst?: boolean;
	isNewDate?: boolean;
	printTime?: boolean;
	formattedTime?: string;
}

export const MockMessagesAtom = atom<Messages[]>({
	key: 'MockMessagesAtom',
	default: [
		{
			id: 0,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user1',
			receiver: 'user2',
			timestamp: new Date('2024-07-21T23:15:30'),
		},
		{
			id: 1,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user1',
			receiver: 'user2',
			timestamp: new Date('2024-07-21T23:15:35'),
		},
		{
			id: 2,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user1',
			receiver: 'user2',
			timestamp: new Date('2024-07-21T23:16:17'),
		},
		{
			id: 3,
			text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'user1',
			timestamp: new Date('2024-07-21T23:16:30'),
		},
		{
			id: 4,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'user1',
			timestamp: new Date('2024-07-21T23:16:50'),
		},
		{
			id: 5,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'user1',
			timestamp: new Date('2024-07-21T23:20:51'),
		},
		{
			id: 6,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user1',
			receiver: 'user2',
			timestamp: new Date('2024-07-22T01:57:50'),
		},
		{
			id: 7,
			text: 'ㅋㅋㅋㅋㅋㅋ',
			sender: 'user2',
			receiver: 'user1',
			timestamp: new Date('2024-07-23T20:16:59'),
		},
	],
});
