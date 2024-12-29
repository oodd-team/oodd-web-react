import logo from '@assets/default/oodd.svg';

import Alarm from '@components/Icons/Alarm';

import { Button, ButtonContainer, HomeLogo, HomeTopBarContainer } from './styles';

// Home 페이지의 상단 바입니다. 로고와 알림이 있습니다.
// TODO: 버튼 클릭 이벤트 처리 필요
const HomeTopBar: React.FC = () => {
	return (
		<HomeTopBarContainer>
			<HomeLogo src={logo} alt="oodd" />
			<ButtonContainer>
				<Button>
					<Alarm />
				</Button>
			</ButtonContainer>
		</HomeTopBarContainer>
	);
};

export default HomeTopBar;
