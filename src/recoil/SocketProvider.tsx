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

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
	const context = useContext(SocketContext);
	if (context === null) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};
