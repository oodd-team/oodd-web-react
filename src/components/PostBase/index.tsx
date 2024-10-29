import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	PostContainer,
	PostInfoContainer,
	UserInfo,
	UserProfile,
	UserName,
	MenuBtn,
	Content,
	IconRow,
	IconWrapper,
	ClothingInfoList,
} from './styles';

import theme from '../../styles/theme';
import { OODDFrame } from '../Frame/Frame';
import { StyledText } from '../Text/StyledText';
import TopBar from '../TopBar';
import NavBar from '../NavBar';
import BottomSheet from '../BottomSheet';
import { BottomSheetProps } from '../BottomSheet/dto';
import ImageSwiper from './ImageSwiper';
import ClothingInfoItem from '../ClothingInfoItem';
import LikeCommentBottomSheetContent from './LikeCommentBottomSheetContent';
import Loading from '../Loading';

import back from '../../assets/back.svg';
import heart from '../../assets/Post/heart.svg';
import comment from '../../assets/Post/comment.svg';
import menu from '../../assets/Post/menu.svg';

import { PostBaseProps } from './dto';
import { GetPostDetailResponse } from '../../apis/Post/dto';
import { GetUserResponse } from '../../apis/User/dto';
import request from '../../apis/core';

const PostBase: React.FC<PostBaseProps> = ({ onClickMenu }) => {
	const { postId } = useParams<{ postId: string }>();
	const [postData, setPostData] = useState<GetPostDetailResponse['result']>();
	const [user, setUser] = useState<GetUserResponse['result']>();
	const [userName, setUserName] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	const [isLikeCommentBottomSheetOpen, setIsLikeCommentBottomSheetOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'likes' | 'comments'>('likes'); // 추가: activeTab state

	const nav = useNavigate();

	useEffect(() => {
		const fetchPostData = async () => {
			setIsLoading(true);
			try {
				const response = await request.get<GetPostDetailResponse>(`/posts/${postId}`);
				if (response.isSuccess && response.result) {
					setPostData(response.result);
					fetchUser(response.result.userId);
				} else {
					console.error('Failed to fetch post data');
				}
			} catch (error) {
				console.error('Error fetching post data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		// 유저 정보 가져오기
		const fetchUser = async (userId: number) => {
			setIsLoading(true);
			try {
				const response = await request.get<GetUserResponse>(`/users/${userId}`);
				if (response.isSuccess && response.result) {
					setUser(response.result);
					setUserName(response.result.nickname || response.result.name);
				} else {
					console.error('Failed to fetch user data');
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPostData();
	}, [postId]);

	const handleUserClick = () => {
		// 로컬 스토리지에서 사용자 ID 가져오기
		const myUserId = localStorage.getItem('id'); // 로컬 스토리지에 저장된 사용자 ID를 가져옴

		if (String(myUserId) === String(postData?.userId)) {
			// 내 게시물인 경우
			nav('/mypage');
		} else {
			// 다른 유저의 게시물인 경우
			nav(`/users/${postData?.userId}`);
		}
	};

	const handleLikeCommentOpen = (tab: 'likes' | 'comments') => {
		setActiveTab(tab); // 클릭한 버튼에 따라 activeTab 설정
		setIsLikeCommentBottomSheetOpen(true);
	};

	const likeCommentbottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isLikeCommentBottomSheetOpen,
		isHandlerVisible: true,
		Component: LikeCommentBottomSheetContent,
		onCloseBottomSheet: () => {
			setIsLikeCommentBottomSheetOpen(false);
		},
		componentProps: {
			tab: activeTab,
		},
	};

	return (
		<OODDFrame>
			<TopBar LeftButtonSrc={back} />
			{!postData || isLoading ? (
				<Loading />
			) : (
				<PostContainer>
					<PostInfoContainer>
						<UserInfo onClick={handleUserClick}>
							<UserProfile>
								<img src={user?.profilePictureUrl} alt="profileImg" />
							</UserProfile>
							<UserName>
								<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 1 }} color={theme.colors.black}>
									{userName}
								</StyledText>
							</UserName>
						</UserInfo>
						<MenuBtn onClick={onClickMenu}>
							<img src={menu} alt="menu" />
						</MenuBtn>
					</PostInfoContainer>

					{postData.content && (
						<Content>
							<StyledText
								$textTheme={{ style: 'body6-light', lineHeight: 1.2 }}
								color={theme.colors.black}
								style={{ opacity: '50%' }}
							>
								{postData.content}
							</StyledText>
						</Content>
					)}

					<ImageSwiper images={postData.photoUrls} />

					<IconRow>
						<IconWrapper onClick={() => handleLikeCommentOpen('likes')}>
							<img src={heart} alt="Heart Icon" />
							<span>{postData.likes ?? 0}</span>
						</IconWrapper>
						<IconWrapper onClick={() => handleLikeCommentOpen('comments')}>
							<img src={comment} alt="Comment Icon" />
							<span>{postData.comments?.length ?? 0}</span>
						</IconWrapper>
					</IconRow>

					<ClothingInfoList>
						{postData.clothingInfo?.map((clothingObj, index) => (
							<ClothingInfoItem key={index} clothingObj={clothingObj} hasRightMargin={true} />
						))}
					</ClothingInfoList>
				</PostContainer>
			)}
			<NavBar />
			<BottomSheet {...likeCommentbottomSheetProps} />
		</OODDFrame>
	);
};

export default PostBase;
