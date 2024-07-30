import React, { useState, useEffect, TouchEvent } from 'react';
import {
	BottomSheetContainer,
	Overlay,
	Tab,
	TabContent,
	TabButton,
	LikesList,
	CommentsList,
	UserRow,
	Pic,
	UserID,
	DragHandle,
} from './styles';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	initialTab: 'likes' | 'comments';
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, initialTab }) => {
	const [currentTab, setCurrentTab] = useState<'likes' | 'comments'>(initialTab);
	const [dragStart, setDragStart] = useState(0);
	const [translateY, setTranslateY] = useState(0);

	const handleTabChange = (tab: 'likes' | 'comments') => {
		setCurrentTab(tab);
	};

	const handleOverlayClick = () => {
		onClose();
	};

	const handleDragStart = (e: TouchEvent<HTMLDivElement>) => {
		setDragStart(e.touches[0].clientY);
	};

	const handleDrag = (e: TouchEvent<HTMLDivElement>) => {
		const touchY = e.touches[0].clientY;
		const diff = touchY - dragStart;
		if (diff > 0) {
			setTranslateY(diff);
		}
	};

	const handleDragEnd = () => {
		if (translateY > 100) {
			onClose();
		}
		setTranslateY(0);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	useEffect(() => {
		setCurrentTab(initialTab);
	}, [initialTab]);

	const likes = ['IDID1', 'IDID2', 'IDID3', 'IDID4', 'IDID5']; // 예시 데이터
	const comments = ['Comment1', 'Comment2', 'Comment3', 'Comment4', 'Comment5']; // 예시 데이터

	return (
		<>
			<Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
			<BottomSheetContainer
				$isOpen={isOpen}
				style={{ transform: `translateY(${translateY}px)` }}
				onTouchStart={handleDragStart}
				onTouchMove={handleDrag}
				onTouchEnd={handleDragEnd}
			>
				<DragHandle />
				<Tab>
					<TabButton onClick={() => handleTabChange('likes')} $isActive={currentTab === 'likes'}>
						좋아요 {likes.length}
					</TabButton>
					<TabButton onClick={() => handleTabChange('comments')} $isActive={currentTab === 'comments'}>
						코멘트 {comments.length}
					</TabButton>
				</Tab>
				<TabContent>
					{currentTab === 'likes' ? (
						<LikesList>
							{likes.map((id, index) => (
								<UserRow key={index}>
									<Pic>
										<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
											<circle cx="18" cy="18" r="18" fill="#D9D9D9" />
										</svg>
									</Pic>
									<UserID>{id}</UserID>
								</UserRow>
							))}
						</LikesList>
					) : (
						<CommentsList>
							{comments.map((comment, index) => (
								<UserRow key={index}>
									<Pic>
										<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
											<circle cx="18" cy="18" r="18" fill="#D9D9D9" />
										</svg>
									</Pic>
									<UserID>{comment}</UserID>
								</UserRow>
							))}
						</CommentsList>
					)}
				</TabContent>
			</BottomSheetContainer>
		</>
	);
};

export default BottomSheet;
