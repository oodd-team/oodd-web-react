// atoms/socketAtom.js
import { atom } from 'recoil';
import { Socket } from 'socket.io-client';

export const SocketStateAtom = atom<Socket | null>({
	key: 'SocketStateAtom',
	default: null,
});
