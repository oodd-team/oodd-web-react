import Card from '../../Home/Matching/Card';
import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { ReqeustInfo } from './styles';

const Request: React.FC = () => {
	return (
		<>
			<ReqeustInfo>
				<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
					Message 3
				</StyledText>
			</ReqeustInfo>
			<Card></Card>
		</>
	);
};

export default Request;
