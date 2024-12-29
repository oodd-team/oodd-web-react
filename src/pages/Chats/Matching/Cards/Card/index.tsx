import React, { useState } from 'react';
import { StyledText } from '@components/Text/StyledText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '@styles/theme';
import {
	ArrowButton,
	Btn,
	CardLayout,
	OOTDImgBackground,
	OOTDImgBox,
	ProfileContainer,
	ProfileImgBox,
	ProfileInfo,
	Reaction,
	SeeMore,
} from './styles';
import rejectButton from '@assets/default/reject.svg';
import acceptButton from '@assets/default/accept.svg';
import defaultProfile from '@assets/default/defaultProfile.svg';
import { useNavigate } from 'react-router-dom';
import { modifyMatchingStatusApi } from '@apis/matching';
import { handleError } from '@apis/util/handleError';
import type { ModalProps } from '@components/Modal/dto';
import Modal from '@components/Modal';
import { useRecoilState } from 'recoil';
import { OtherUserAtom } from '@recoil/util/OtherUser';
import type { CardProps } from './dto';

const Card: React.FC<CardProps> = ({ removeRejectedMatching, matching }) => {
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류가 발생했습니다.\n관리자에게 문의해 주세요.');
	const [, setOtherUser] = useRecoilState(OtherUserAtom);
	const nav = useNavigate();
	const requester = matching.requester;

	const handleUserClick = () => {
		nav(`/profile/${requester.id}`);
	};

	const handleRejectButtonClick = () => {
		modifyMatchingStatus('reject');
	};

	const handleAcceptButtonClick = () => {
		modifyMatchingStatus('accept');
	};

	// 매칭 거절 및 수락 api
	const modifyMatchingStatus = async (status: 'accept' | 'reject') => {
		try {
			console.log(matching);
			const response = await modifyMatchingStatusApi(matching.id, { requestStatus: status });

			if (response.isSuccess) {
				removeRejectedMatching(); // 매칭 리스트에서 해당 매칭을 제거

				if (status === 'accept') {
					setOtherUser({
						id: requester.id,
						nickname: requester.nickname,
						profilePictureUrl: requester.profilePictureUrl,
					});
					nav(`/chats/${response.data.chatRoomId}`);
				}
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		}
	};

	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<CardLayout>
			<ProfileContainer>
				<ProfileImgBox onClick={handleUserClick}>
					<img src={requester.profilePictureUrl || defaultProfile} alt="profile" />
				</ProfileImgBox>
				<ProfileInfo>
					<StyledText
						$textTheme={{ style: 'body1-medium' }}
						color={theme.colors.text.primary}
						onClick={handleUserClick}
					>
						{requester.nickname || '알수없음'}
					</StyledText>
					<div className="row-flex">
						{requester.representativePost.styleTags.map((tag, index) => (
							<div className="row-flex" key={tag}>
								<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray[200]}>
									{tag}
								</StyledText>
								{index < requester.representativePost.styleTags.length - 1 && (
									<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.gray[200]}>
										,&nbsp;
									</StyledText>
								)}
							</div>
						))}
					</div>
				</ProfileInfo>
				<SeeMore onClick={() => nav(`/profile/${requester.id}`)}>
					<StyledText $textTheme={{ style: 'caption2-regular' }} color={theme.colors.text.caption}>
						OOTD 더 보기
					</StyledText>
					<ArrowButton />
				</SeeMore>
			</ProfileContainer>
			<OOTDImgBox>
				<Swiper
					direction="vertical"
					slidesPerView={1}
					effect="slide"
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="childSwiper"
				>
					{requester.representativePost.postImages.map((postImage) => (
						<SwiperSlide key={postImage.url}>
							<img src={postImage.url} alt="OOTD" className="slide-image-small" />
							<div className="blur"></div>
							<OOTDImgBackground $src={postImage.url} />
						</SwiperSlide>
					))}
				</Swiper>
				<Reaction>
					<Btn onClick={handleRejectButtonClick}>
						<img src={rejectButton} alt="reject" />
					</Btn>
					<Btn onClick={handleAcceptButtonClick}>
						<img src={acceptButton} alt="accept" />
					</Btn>
				</Reaction>
			</OOTDImgBox>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</CardLayout>
	);
};

export default Card;
