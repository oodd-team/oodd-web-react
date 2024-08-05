import React, { useState, useEffect, TouchEvent } from 'react';
import { MenuBottomContainer, Overlay, DragHandle, ActionList, ActionItem, ActionText, ActionIcon } from './styles';
import PinIcon from './assets/PinIcon.svg';
import EditIcon from './assets/EditIcon.svg';
import DeleteIcon from './assets/DeleteIcon.png';
import DeleteModal from './DeleteModal';

interface MenuBottomProps {
	isOpen: boolean;
	onClose: () => void;
	onPinPost: () => void;
}

const MenuBottom: React.FC<MenuBottomProps> = ({ isOpen, onClose, onPinPost }) => {
	const [dragStart, setDragStart] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

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

	const handleDeleteClick = () => {
		setDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setDeleteModalOpen(false);
		onClose(); // MenuBottom 닫기
	};

	const handleConfirmDelete = () => {
		// 삭제 로직 추가
		console.log('삭제되었습니다.');
		setDeleteModalOpen(false);
		onClose(); // MenuBottom 닫기
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	return (
		<>
			<Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
			<MenuBottomContainer
				$isOpen={isOpen}
				style={{ transform: `translateY(${translateY}px)` }}
				onTouchStart={handleDragStart}
				onTouchMove={handleDrag}
				onTouchEnd={handleDragEnd}
			>
				<DragHandle />
				<ActionList>
					<ActionItem onClick={onPinPost}>
						<ActionText>대표 OOTD로 지정하기</ActionText>
						<ActionIcon src={PinIcon} alt="Pin" />
					</ActionItem>
					<ActionItem>
						<ActionText>OOTD 수정하기</ActionText>
						<ActionIcon src={EditIcon} alt="Edit" />
					</ActionItem>
					<ActionItem onClick={handleDeleteClick}>
						<ActionText>OOTD 삭제하기</ActionText>
						<ActionIcon src={DeleteIcon} alt="Delete" />
					</ActionItem>
				</ActionList>
			</MenuBottomContainer>
			{isDeleteModalOpen && (
				<DeleteModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
			)}
		</>
	);
};

export default MenuBottom;
