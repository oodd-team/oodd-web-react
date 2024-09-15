import React from 'react';
import { StyledText } from '../../Text/StyledText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '../../../styles/theme';
import { Btn, CardLayout, OOTDImgBox, ProfileBox, ProfileImgBox, ProfileInfo, Reaction, SeeMore } from './styles';
import xBtn from '../../../assets/Home/button_reject.svg';
import checkBtn from '../../../assets/Home/button_check.svg';
import noProfileImg from '../../../assets/Home/no_profileImg.svg';

import { useNavigate } from 'react-router-dom';
import { Relationship } from './dto';
import request, { BaseResponse } from '../../../apis/core';

interface CardProps {
	onReject: () => void;
	relationship: Relationship;
}

// OOTD 카드 컴포넌트입니다. 매칭 탭에 있습니다.
const Card: React.FC<CardProps> = ({ onReject, relationship }) => {
	const nav = useNavigate();
	const { requester } = relationship;

	const handleReject = async () => {
		const response = await request.patch<BaseResponse>(`/user-relationships/${relationship.id}`, {
			requestStatus: 'rejected',
		});
		if (response.isSuccess) {
			onReject(); // 부모 컴포넌트의 함수 호출 (다음 슬라이드로 이동)
		} else {
			alert('매칭 거절에 실패했습니다.');
		}
	};

	const handleAccept = async () => {
		const response = await request.patch<BaseResponse>(`/user-relationships/${relationship.id}`, {
			requestStatus: 'accepted',
		});
		if (response.isSuccess) {
			nav('/chats');
		} else {
			alert('매칭 수락에 실패했습니다.');
		}
	};

	return (
		<CardLayout>
			<ProfileBox>
				<ProfileImgBox>
					<img src={requester.profilePictureUrl || noProfileImg} alt="profile" />
				</ProfileImgBox>
				<ProfileInfo>
					<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1.2 }} color={theme.colors.white}>
						{requester.nickname || requester.name}
					</StyledText>
					<StyledText $textTheme={{ style: 'body5-medium', lineHeight: 1.2 }} color={theme.colors.gray1}>
						{requester.representativePost?.postStyletags.length
							? `#${requester.representativePost.postStyletags[0].styletag?.tag ?? 'unknown'}`
							: ''}
					</StyledText>
				</ProfileInfo>
				<SeeMore onClick={() => nav(`/users/${requester.id}`)}>
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
					{requester.representativePost?.images.map((image) => (
						<SwiperSlide key={image.id}>
							<img src={image.url} alt="OOTD" className="slide-image-small" />
						</SwiperSlide>
					))}
				</Swiper>
				<Reaction>
					<Btn onClick={handleReject}>
						<img src={xBtn} alt="reject" />
					</Btn>
					<Btn onClick={handleAccept}>
						<img src={checkBtn} alt="accept" />
					</Btn>
				</Reaction>
			</OOTDImgBox>
		</CardLayout>
	);
};

export default Card;
