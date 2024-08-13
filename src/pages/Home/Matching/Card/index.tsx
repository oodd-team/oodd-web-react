import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import { Btn, CardLayout, OOTDImgBox, ProfileBox, ProfileImgBox, ProfileInfo, Reaction, SeeMore } from './styles';
import { CardLayoutProps } from './dto';
import xBtn from '../../../../assets/Home/button_reject.svg';
import checkBtn from '../../../../assets/Home/button_check.svg';
import profileImg1 from '../../../../assets/Home/profileImg1.svg';
import ootdImg1 from '../../../../assets/Home/OOTDImg1.svg';
import ootdImg2 from '../../../../assets/Home/OOTDImg2.svg';
import ootdImg3 from '../../../../assets/Home/OOTDImg3.svg';
import ootdImg4 from '../../../../assets/Home/OOTDImg4.svg';

const cardItem: CardLayoutProps = {
	profileImgUrl: profileImg1,
	ootdImgUrls: [ootdImg1, ootdImg2, ootdImg3, ootdImg4],
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
				<Swiper
					direction="vertical"
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="childSwiper"
				>
					{cardItem.ootdImgUrls.map((url, index) => (
						<SwiperSlide key={index}>
							<img src={url} alt={`matching ${index + 1}`} className="slide-image-small" />
						</SwiperSlide>
					))}
				</Swiper>
				<Reaction>
					<Btn>
						<img src={xBtn} />
					</Btn>
					<Btn>
						<img src={checkBtn} />
					</Btn>
				</Reaction>
			</OOTDImgBox>
		</CardLayout>
	);
};

export default Card;
