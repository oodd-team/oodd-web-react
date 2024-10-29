import React, { useEffect, useState } from 'react';
import { OODDFrame } from '../../components/Frame/Frame.tsx';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto.ts';
import { StyledText } from '../../components/Text/StyledText';
import {
	MoreBtn,
	PostImg,
	PostInfo,
	PostText,
	PostWrapper,
	ClothingInfos,
	UserInfo,
	UserName,
	UserProfile,
} from './styles';
import Loading from '../../components/Loading/index.tsx';
import PostTopBar from './PostTopBar';
import ClothingInfoItem from '../../components/ClothingInfoItem/index.tsx';
import BottomSheet from '../../components/BottomSheet';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import Modal from '../../components/Modal';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '../../styles/theme';
import profileImg from './../../assets/Post/profileImg.svg';
import more from './../../assets/Post/more.svg';
import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';
import ConfirmationModal from '../../components/ConfirmationModal/index.tsx';
import { BottomSheetProps } from '../../components/BottomSheet/dto.ts';
import ReportTextarea from '../Home/ReportTextarea.tsx';
import { ClothingInfo } from '../../components/ClothingInfoItem/dto.ts';
import { PostResponse, UserResponse } from './dto';
import request from '../../apis/core';
import { useRecoilState } from 'recoil';
import {
	IsPostCommentBottomSheetOpenAtom,
	IsPostCommentFailModalOpenAtom,
	IsPostCommentSuccessModalOpenAtom,
} from '../../recoil/Home/PostCommentBottomSheetAtom.ts';
import PostCommentBottomSheet from '../Home/BottomSheets/PostCommentBottomSheet.tsx';
import { ModalProps } from '../../components/Modal/dto.ts';

const Post: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [postData, setPostData] = useState<PostResponse['result']>();
	const [user, setUser] = useState<UserResponse['result']>();
	const [userName, setUserName] = useState<string>('');
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [isReportSheetOpen, setIsReportSheetOpen] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
	const [, setIsPostCommentBottomSheetOpen] = useRecoilState(IsPostCommentBottomSheetOpenAtom);
	const [isPostCommentSuccessModalOpen, setIsPostCommentSuccessModalOpen] = useRecoilState(
		IsPostCommentSuccessModalOpenAtom,
	);
	const [isPostCommentFailModalOpen, setIsPostCommentFailModalOpen] = useRecoilState(IsPostCommentFailModalOpenAtom);

	const nav = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.state && location.state.isCommentModalOpen) {
			setIsPostCommentBottomSheetOpen(true);
		}
	}, [location.state]);

	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const response = await request.get<PostResponse>(`/posts/${postId}`);
				if (response.isSuccess) {
					setPostData(response.result);
					fetchUser(response.result.userId);
				} else {
					console.error('Failed to fetch post data');
				}
			} catch (error) {
				console.error('Error fetching post data:', error);
			}
		};

		const fetchUser = async (userId: number) => {
			try {
				const response = await request.get<UserResponse>(`/users/${userId}`);
				if (response.isSuccess) {
					setUser(response.result);
					setUserName(response.result.nickname || response.result.name);
				} else {
					console.error('Failed to fetch user data');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchPostData();
	}, [postId]);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setIsBottomSheetOpen(false);
					setIsReportSheetOpen(true);
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsBottomSheetOpen(false);
					setIsConfirmationModalOpen(true);
				},
				icon: block,
			},
		],
		marginBottom: '3.125rem',
	};

	const reportSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '스팸',
				action: () => {
					setIsReportSheetOpen(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '부적절한 콘텐츠',
				action: () => {
					setIsReportSheetOpen(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '선정적',
				action: () => {
					setIsReportSheetOpen(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '직접 입력',
				action: () => {
					setShowInput((prev) => !prev);
				},
			},
		],
		marginBottom: '3.125rem',
	};

	const bottomSheetProps: BottomSheetProps<BottomSheetMenuProps> = {
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
			setShowInput(false);
		},
	};

	const confirmationModalProps = {
		content: `${userName}님을 정말로 차단하시겠습니까?`,
		isCancelButtonVisible: true,
		confirm: {
			text: '차단하기',
			action: () => {
				setIsConfirmationModalOpen(false);
				setIsBlockedModalOpen(true); // 차단 완료 모달 열기
			},
		},
		onCloseModal: () => {
			setIsConfirmationModalOpen(false);
		},
	};

	// 코멘트 남기기 버튼
	const postCommentSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsPostCommentSuccessModalOpen(false);
		},
		content: '코멘트가 전달되었어요',
	};

	const postCommentFailModalProps: ModalProps = {
		onClose: () => {
			setIsPostCommentFailModalOpen(false);
		},
		content: '일시적인 오류입니다',
	};

	if (!postData) {
		return <Loading />; // 로딩 중 표시
	}

	return (
		<OODDFrame>
			<BottomSheet {...bottomSheetProps} />
			{/* TODO: 신고하기 바텀시트 공통 컴포넌트로 분리하면서 수정 필요 */}
			<BottomSheet
				isOpenBottomSheet={isReportSheetOpen}
				isHandlerVisible={true}
				Component={() => (
					<div style={{ overflow: 'auto' }}>
						<BottomSheetMenu {...reportSheetMenuProps} />
						{showInput && (
							<ReportTextarea
								onCloseReportSheet={() => setIsReportSheetOpen(false)}
								onOpenModal={() => setIsModalOpen(true)}
							/>
						)}
					</div>
				)}
				onCloseBottomSheet={() => {
					setIsReportSheetOpen(false);
					setShowInput(false);
				}}
			/>
			{isModalOpen && <Modal content={`${userName}님의 OOTD를 신고했어요.`} onClose={() => setIsModalOpen(false)} />}
			{isConfirmationModalOpen && <ConfirmationModal {...confirmationModalProps} />}
			{isBlockedModalOpen && (
				<Modal content={`${userName}님을 차단했어요.`} onClose={() => setIsBlockedModalOpen(false)} />
			)}

			<PostCommentBottomSheet />
			{isPostCommentSuccessModalOpen && <Modal {...postCommentSuccessModalProps} />}
			{isPostCommentFailModalOpen && <Modal {...postCommentFailModalProps} />}

			<PostTopBar userName={userName} />
			<PostWrapper>
				<PostInfo>
					<UserInfo onClick={() => nav(`/users/${postData.userId}`)}>
						<UserProfile>
							<img src={user?.profilePictureUrl || profileImg} alt="profileImg" />
						</UserProfile>
						<UserName>
							<StyledText $textTheme={{ style: 'body1-medium', lineHeight: 1 }} color={theme.colors.black}>
								{userName}
							</StyledText>
						</UserName>
					</UserInfo>
					<MoreBtn onClick={() => setIsBottomSheetOpen(true)}>
						<img src={more} alt="more" />
					</MoreBtn>
				</PostInfo>
				<PostText>
					<StyledText
						$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
						color={theme.colors.black}
						style={{ opacity: '50%' }}
					>
						{postData.content}
					</StyledText>
				</PostText>
				<PostImg>
					<Swiper
						modules={[Pagination, Navigation]}
						slidesPerView={1}
						pagination={{ clickable: true }}
						navigation
						className="postSwiper"
					>
						{postData.photoUrls.map((image: string, index: number) => (
							<SwiperSlide key={index}>
								<img src={image} alt={`postImg-${index}`} style={{ width: '100%', height: 'auto' }} />
							</SwiperSlide>
						))}
					</Swiper>
				</PostImg>
				<ClothingInfos>
					{postData.clothingInfo?.map((clothingObj: ClothingInfo, index: number) => (
						<ClothingInfoItem key={index} clothingObj={clothingObj} hasRightMargin={true} />
					))}
				</ClothingInfos>
			</PostWrapper>
		</OODDFrame>
	);
};

export default Post;
