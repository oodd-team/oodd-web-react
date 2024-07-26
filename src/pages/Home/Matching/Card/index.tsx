import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { CardLayout, OOTDImgBox, ProfileBox, ProfileImgBox, ProfileInfo, SeeMore } from './styles';
import { CardLayoutProps } from './dto';

const cardItem: CardLayoutProps = {
	profileImgUrl: './../../../../assets/Home/profileImg.svg',
	ootdImgUrl: './../../../../assets/Home/OOTDImg.svg',
};

// OODD 카드 컴포넌트입니다. 매칭 탭에 있습니다.
const Card: React.FC = () => {
	return (
		<CardLayout>
			<ProfileBox>
				<ProfileImgBox>
					<img src={cardItem.profileImgUrl} />
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
				<img src={cardItem.ootdImgUrl} />
			</OOTDImgBox>
		</CardLayout>
	);
};

export default Card;
