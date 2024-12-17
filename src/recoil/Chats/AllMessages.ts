import { atom } from 'recoil';
import { chatRoomMessagesData } from '../../apis/chatting/dto';

export const AllMesagesAtom = atom<chatRoomMessagesData[] | []>({
	key: 'allMessagesAtom',
	default: [],
});
