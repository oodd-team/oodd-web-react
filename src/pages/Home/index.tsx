import { OODDFrame } from '@components/Frame/Frame';
import NavBar from '@components/NavBar';
import HomeTopBar from './HomeTopBar/index';
import OOTD from './OOTD/index';
import { HomeContainer } from './styles';

// Home 페이지입니다.
const Home: React.FC = () => {
	return (
		<OODDFrame>
			<HomeContainer>
				<HomeTopBar />
				<OOTD />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
