import { createContext, useContext, useEffect, useState } from 'react';

import { io, Socket } from 'socket.io-client';

type SocketMap = { [endpoint: string]: Socket };

const SocketContext = createContext<SocketMap | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socketMap, setSocketMap] = useState<SocketMap>({});

	useEffect(() => {
		const endpoints = ['chatting', 'matching']; // 필요한 엔드포인트 추가
		const newSockets: SocketMap = {};

		endpoints.forEach((endpoint) => {
			const socket = io(`${import.meta.env.VITE_NEW_API_URL}/socket/${endpoint}`, {
				transports: ['websocket'],
			});
			newSockets[endpoint] = socket;

			socket.on('connect', () => {
				console.log(`${endpoint} connection is open`);
			});

			socket.on('disconnect', (reason) => {
				console.log(`${endpoint} Disconnected from server:`, reason);
			});

			socket.on('connect_error', (err) => {
				console.log(`${endpoint} connect error:`, err.message);
			});
		});

		setSocketMap(newSockets);

		return () => {
			Object.values(newSockets).forEach((socket) => socket.disconnect());
		};
	}, []);

	if (!Object.keys(socketMap).length) {
		return null;
	}

	return <SocketContext.Provider value={socketMap}>{children}</SocketContext.Provider>;
};

// 엔드포인트를 인자로 받아 해당 소켓을 반환하는 훅
export const useSocket = (endpoint = 'chatting') => {
	const socketMap = useContext(SocketContext);
	if (!socketMap || !socketMap[endpoint]) {
		throw new Error(`useSocket must be used within a SocketProvider with a valid endpoint (${endpoint})`);
	}
	return socketMap[endpoint];
};
