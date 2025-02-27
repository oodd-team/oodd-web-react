import { ResponseButton, ResponseContainer } from './styles';

export interface ResponseMessageProps {
	requestStatus: 'accepted' | 'rejected' | 'pending';
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ requestStatus }) => {
	return (
		<ResponseContainer>
			{(requestStatus === 'pending' || 'accepted') && <ResponseButton>거절</ResponseButton>}
			{(requestStatus === 'pending' || 'rejected') && <ResponseButton>수락</ResponseButton>}
		</ResponseContainer>
	);
};

export default ResponseMessage;
