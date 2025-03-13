import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import theme from '@styles/theme';

import { RequesterDto } from '@apis/matching/dto';
import { useSocket } from '@context/SocketProvider';
import { OtherUserAtom } from '@recoil/util/OtherUser';

import { StyledText } from '@components/Text/StyledText';

import { ResponseButton, ResponseContainer } from './styles';

export interface ResponseMessageProps {
	matchingId: number;
	chatRoomId: number;
	requester: Omit<RequesterDto, 'RepresentativePostDto'>;
	requestStatus: 'accepted' | 'rejected' | 'pending';
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ matchingId, chatRoomId, requester, requestStatus }) => {
	const socket = useSocket('matching');
	const isPending = requestStatus === 'pending';
	const nav = useNavigate();
	const [, setOtherUser] = useRecoilState(OtherUserAtom);

	const handlebuttonClick = (status: 'accept' | 'reject') => {
		if (requestStatus !== 'pending') return;
		if (socket) {
			socket.emit('patchMatching', { id: matchingId, requestStatus: status });
			if (status === 'accept') {
				setOtherUser(requester);
				nav(`/chats/${chatRoomId}`);
			}
		}
	};

	return (
		<ResponseContainer>
			{(requestStatus === 'pending' || requestStatus === 'rejected') && (
				<ResponseButton $isPending={isPending} onClick={() => handlebuttonClick('reject')}>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
						거절
					</StyledText>
				</ResponseButton>
			)}
			{(requestStatus === 'pending' || requestStatus === 'accepted') && (
				<ResponseButton $isPending={isPending} onClick={() => handlebuttonClick('accept')}>
					<StyledText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
						수락
					</StyledText>
				</ResponseButton>
			)}
		</ResponseContainer>
	);
};

export default ResponseMessage;
