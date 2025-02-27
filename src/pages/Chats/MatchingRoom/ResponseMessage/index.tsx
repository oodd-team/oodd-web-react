import { useSocket } from '@context/SocketProvider';

import { ResponseButton, ResponseContainer } from './styles';

export interface ResponseMessageProps {
	matchingId: number;
	requestStatus: 'accepted' | 'rejected' | 'pending';
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ matchingId, requestStatus }) => {
	const socket = useSocket('matching');
	const isPending = requestStatus === 'pending';

	const handlebuttonClick = (status: 'accept' | 'reject') => {
		if (socket) {
			socket.emit('patchMatching', { id: matchingId, requestStatus: status });
		}
	};

	return (
		<ResponseContainer>
			{(requestStatus === 'pending' || requestStatus === 'rejected') && (
				<ResponseButton $isPending={isPending} onClick={() => handlebuttonClick('reject')}>
					거절
				</ResponseButton>
			)}
			{(requestStatus === 'pending' || requestStatus === 'accepted') && (
				<ResponseButton $isPending={isPending} onClick={() => handlebuttonClick('accept')}>
					수락
				</ResponseButton>
			)}
		</ResponseContainer>
	);
};

export default ResponseMessage;
