import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import dayjs, { extend } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import theme from '@styles/theme';

import { togglePostLikeStatusApi } from '@apis/post-like';
import { postUserBlockApi } from '@apis/user-block';
import { handleError } from '@apis/util/handleError';
import { useSocket } from '@context/SocketProvider';
import { getCurrentUserId } from '@utils/getCurrentUserId';

import defaultProfile from '@assets/default/defaultProfile.svg';
import more from '@assets/default/more.svg';
import xBtn from '@assets/default/reject.svg';
import share from '@assets/default/share.svg';

import Heart from '@components/Icons/Heart';
import Message from '@components/Icons/Message';

import CommentBottomSheet from '@components/BottomSheet/CommentBottomSheet';
import OptionsBottomSheet from '@components/BottomSheet/OptionsBottomSheet';
import Modal from '@components/Modal';
import { StyledText } from '@components/Text/StyledText';

import type { PostUserBlockRequest } from '@apis/user-block/dto';
import type { CommentBottomSheetProps } from '@components/BottomSheet/CommentBottomSheet/dto';
import { OptionsBottomSheetProps } from '@components/BottomSheet/OptionsBottomSheet/dto';
import type { ModalProps } from '@components/Modal/dto';

import type { FeedProps } from './dto';

import {
	MatchingBtn,
	FeedImgBox,
	FeedProfileImgWrapper,
	FeedText,
	FeedTimeAgo,
	FeedTop,
	FeedWrapper,
	Info,
	MoreBtn,
	Reaction,
	ReactionWrapper,
	FeedImgBackground,
} from './styles';

const Feed: React.FC<FeedProps> = ({ feed }) => {
	const [isLikeClicked, setIsLikeClicked] = useState(feed.isPostLike);
	const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
	const [isMatchingCommentBottomSheetOpen, setIsMatchingCommentBottomSheetOpen] = useState(false);
	const [isOptionsBottomSheetOpen, setIsOptionsBottomSheetOpen] = useState(false);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');

	extend(relativeTime);
	const nav = useNavigate();
	const currentUserId = getCurrentUserId();
	const timeAgo = dayjs(feed.createdAt).locale('ko').fromNow();

	const socket = useSocket('matching');

	const handleMoreButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsOptionsBottomSheetOpen(true);
	};

	const handleRejectButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsBlockModalOpen(true);
	};

	const handleLikeButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		togglePostLikeStatus();
	};

	const handleMatchingButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMatchingCommentBottomSheetOpen(true);
	};

	const handleUserClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		sessionStorage.setItem('scrollPosition', String(window.scrollY));
		nav(`/profile/${feed.user.id}`);
	};

	const handleFeedClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;

		// 페이지네이션 bullet 클릭 시 이벤트 차단
		if (target.classList.contains('swiper-pagination-bullet')) {
			e.stopPropagation();
		} else {
			// 그 외에 게시글 상세 조회 페이지로 이동
			sessionStorage.setItem('scrollPosition', String(window.scrollY));
			nav(`/post/${feed.id}`);
		}
	};

	// 게시글 좋아요 & 좋아요 취소 api
	const togglePostLikeStatus = async () => {
		try {
			const response = await togglePostLikeStatusApi(feed.id);

			if (response.isSuccess) {
				setIsLikeClicked((prev) => !prev);
			}
		} catch (error) {
			const errorMessage = handleError(error, 'post');
			setModalContent(errorMessage);
			setIsStatusModalOpen(true);
		}
	};

	// 유저 차단 api
	const postUserBlock = async () => {
		try {
			const data: PostUserBlockRequest = {
				requesterId: currentUserId || -1,
				targetId: feed.user.id,
				action: 'block',
			};
			const response = await postUserBlockApi(data);

			if (response.isSuccess) {
				setModalContent('정상적으로 처리되었습니다.');
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
		} finally {
			setIsBlockModalOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// 매칭 신청 socket api
	const createMatching = (comment: string) => {
		socket.emit('requestMatching', {
			requesterId: currentUserId,
			targetId: feed.user.id,
			message: comment,
		});

		socket.on('error', (data) => {
			setModalContent(data);
			setIsMatchingCommentBottomSheetOpen(false);
			setIsStatusModalOpen(true);

			// 리스너가 중복 등록되지 않도록 바로 정리
			socket.off('error');
		});
	};

	// 게시글 옵션(더보기) 바텀시트
	const optionsBottomSheetProps: OptionsBottomSheetProps = {
		domain: 'post',
		targetId: {
			userId: feed.user.id || -1,
			postId: feed.id || -1,
		},
		targetNickname: feed.user.nickname || '알수없음',
		isBottomSheetOpen: isOptionsBottomSheetOpen,
		onClose: () => {
			setIsOptionsBottomSheetOpen(false);
		},
	};

	// 차단하기 모달
	const blockModalProps: ModalProps = {
		isCloseButtonVisible: true,
		content: `${feed.user.nickname || '알수없음'} 님을\n정말로 차단하시겠어요?`,
		button: {
			content: '차단하기',
			onClick: postUserBlock,
		},
		onClose: () => {
			setIsBlockModalOpen(false);
		},
	};

	// 매칭 요청 코멘트 바텀시트
	const matchingCommentBottomSheetProps: CommentBottomSheetProps = {
		isBottomSheetOpen: isMatchingCommentBottomSheetOpen,
		commentProps: {
			content: `${feed.user.nickname || '알수없음'} 님에게 대표 OOTD와 함께 전달될\n한줄 메시지를 보내보세요!`,
			sendComment: createMatching,
		},
		handleCloseBottomSheet: () => {
			setIsMatchingCommentBottomSheetOpen(false);
		},
	};

	// api 응답 상태에 따른 메시지를 출력하는 모달
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	// 친구한테 프로필 공유하기
	const handleShareButtonClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		// 사용자 ID로 프로필 URL 생성
		const profileUrl = `${window.location.origin}/profile/${feed.user.id}`;

		navigator.clipboard
			.writeText(profileUrl)
			.then(() => {
				setModalContent(`${feed.user.nickname}님의 프로필이 복사되었습니다!`);
				setIsStatusModalOpen(true); // 복사 성공 후 모달 열기
			})
			.catch(() => {
				setModalContent('프로필 복사에 실패했습니다. 다시 시도해 주세요.');
				setIsStatusModalOpen(true); // 복사 실패 시 모달 열기
			});
	};

	return (
		<FeedWrapper onClick={handleFeedClick}>
			<FeedTop>
				<Info onClick={handleUserClick}>
					<FeedProfileImgWrapper src={feed.user.profilePictureUrl || defaultProfile} alt="profile" />
					<StyledText $textTheme={{ style: 'body2-medium' }} color={theme.colors.text.primary}>
						{feed.user.nickname}
					</StyledText>
				</Info>
				<FeedTimeAgo $textTheme={{ style: 'caption2-regular' }} color={theme.colors.text.caption}>
					{timeAgo}
				</FeedTimeAgo>
				<MoreBtn onClick={handleMoreButtonClick}>
					<img src={more} />
				</MoreBtn>
			</FeedTop>
			<FeedText $textTheme={{ style: 'body2-regular' }} color={theme.colors.text.primary}>
				{feed.content}
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
					{feed.postImages.map((postImage) => (
						<SwiperSlide key={postImage.url}>
							<img src={postImage.url} alt={`${feed.user.nickname}의 피드 이미지`} className="ootd-image-small" />
							<div className="blur"></div>
							<FeedImgBackground $src={postImage.url} />
						</SwiperSlide>
					))}
				</Swiper>
				<ReactionWrapper>
					<Reaction>
						<img className="button" onClick={handleRejectButtonClick} src={xBtn} />
						<div className="button" onClick={handleLikeButtonClick}>
							<Heart isFilled={isLikeClicked} />
						</div>
						<div className="button" onClick={handleShareButtonClick}>
							<img src={share} alt="공유" />
						</div>
					</Reaction>

					<MatchingBtn onClick={handleMatchingButtonClick}>
						<Message width="16" height="16" color="white" />
						<StyledText $textTheme={{ style: 'body1-regular' }} color={theme.colors.text.contrast}>
							매칭 요청
						</StyledText>
					</MatchingBtn>
				</ReactionWrapper>
			</FeedImgBox>

			{isBlockModalOpen && <Modal {...blockModalProps} />}
			<CommentBottomSheet {...matchingCommentBottomSheetProps} />
			<OptionsBottomSheet {...optionsBottomSheetProps} />
			{isStatusModalOpen && <Modal {...statusModalProps} />}
		</FeedWrapper>
	);
};

export default Feed;
