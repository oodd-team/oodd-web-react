import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import {
	Btn,
	Comment,
	CommentBtn,
	FeedImgBox,
	FeedProfileImgWrapper,
	FeedText,
	FeedTop,
	FeedWrapper,
	Info,
	Reaction,
	ReactionWrapper,
} from './styles';
import { FeedProps } from '../dto';
import more from '../../../../assets/Home/grommet-icons_more.svg';
import xBtn from '../../../../assets/Home/button_reject.svg';
import heartBtn from '../../../../assets/Home/button_heart.svg';
import starBtn from '../../../../assets/Home/button_star.svg';
import commentBtn from '../../../../assets/Home/comment.svg';
import { useNavigate } from 'react-router-dom';

interface Props {
	feed: FeedProps;
	onRemove: () => void; // Feed를 제거하는 함수를 부모 컴포넌트에서 받아옴
}

const Feed: React.FC<Props> = ({ feed, onRemove }) => {
	const nav = useNavigate();

	return (
		<FeedWrapper>
			<FeedTop>
				<Info onClick={() => nav('/users/:userId')}>
					<FeedProfileImgWrapper>
						<img src={feed.profileUrl} alt="tag" />
					</FeedProfileImgWrapper>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.black}>
						{feed.userName}
					</StyledText>
				</Info>
				<img src={more} style={{ cursor: 'pointer' }} />
			</FeedTop>
			<FeedText onClick={() => nav('/post')}>
				<StyledText
					$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
					color={theme.colors.black}
					style={{ opacity: '50%' }}
				>
					{feed.text}
				</StyledText>
			</FeedText>
			<FeedImgBox>
				<Swiper
					slidesPerView={1}
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="ootdSwiper"
				>
					{feed.feedImgUrls.map((url, index) => (
						<SwiperSlide key={index}>
							<img src={url} alt={`feed ${index + 1}`} className="ootd-image-small" />
						</SwiperSlide>
					))}
				</Swiper>
				<ReactionWrapper>
					<Reaction>
						<Btn onClick={onRemove}>
							<img src={xBtn} style={{ width: '1.5rem', height: '1.5rem' }} />
						</Btn>
						<Btn>
							<img src={heartBtn} />
						</Btn>
						<Btn>
							<img src={starBtn} />
						</Btn>
					</Reaction>
					<Comment>
						<CommentBtn>
							<img src={commentBtn} />
							<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
								코멘트 남기기
							</StyledText>
						</CommentBtn>
					</Comment>
				</ReactionWrapper>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
