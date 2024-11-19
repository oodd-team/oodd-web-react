import React, { useState } from 'react';
import { StyledText } from '../../../../../components/Text/StyledText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '../../../../../styles/theme';
import {
	ArrowButton,
	Btn,
	CardLayout,
	OOTDImgBox,
	ProfileContainer,
	ProfileImgBox,
	ProfileInfo,
	Reaction,
	SeeMore,
} from './styles';
import rejectButton from '../../../../../assets/default/reject.svg';
import acceptButton from '../../../../../assets/default/accept.svg';
import defaultProfile from '../../../../../assets/default/defaultProfile.svg';

import { useNavigate } from 'react-router-dom';
import { MatchingDto } from '../../../../../apis/matching/dto';
import { modifyMatchingStatusApi } from '../../../../../apis/matching';
import { handleError } from '../../../../../apis/util/handleError';
import { ModalProps } from '../../../../../components/Modal/dto';
import Modal from '../../../../../components/Modal';

interface CardProps {
	removeRejectedMatching: () => void;
	matching: MatchingDto;
}

const Card: React.FC<CardProps> = ({ removeRejectedMatching, matching }) => {
	const nav = useNavigate();
	const requester = matching.requester;
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('알 수 없는 오류가 발생했습니다.\n관리자에게 문의해 주세요.');

	// 매칭 거절 및 수락 api
	const modifyMatchingStatus = async (status: 'accept' | 'reject') => {
		try {
			// TODO: api에 matchingId 추가되면 첫 번째 매개변수 수정
			const response = await modifyMatchingStatusApi(0, { requestStatus: status });
			if (response.isSuccess) {
				removeRejectedMatching(); // 매칭 리스트에서 해당 매칭을 제거
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		}
	};

	const handleRejectButtonClick = () => {
		modifyMatchingStatus('reject');
	};

	const handleAcceptButtonClick = () => {
		modifyMatchingStatus('accept');
	};

	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<CardLayout>
			{isStatusModalOpen && <Modal {...statusModalProps} />}
			<ProfileContainer>
				<ProfileImgBox>
					<img src={requester.profilePictureUrl || defaultProfile} alt="profile" />
				</ProfileImgBox>
				<ProfileInfo>
					<StyledText $textTheme={{ style: 'body1-medium' }} color={theme.colors.black}>
						{requester.nickname || '알수없음'}
					</StyledText>
					<StyledText $textTheme={{ style: 'body5-medium' }} color={theme.colors.gray1}>
						{matching.requesterPost.styleTags}
					</StyledText>
				</ProfileInfo>
				<SeeMore onClick={() => nav(`/users/${requester.requesterId}`)}>
					<StyledText $textTheme={{ style: 'caption2-regular' }} color="#8e8e93">
						OOTD 더 보기
					</StyledText>
					<ArrowButton />
				</SeeMore>
			</ProfileContainer>
			<OOTDImgBox>
				<Swiper
					direction="vertical"
					pagination={{
						clickable: true,
					}}
					modules={[Pagination]}
					className="childSwiper"
				>
					{matching.requesterPost.postImages.map((image) => (
						<SwiperSlide key={image.url}>
							<img src={image.url} alt="OOTD" className="slide-image-small" />
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
		</CardLayout>
	);
};

export default Card;