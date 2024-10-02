import { atom } from 'recoil';
import { MessageDto } from '../../pages/Chats/dto';

export const AllMesagesAtom = atom<MessageDto[] | []>({
	key: 'AllMessagesAtom',
	default: [],
});
