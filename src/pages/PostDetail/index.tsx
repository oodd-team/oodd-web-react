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
} from './styles';
import NavbarDetail from '../../components/NavbarDetail';
import postImage from '../../assets/postImage.png';
import BottomSheet from '../../components/BottomSheet';
import MenuBottom from './MenuBottom';

const PostDetail: React.FC = () => {
	const { type } = useParams<{ type?: 'likes' | 'comments' }>();
	const [isBottomSheetOpen, setBottomSheetOpen] = useState(!!type);
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
			{isBottomSheetOpen && (
				<BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet} initialTab={currentTab} />
			)}
			{isMenuBottomOpen && (
				<MenuBottom isOpen={isMenuBottomOpen} onClose={handleCloseMenuBottom} onPinPost={handlePinPost} />
			)}
		</PostDetailContainer>
	);
};

export default PostDetail;
