import { StyledText } from '../../components/Text/StyledText';
import { OODDFrame } from '../../components/Frame/Frame';
import { Header } from './styles';
import theme from '../../styles/theme';
import NavBar from '../../components/NavBar';
import TabBar from './TabBar';

const Chats: React.FC = () => {
	return (
		<OODDFrame>
			<Header>
				<StyledText
					style={{ padding: '0.375rem 0' }}
					$textTheme={{ style: 'heading1-medium', lineHeight: 2 }}
					color={theme.colors.black}
				>
					Chats
				</StyledText>
			</Header>
			<TabBar></TabBar>
			<NavBar />
		</OODDFrame>
	);
};

export default Chats;
