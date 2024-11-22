import { useRef } from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import NavBar from '../../components/NavBar';
import HomeTopBar from './HomeTopBar';
import OOTD from './OOTD/index.tsx';
import { HomeContainer } from './styles';

// Home 페이지입니다.
const Home: React.FC = () => {
	const ootdTooltipRef = useRef<HTMLDivElement[]>([]);

	return (
		<OODDFrame>
			<HomeContainer>
				<HomeTopBar />
				<OOTD tooltipRef={ootdTooltipRef} />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
