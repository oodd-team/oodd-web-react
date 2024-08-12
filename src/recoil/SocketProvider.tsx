import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { SocketStateAtom } from './SocketState';
import io from 'socket.io-client';

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [socket, setSocket] = useRecoilState(SocketStateAtom);

	useEffect(() => {
		const newSocket = io('http://52.78.141.5:8080');
		setSocket(newSocket);

		// 컴포넌트 언마운트 시 소켓 연결 종료
		return () => {
			newSocket.disconnect();
		};
	}, [setSocket]);

	return <>{children}</>;
};

export default SocketProvider;
