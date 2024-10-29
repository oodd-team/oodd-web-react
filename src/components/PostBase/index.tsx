import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
import ImageSwiper from './ImageSwiper';
import ClothingInfoItem from '../ClothingInfoItem';
import LikeCommentBottomSheet from './LikeCommentBottomSheet';
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
	const location = useLocation();

	useEffect(() => {
		if (location.state && location.state.isCommentModalOpen) {
			// Logic for comment modal
		}
	}, [location.state]);

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

		// 유저 정보 가져오기_상대방
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

	const handleLikeCommentOpen = (tab: 'likes' | 'comments') => {
		setActiveTab(tab); // 클릭한 버튼에 따라 activeTab 설정
		setIsLikeCommentBottomSheetOpen(true);
	};

	return (
		<OODDFrame>
			{!postData || isLoading ? (
				<Loading />
			) : (
				<PostContainer>
					<TopBar LeftButtonSrc={back} />
					<PostInfoContainer>
						<UserInfo onClick={() => nav(`/users/${postData.userId}`)}>
							<UserProfile>
								<img src={user?.profilePictureUrl} alt="profileImg" />
							</UserProfile>
							<UserName>
								<StyledText $textTheme={{ style: 'body2-medium', lineHeight: 1 }} color={theme.colors.black}>
									{userName}
								</StyledText>
							</UserName>
						</UserInfo>
						<MenuBtn onClick={() => onClickMenu}>
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
							<span>{0}</span>
						</IconWrapper>
						<IconWrapper onClick={() => handleLikeCommentOpen('comments')}>
							<img src={comment} alt="Comment Icon" />
							<span>{0}</span>
						</IconWrapper>
					</IconRow>

					<ClothingInfoList>
						{postData.clothingInfo?.map((clothingObj, index) => (
							<ClothingInfoItem key={index} clothingObj={clothingObj} hasRightMargin={true} />
						))}
					</ClothingInfoList>
				</PostContainer>
			)}
			{isLikeCommentBottomSheetOpen && <LikeCommentBottomSheet tab={activeTab} />}
		</OODDFrame>
	);
};

export default PostBase;
