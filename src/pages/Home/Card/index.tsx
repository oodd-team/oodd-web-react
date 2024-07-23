import { StyledText } from '../../../components/Text/StyledText';
import theme from '../../../styles/theme';
import { CardLayout, OOTDImgBox, ProfileBox, ProfileImgBox, ProfileInfo, SeeMore } from './styles';
import profileImg from '../../../assets/Home/profileImg.svg';
import OOTDImg from '../../../assets/Home/OOTDImg.svg';

const Card: React.FC = () => {
	return (
		<CardLayout>
			<ProfileBox>
				<ProfileImgBox>
					<img src={profileImg} />
				</ProfileImgBox>
				<ProfileInfo>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.white}>
						IDID
					</StyledText>
					<StyledText $textTheme={{ style: 'body5-medium', lineHeight: 1.2 }} color={theme.colors.gray1}>
						#classic
					</StyledText>
				</ProfileInfo>
				<SeeMore>
					<StyledText $textTheme={{ style: 'button2-medium', lineHeight: 1.2 }} color={theme.colors.white}>
						OOTD 더 보기 &gt;
					</StyledText>
				</SeeMore>
			</ProfileBox>

			<OOTDImgBox>
				<img src={OOTDImg} />
			</OOTDImgBox>
		</CardLayout>
	);
};

export default Card;
