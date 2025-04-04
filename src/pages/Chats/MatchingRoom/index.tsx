import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MatchingData } from '@apis/matching/dto';
import { useSocket } from '@context/SocketProvider';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import Back from '@assets/arrow/left.svg';

import { OODDFrame } from '@components/Frame/Frame';
import TopBar from '@components/TopBar';

import ChatBox from '../ChatBox';

import MatchingMessage from './MatchingMessage';
import NoMatchingMessage from './NoMatchingMessage';
import ResponseMessage from './ResponseMessage';
import { MessagesContainer } from './styles';

const MatchingRoom: React.FC = () => {
	const [allMatchings, setAllMatchings] = useState<MatchingData[]>([]);
	const [hasNewMatching, setHasNewMatching] = useState(true);

	const [isLoading, setIsLoading] = useState(true);
	const [isScroll, setIsScroll] = useState(false);
	const chatWindowRef = useRef<HTMLDivElement>(null);

	const currentUserId = getCurrentUserId();
	const nav = useNavigate();
	const socket = useSocket('matching');

	// 메시지 수신 시 아래로 스크롤 (스크롤 아래 고정)
	const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
		if (ref.current) ref.current.scrollIntoView();
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
		// 전체 매칭 불러오기 socket api
		const getAllMatchings = ({ matching }: { matching: MatchingData[] }) => {
			console.log(matching);
			setAllMatchings(matching);
			setIsScroll(true);
			setIsLoading(false);
		};

		const getNewMatching = (data: MatchingData) => {
			if (JSON.stringify(data) === '{}') {
				setHasNewMatching(false);
			} else {
				setHasNewMatching(true);
				setAllMatchings([...allMatchings, data]);
			}
		};

		const handleError = (data: string) => {
			alert(data);
		};

		if (socket) {
			socket.emit('getAllMatchings', { userId: currentUserId });
			socket.emit('getMatching', { userId: currentUserId });
			socket.on('matchings', getAllMatchings);
			socket.on('nextMatching', getNewMatching);
			socket.on('error', handleError);
		}

		return () => {
			if (socket) {
				socket.off('matchings');
				socket.off('nextMatching');
				socket.off('error');
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
				{allMatchings.map((matching: MatchingData) => {
					console.log(matching);
					return (
						<div key={matching.id}>
							<MatchingMessage {...matching} />
							<ResponseMessage
								matchingId={matching.id}
								chatRoomId={matching.chatRoomId}
								requester={matching.requester}
								requestStatus={matching.requestStatus}
							/>
						</div>
					);
				})}
				{!hasNewMatching && <NoMatchingMessage />}
				<div ref={chatWindowRef} />
			</MessagesContainer>
			<ChatBox disabled={true} />
		</OODDFrame>
	);
};

export default memo(MatchingRoom);
