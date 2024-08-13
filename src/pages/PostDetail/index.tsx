import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
} from './styles';

import { OODDFrame } from '../../components/Frame/Frame';

import { StyledText } from '../../components/Text/StyledText';
import theme from '../../styles/theme';
import NavbarDetail from '../../components/NavbarDetail';
import postImage from '../../assets/postImage.png';
import MenuBottom from './MenuBottom';
import mockImage from './mockImage.png';
import heartIcon from './heartIcon.svg';
import commentIcon from './commentIcon.svg';
import nextIcon from './nextIcon.svg';

import BottomSheet from '../../components/BottomSheet';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';

const PostDetail: React.FC = () => {
	const { type } = useParams<{ type?: 'likes' | 'comments' }>();
	const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
	const [currentTab, setCurrentTab] = useState<'likes' | 'comments'>(type || 'likes');
	const [isMenuBottomOpen, setMenuBottomOpen] = useState(false);

	const handleCloseBottomSheet = () => {
		setBottomSheetOpen(false);
	};

	const handleMenuClick = () => {
		setMenuBottomOpen(true);
	};

	const handleCloseMenuBottom = () => {
		setMenuBottomOpen(false);
	};

	const handlePinPost = () => {
		// 핀 지정 로직 추가
		console.log('핀 지정');
		handleCloseMenuBottom();
	};

	const bottomSheetMenuProps: BottomSheetMenuProps = {
		items: [
			{
				text: '인스타 피드 가져오기',
				action: () => {
					setIsBottomSheetOpen(false);
					handleInstagramSelect();
				},
				icon: Insta,
			},
			{
				text: '사진 올리기',
				action: () => {
					setIsBottomSheetOpen(false);
					handlePhotoUploadSelect();
				},
				icon: Picture,
			},
		],
		marginBottom: '50px',
	};

	const bottomSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isBottomSheetOpen,
		isHandlerVisible: true,
		isBackgroundDimmed: true,
		Component: BottomSheetMenu,
		componentProps: bottomSheetMenuProps,
		onCloseBottomSheet: () => {
			setIsBottomSheetOpen(false);
		},
	};

	const handleOpenSheet = () => {
		setIsBottomSheetOpen(true);
	};

	useEffect(() => {
		if (isBottomSheetOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isBottomSheetOpen]);

	useEffect(() => {
		if (type) {
			setCurrentTab(type);
			setBottomSheetOpen(true);
		}
	}, [type]);

	return (
		<OODDFrame>
			<PostDetailContainer>
				<NavbarDetail />
				<UserInfoContainer>
					<UserRow>
						<Pic_exam>
							<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
								<circle cx="18" cy="18" r="18" fill="#D9D9D9" />
							</svg>
						</Pic_exam>
						<UserID>IDID</UserID>
					</UserRow>
					<Text>Text~~~~~~~~~~~~~~~~~~~~~~~ ...</Text>
				</UserInfoContainer>
				<Menu onClick={handleMenuClick}>
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
					<Image src={postImage} alt="Post" />
				</ImageWrapper>
				{isBottomSheetOpen && <BottomSheet {...bottomSheetProps} />}

				{isMenuBottomOpen && (
					<MenuBottom
						isOpen={isMenuBottomOpen}
						onClose={handleCloseMenuBottom}
						onPinPost={handlePinPost}
						postId={postId} // postId를 MenuBottom에 전달
					/>
				)}

				<IconRow>
					<IconWrapper>
						<img src={heartIcon} alt="Heart Icon" />
						<span>11</span> {/* 좋아요 수 */}
					</IconWrapper>
					<IconWrapper>
						<img src={commentIcon} alt="Comment Icon" />
						<span>11</span> {/* 댓글 수 */}
					</IconWrapper>
				</IconRow>

				<BrandBoxContainer>
					<BrandBox>
						<img src={mockImage} alt="브랜드 이미지" />
						<div>
							<span>
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
									브랜드명
								</StyledText>
							</span>
							<BrandLink>
								<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
									모델명/모델번호/URL...
								</StyledText>
							</BrandLink>
						</div>
						<img src={nextIcon} alt="Next Icon" className="next-icon" />
					</BrandBox>
					<BrandBox>
						<img src={mockImage} alt="브랜드 이미지" />

						<div>
							<span>
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
									브랜드명
								</StyledText>
							</span>
							<BrandLink>
								<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
									모델명/모델번호/URL...
								</StyledText>
							</BrandLink>
						</div>
						<img src={nextIcon} alt="Next Icon" className="next-icon" />
					</BrandBox>
					<BrandBox>
						<img src={mockImage} alt="브랜드 이미지" />

						<div>
							<span>
								<StyledText $textTheme={{ style: 'body2-light', lineHeight: 1 }} color={theme.colors.black}>
									브랜드명
								</StyledText>
							</span>
							<BrandLink>
								<StyledText $textTheme={{ style: 'body6-light', lineHeight: 1 }} color={theme.colors.gray4}>
									모델명/모델번호/URL...
								</StyledText>
							</BrandLink>
						</div>
						<img src={nextIcon} alt="Next Icon" className="next-icon" />
					</BrandBox>
				</BrandBoxContainer>
			</PostDetailContainer>
		</OODDFrame>
	);
};

export default PostDetail;
