import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MatchingData } from '@apis/matching/dto';
import { useSocket } from '@context/SocketProvider';

import Back from '@assets/arrow/left.svg';

import { OODDFrame } from '@components/Frame/Frame';
import TopBar from '@components/TopBar';

import MatchingMessage from './MatchingMessage';
import NoMatchingMessage from './NoMatchingMessage';
import { MessagesContainer } from './styles';

const MatchingRoom: React.FC = () => {
	const [allMatchings, setAllMatchings] = useState<MatchingData[]>([]);

	const [isLoading, setIsLoading] = useState(true);
	const [isScroll, setIsScroll] = useState(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);

	const nav = useNavigate();
	const socket = useSocket();

	// 메시지 수신 시 아래로 스크롤 (스크롤 아래 고정)
	const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) ref.current.scrollIntoView();
	};

	// 전체 매칭 불러오기 socket api
	const getAllMatchings = (data: MatchingData[]) => {
		setAllMatchings(data);
		setIsScroll(true);
		setIsLoading(false);
	};

	// 채팅방 입장 시 스크롤 아래로 이동
	useEffect(() => {
		const messagesContainer = chatWindowRef.current?.parentElement;

		if (messagesContainer) {
			messagesContainer.style.scrollBehavior = 'auto';
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}, []);

	// 메시지 수신 시
	useEffect(() => {
		// 스크롤 아래로 이동
		if (isScroll) {
			scrollToBottom(chatWindowRef);
			setIsScroll(false);
		}
	}, [allMatchings]);

	useEffect(() => {
		if (socket) {
			socket.emit('getAllMatchings', getAllMatchings);
		}

		return () => {
			if (socket) {
				socket.off();
			}
		};
	}, [socket]);

	return (
		<OODDFrame>
			<TopBar
				text="오딩이"
				LeftButtonSrc={Back}
				onClickLeftButton={() => {
					nav(-1);
				}}
				$withBorder={true}
			/>
			<MessagesContainer $isLoading={isLoading}>
				{allMatchings.length === 0 ? (
					<NoMatchingMessage />
				) : (
					allMatchings.map((matching: MatchingData) => {
						// TODO: 매칭 상태에 따라 응답 버튼 렌더링
						return <MatchingMessage {...matching} />;
					})
				)}
				<div ref={chatWindowRef} />
			</MessagesContainer>
		</OODDFrame>
	);
};

export default memo(MatchingRoom);
