import { atom } from 'recoil';

import type { ChatRoomMessagesData } from '@apis/chatting/dto';

export const AllMesagesAtom = atom<ChatRoomMessagesData[] | []>({
	key: 'allMessagesAtom',
	default: [],
});
