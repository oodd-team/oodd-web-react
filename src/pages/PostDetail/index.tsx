import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	PostDetailContainer,
	UserID,
	Pic_exam,
	UserInfoContainer,
	UserRow,
	Text,
	Menu,
	ImageWrapper,
	Image,
	IconRow,
	IconWrapper,
	BrandBoxContainer,
	BrandBox,
	BrandLink,
	Tab,
	ContentContainer,
	UserItem,
	CircleIcon,
	ModalContainer,
	TabContainer,
	Arrow,
	Indicator,
} from './styles';

import TopBar from '../../components/TopBar';
import { OODDFrame } from '../../components/Frame/Frame';
import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import mockImage from './mockImage.png';
import heartIcon from './heartIcon.svg';
import commentIcon from './commentIcon.svg';
import nextIcon from '../../assets/Upload/next.svg';
import back from '../../assets/back.svg';

import ConfirmationModal from '../../components/ConfirmationModal';
import DeleteIcon from './assets/DeleteIcon.png';
import EditIcon from './assets/EditIcon.svg';
import PinIcon from './assets/PinIcon.svg';

import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';
import request from '../../apis/core';
import { UserResponse } from '../Mypage/dto';
import { BaseResponse, PostDetailResponse, LikesResponse, CommentsResponse } from './dto';

const PostDetail: React.FC = () => {
	const { postId } = useParams<{ postId: string }>();
	const [postDetail, setPostDetail] = useState<PostDetailResponse['result'] | null>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments' | 'menu'>('menu');
	const [likes, setLikes] = useState<LikesResponse['result']['likes']>([]);
	const [comments, setComments] = useState<CommentsResponse['result']['comments']>([]);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const navigate = useNavigate();
	const [user, setUser] = useState<UserResponse | null>(null);

	// 좋아요 리스트 불러오기
	const fetchLikes = async () => {
		try {
			const response = await request.get<LikesResponse>(`/posts/${postId}/like`);
			if (response.isSuccess) {
				setLikes(response.result.likes);
			} else {
				console.error('Failed to fetch likes:', response.message);
			}
		} catch (error) {
			console.error('Error fetching likes:', error);
		}
	};

	// 코멘트 리스트 불러오기
	const fetchComments = async () => {
		try {
			const response = await request.get<CommentsResponse>(`/posts/${postId}/comments`);
			if (response.isSuccess) {
				setComments(response.result.comments);
			} else {
				console.error('Failed to fetch comments:', response.message);
			}
		} catch (error) {
			console.error('Error fetching comments:', error);
		}
	};

	// 유저 정보 가져오기
	const fetchUserData = async () => {
		try {
			const response = await request.get<UserResponse>(`/users/${2}`);
			if (response) {
				setUser(response);
			}
		} catch (error) {
			console.error('Error fetching user data:', error);
		}
	};

	useEffect(() => {
		fetchPostDetail();
		fetchUserData(); // 유저 데이터 불러오기
	}, [postId]);

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '대표 OOTD로 지정하기',
				action: () => {
					setIsBottomSheetOpen(false);
					handlePinPost();
				},
				icon: PinIcon,
			},
			{
				text: 'OODD 수정하기',
				action: () => {
					setIsBottomSheetOpen(false);
					handleEditPost();
				},
				icon: EditIcon,
			},
			{
				text: 'OOTD 삭제하기',
				action: () => {
					setIsBottomSheetOpen(false);
					handleDeletePost();
				},
				icon: DeleteIcon,
			},
		],
		marginBottom: '50px',
	};

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		Component: () => {
			if (activeTab === 'menu') {
				return <BottomSheetMenu {...bottomSheetMenuProps} />;
			} else {
				return (
					<ModalContainer>
						<TabContainer>
							<Tab active={activeTab === 'likes'} onClick={() => setActiveTab('likes')}>
								좋아요 {likes.length}
							</Tab>
							<Tab active={activeTab === 'comments'} onClick={() => setActiveTab('comments')}>
								코멘트 {comments.length}
							</Tab>
						</TabContainer>
						<ContentContainer>
							{activeTab === 'likes' && (
								<>
									{likes.map((like) => (
										<UserItem key={like.user.id}>
											<CircleIcon>
												<img
													src={like.user.profilePictureUrl || mockImage}
													alt="user avatar"
													style={{ borderRadius: '50%', width: '100%', height: '100%' }}
												/>
											</CircleIcon>
											{like.user.nickname}
										</UserItem>
									))}
								</>
							)}
							{activeTab === 'comments' && (
								<>
									{comments.map((comment) => (
										<UserItem key={comment.id}>
											<CircleIcon>
												<img
													src={comment.user.profilePictureUrl || mockImage}
													alt="user avatar"
													style={{ borderRadius: '50%', width: '100%', height: '100%' }}
												/>
											</CircleIcon>
											<div>
												<UserID>{comment.user.nickname}</UserID>
												<div>{comment.content}</div>
											</div>
										</UserItem>
									))}
								</>
							)}
						</ContentContainer>
					</ModalContainer>
				);
			}
		},
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
		},
	};

	const handleOpenSheet = async (tab: 'likes' | 'comments' | 'menu') => {
		setActiveTab(tab);
		if (tab === 'likes') await fetchLikes();
		if (tab === 'comments') await fetchComments();
		setIsBottomSheetOpen(true);
	};

	const fetchPostDetail = async () => {
		try {
			const response = await request.get<PostDetailResponse>(`/posts/${postId}`);
			if (response.isSuccess) {
				setPostDetail(response.result);
			} else {
				console.error('Unexpected response:', response.message);
			}
		} catch (error) {
			console.error('Error fetching post details:', error);
		}
	};

	const handleNextImage = () => {
		if (postDetail && currentImageIndex < postDetail.photoUrls.length - 1) {
			setCurrentImageIndex(currentImageIndex + 1);
		}
	};

	const handlePrevImage = () => {
		if (currentImageIndex > 0) {
			setCurrentImageIndex(currentImageIndex - 1);
		}
	};

	const handleEditPost = async () => {
		try {
			const response = await request.patch<BaseResponse>(`/posts/${postId}`);
			if (response.isSuccess) {
				console.log('Post updated successfully:', response.result);
				navigate(`/post/${postId}`); // 예시로, 포스트 상세 페이지로 이동
			} else {
				console.error('Failed to update post:', response.message);
			}
		} catch (error) {
			console.error('Error updating post:', error);
		}
	};

	const handlePinPost = async () => {
		try {
			const response = await request.patch<BaseResponse>(`/posts/${postId}/isRepresentative/${2}`, {
				isRepresentative: true,
			});
			if (response.isSuccess) {
				console.log('Post pinned successfully:', response.result);
				// PostDetail 재로드
				fetchPostDetail();
				navigate('/mypage');
			} else {
				console.error('Failed to pin post:', response.message);
			}
		} catch (error) {
			console.error('Error pinning post:', error);
		}
	};

	const handleDeletePost = () => {
		setIsConfirmationModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		try {
			const response = await request.delete<BaseResponse>(`/posts/${postId}`);
			if (response.message === 'Post deleted successfully') {
				console.log(response.message);
				navigate('/mypage'); // 성공적으로 삭제 후 다른 페이지로 이동
			} else {
				console.error('Unexpected response:', response.message);
			}
		} catch (error) {
			console.error('Error deleting post:', error);
		} finally {
			setIsConfirmationModalOpen(false); // 확인 모달을 닫음
		}
	};

	const handleCancelDelete = () => {
		setIsConfirmationModalOpen(false);
	};

	useEffect(() => {
		fetchPostDetail();
	}, [postId]);

	return (
		<OODDFrame>
			<PostDetailContainer>
				<TopBar ID={user?.id.toString()} text="OOTD" LeftButtonSrc={back} onLeftClick={() => navigate(-1)} />

				<UserInfoContainer>
					<UserRow>
						<Pic_exam>
							<img
								src={user?.profilePictureUrl || mockImage}
								alt="User Profile"
								style={{ borderRadius: '50%', width: '36px', height: '36px' }}
							/>
						</Pic_exam>
						<UserID>{user?.nickname || 'Unknown User'}</UserID>
					</UserRow>
					<Text>{postDetail?.content || 'Loading...'}</Text>
				</UserInfoContainer>
				<Menu onClick={() => handleOpenSheet('menu')}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							d="M3.97461 12.9181V10.9307H5.96207V12.9181H3.97461ZM10.9307 12.9181V10.9307H12.9182V12.9181H10.9307ZM17.8869 12.9181V10.9307H19.8743V12.9181H17.8869Z"
							fill="black"
							stroke="black"
							strokeWidth="0.596239"
						/>
					</svg>
				</Menu>

				<ImageWrapper>
					{postDetail?.photoUrls && postDetail.photoUrls.length > 1 && (
						<>
							<Arrow direction="left" onClick={handlePrevImage} disabled={currentImageIndex === 0}>
								<img src={nextIcon} style={{ transform: 'rotate(180deg)' }} alt="Previous" />
							</Arrow>
							<Arrow
								direction="right"
								onClick={handleNextImage}
								disabled={currentImageIndex === postDetail.photoUrls.length - 1}
							>
								<img src={nextIcon} alt="Next" />
							</Arrow>
							<Indicator>
								{currentImageIndex + 1} / {postDetail.photoUrls.length}
							</Indicator>
						</>
					)}
					<Image src={postDetail?.photoUrls?.[currentImageIndex] || mockImage} alt="Post" />
				</ImageWrapper>

				{isBottomSheetOpen && <BottomSheet {...bottomSheetProps} />}
				{isConfirmationModalOpen && (
					<ConfirmationModal
						content="해당 OOTD를 삭제하시겠습니까?"
						isCancelButtonVisible={true}
						confirm={{ text: '삭제하기', action: handleConfirmDelete }}
						onCloseModal={handleCancelDelete}
					/>
				)}
				<IconRow>
					<IconWrapper onClick={() => handleOpenSheet('likes')}>
						<img src={heartIcon} alt="Heart Icon" />
						<span>{postDetail?.likes || 0}</span> {/* 좋아요 수 */}
					</IconWrapper>
					<IconWrapper onClick={() => handleOpenSheet('comments')}>
						<img src={commentIcon} alt="Comment Icon" />
						<span>{postDetail?.comments?.length || 0}</span> {/* 댓글 수 */}
					</IconWrapper>
				</IconRow>
				<BrandBoxContainer>
					{postDetail?.clothingInfo?.map((clothing, index) => (
						<BrandBox key={index}>
							<img src={clothing.imageUrl || mockImage} alt="브랜드 이미지" />
							<div>
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
									{clothing.brand}
								</StyledText>
								<BrandLink>
									<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
										{clothing.model}/{clothing.modelNumber}/<a href={clothing.url}>URL</a>
									</StyledText>
								</BrandLink>
							</div>
							<img src={nextIcon} alt="Next Icon" className="next-icon" />
						</BrandBox>
					))}
				</BrandBoxContainer>
			</PostDetailContainer>
		</OODDFrame>
	);
};

export default PostDetail;
