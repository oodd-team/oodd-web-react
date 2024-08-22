// import Card from '../../../components/Cards/Card';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { ReqeustInfo } from './styles';

const Request: React.FC<{ matchingRequests: number }> = ({ matchingRequests }) => {
	return (
		<>
			<ReqeustInfo>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Message {matchingRequests}
				</StyledText>
			</ReqeustInfo>
			{/* <Card></Card> */}
		</>
	);
};

export default Request;
