import { atom } from 'recoil';

import type { chatRoomMessagesData } from '@apis/chatting/dto';

export const AllMesagesAtom = atom<chatRoomMessagesData[] | []>({
	key: 'allMessagesAtom',
	default: [],
});
