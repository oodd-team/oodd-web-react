import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { StyledText } from '../../../../components/Text/StyledText';
import theme from '../../../../styles/theme';
import {
	Btn,
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
import clickedHeart from '../../../../assets/Home/clicked_bigheart.svg';
import starBtn from '../../../../assets/Home/button_star.svg';
import clickedStar from '../../../../assets/Home/clicked_bigstar.svg';
import commentBtn from '../../../../assets/Home/comment.svg';
import { useNavigate } from 'react-router-dom';
import request from '../../../../apis/core'; // request 인스턴스 임포트

interface Props {
	feed: FeedProps;
	onRemove: () => void;
	onMoreClick: () => void;
}

const Feed: React.FC<Props> = ({ feed, onRemove, onMoreClick }) => {
	const nav = useNavigate();
	const [isHeartClicked, setIsHeartClicked] = useState(false);
	const [isStarClicked, setIsStarClicked] = useState(false);

	const myid = localStorage.getItem('id');

	const handleHeartClick = () => {
		setIsHeartClicked((prev) => !prev);
	};

	const handleStarClick = () => {
		setIsStarClicked((prev) => !prev);
	};

	const handleCommentClick = () => {
		nav(`/post/${feed.postId}`, { state: { isCommentModalOpen: true } });
	};

	const handleBlockUser = async () => {
		try {
			const response = await request.post<{ message: string }>('/block', {
				userId: myid,
				friendId: feed.userId,
				action: 'toggle',
			});
			if (response.message === 'OK') {
				// 요청이 성공하면 피드를 제거합니다.
				onRemove();
			} else {
				console.error('Failed to block user:', response.message);
			}
		} catch (error) {
			console.error('Error blocking user:', error);
		}
	};

	return (
		<FeedWrapper>
			<FeedTop>
				<Info onClick={() => nav(`/users/${feed.userId}`)}>
					<FeedProfileImgWrapper>
						<img src={feed.profileUrl} alt="tag" />
					</FeedProfileImgWrapper>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.black}>
						{feed.userName}
					</StyledText>
				</Info>
				<img src={more} style={{ cursor: 'pointer' }} onClick={onMoreClick} />
			</FeedTop>
			<FeedText onClick={() => nav(`/post/${feed.postId}`)}>
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
						<Btn onClick={handleBlockUser}>
							<img src={xBtn} style={{ width: '1.5rem', height: '1.5rem' }} />
						</Btn>
						{!isHeartClicked && (
							<Btn onClick={handleHeartClick}>
								<img src={heartBtn} />
							</Btn>
						)}
						{isHeartClicked && (
							<img src={clickedHeart} onClick={handleHeartClick} style={{ width: '3.75rem', height: '3.75rem' }} />
						)}
						{!isStarClicked && (
							<Btn onClick={handleStarClick}>
								<img src={starBtn} />
							</Btn>
						)}
						{isStarClicked && (
							<img src={clickedStar} onClick={handleStarClick} style={{ width: '3.75rem', height: '3.75rem' }} />
						)}
					</Reaction>

					<CommentBtn onClick={handleCommentClick}>
						<img src={commentBtn} />
						<StyledText $textTheme={{ style: 'body2-regular', lineHeight: 1.5 }} color={theme.colors.white}>
							코멘트 남기기
						</StyledText>
					</CommentBtn>
				</ReactionWrapper>
			</FeedImgBox>
		</FeedWrapper>
	);
};

export default Feed;
