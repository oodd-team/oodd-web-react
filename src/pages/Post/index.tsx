import React, { useEffect, useState } from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto.ts';
import { StyledText } from '../../components/Text/StyledText';
import {
	InputLayout,
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
import ClothingInfoCard from './ClothingInfoCard';
import BottomSheet from '../../components/BottomSheet';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import Modal from '../../components/Modal';
import Comment from '../../components/Comment';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '../../styles/theme';
import profileImg from './../../assets/Post/profileImg.svg';
import more from './../../assets/Post/more.svg';
import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';
import ConfirmationModal from '../../components/ConfirmationModal/index.tsx';
import { CommentProps } from '../../components/Comment/dto.ts';
import { BottomSheetProps } from '../../components/BottomSheet/dto.ts';
import { PostResponse, PostData, UserResponse, UserData, ClothingInfo } from './dto';
import request from '../../apis/core';

const Post: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [postData, setPostData] = useState<PostData>();
	const [user, setUser] = useState<UserData>();
	const [userName, setUserName] = useState<string>('');
	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
	const [isOpenReportSheet, setIsOpenReportSheet] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const nav = useNavigate();

	// 서버에서 게시물 데이터 가져오기
	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const response = await request.get<PostResponse>(`/posts/${postId}`);
				if (response.isSuccess) {
					setPostData(response.result);

					response.result.clothingInfo?.forEach((clothingInfo) => {
						console.log('clothing: ', clothingInfo);
					});

					fetchUser();
				} else {
					console.error('Failed to fetch post data');
				}
			} catch (error) {
				console.error('Error fetching post data:', error);
			}
		};

		const fetchUser = async () => {
			if (postData) {
				try {
					const response = await request.get<UserResponse>(`/users/${postData.userId}`);

					if (response.isSuccess) {
						setUser(response.result);
						if (user) {
							setUserName(user.nickname || user.name);
						}
					} else {
						console.error('Failed to fetch user data');
					}
				} catch (error) {
					console.error('Error fetching user data:', error);
				}
			}
		};

		fetchPostData();
	}, [postId]);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
	};

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '신고하기',
				action: () => {
					setIsOpenBottomSheet(false);
					setIsOpenReportSheet(true);
				},
				icon: declaration,
			},
			{
				text: '차단하기',
				action: () => {
					setIsOpenBottomSheet(false);
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
					setIsOpenReportSheet(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '부적절한 콘텐츠',
				action: () => {
					setIsOpenReportSheet(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '선정적',
				action: () => {
					setIsOpenReportSheet(false);
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

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenBottomSheet,
		isHandlerVisible: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsOpenBottomSheet(false);
			setShowInput(false);
		},
	};

	const commentProps: CommentProps = {
		content: `${userName}님의 게시물에 대한 코멘트를 남겨주세요.\n코멘트는 ${userName}님에게만 전달됩니다.`,
		sendComment: (comment: string) => {
			console.log(`api에 ${comment} 전달`);
		},
	};

	const commentSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isCommentModalOpen,
		isHandlerVisible: true,
		Component: Comment,
		componentProps: commentProps,
		onCloseBottomSheet: () => {
			setIsCommentModalOpen(false);
		},
	};

	const confirmationModalProps = {
		content: `${userName}님의 OOTD를 차단합니다.`,
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

	if (!postData) {
		return <Loading />; // 로딩 중 표시
	}

	return (
		<OODDFrame>
			<BottomSheet {...bottomSheetProps} />
			<BottomSheet
				isOpenBottomSheet={isOpenReportSheet}
				isHandlerVisible={true}
				Component={() => (
					<div style={{ overflow: 'auto' }}>
						<BottomSheetMenu {...reportSheetMenuProps} />
						{showInput && (
							<ReportTextarea
								onCloseReportSheet={() => setIsOpenReportSheet(false)}
								onOpenModal={() => setIsModalOpen(true)}
							/>
						)}
					</div>
				)}
				onCloseBottomSheet={() => {
					setIsOpenReportSheet(false);
					setShowInput(false);
				}}
			/>
			<BottomSheet {...commentSheetProps} />
			{isModalOpen && <Modal content={`${userName}님의 OOTD를 신고했어요.`} onClose={() => setIsModalOpen(false)} />}
			{isConfirmationModalOpen && <ConfirmationModal {...confirmationModalProps} />}
			{isBlockedModalOpen && (
				<Modal
					content={`${user?.nickname || user?.name}님을 차단했어요.`}
					onClose={() => setIsBlockedModalOpen(false)}
				/>
			)}

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
					<MoreBtn onClick={() => setIsOpenBottomSheet(true)}>
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
					{postData.clothingInfo?.map((clothingInfo: ClothingInfo, index: number) => (
						<ClothingInfoCard
							key={index}
							imageUrl={clothingInfo.imageUrl}
							brand={clothingInfo.brand}
							model={clothingInfo.model}
							url={clothingInfo.url}
						/>
					))}
				</ClothingInfos>
			</PostWrapper>
		</OODDFrame>
	);
};

export default Post;
