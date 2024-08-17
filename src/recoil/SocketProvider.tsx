import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const newSocket = io(import.meta.env.VITE_API_URL);
		setSocket(newSocket);

		newSocket.on('connect', () => {
			console.log(newSocket);
		});

		newSocket.on('disconnect', (reason) => {
			console.log('Disconnected from server:', reason);
		});

		newSocket.on('connect_error', (err) => {
			console.log(err.message);
		});

		return () => {
			newSocket.disconnect();
		};
	}, []);

	// 소켓 설정이 완료되지 않은 경우 렌더링 방지
	// 채팅방에서 새로고침했을 때 오류 방지
	if (!socket) {
		return null;
	}

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (context === null) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};
