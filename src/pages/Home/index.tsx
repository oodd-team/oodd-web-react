import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import HomeTabBar from './HomeTabBar';
import HomeTopBar from './HomeTopBar';
import NavBar from '../../components/NavBar';
import { HomeContainer } from './styles';
import request from '../../apis/core';
import { BottomSheetMenuProps } from '../../components/BottomSheetMenu/dto';
import declaration from '../../assets/Post/declaration.svg';
import block from '../../assets/Post/block.svg';
import { BottomSheetProps } from '../../components/BottomSheet/dto';
import { CommentProps } from '../../components/Comment/dto';
import Comment from '../../components/Comment';
import BottomSheetMenu from '../../components/BottomSheetMenu';
import { InputLayout } from '../Post/styles.tsx';
import BottomButton from '../../components/BottomButton/index.tsx';
import BottomSheet from '../../components/BottomSheet/index.tsx';
import Modal from '../../components/Modal/index.tsx';
import ConfirmationModal from '../../components/ConfirmationModal/index.tsx';

interface UserResponse {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
}

// Home 페이지입니다.
const Home: React.FC = () => {
	const navigate = useNavigate();

	// 모달과 바텀시트 상태 및 로직
	const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
	const [isOpenReportSheet, setIsOpenReportSheet] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
	const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
	const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const userName = 'IDID'; // 임의의 사용자 이름

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
				text: '괴롭힘',
				action: () => {
					setIsOpenReportSheet(false);
					setIsModalOpen(true);
				},
			},
			{
				text: '그 외',
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

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
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

	const reportSheetProps: BottomSheetProps = {
		isOpenBottomSheet: isOpenReportSheet,
		isHandlerVisible: true,
		Component: () => (
			<div style={{ overflow: 'auto' }}>
				<BottomSheetMenu {...reportSheetMenuProps} />
				{showInput && (
					<InputLayout>
						<textarea
							ref={textareaRef}
							placeholder="해당 OOTD를 신고하려는 이유를 작성해주세요."
							value={inputValue}
							onChange={handleInputChange}
						></textarea>
						<BottomButton
							content="신고하기"
							onClick={() => {
								setIsOpenReportSheet(false);
								setIsModalOpen(true); // 모달을 연다
							}}
							disabled={inputValue.trim().length === 0} // 값이 없을 때 비활성화
						/>
					</InputLayout>
				)}
			</div>
		),
		onCloseBottomSheet: () => {
			setIsOpenReportSheet(false);
			setShowInput(false);
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

	useEffect(() => {
		const checkAuth = async () => {
			const userId = localStorage.getItem('id');
			const token = localStorage.getItem('jwt_token');

			if (!userId || !token) {
				navigate('/login');
				return;
			}

			try {
				const response = await request.get<UserResponse>(`/users/${userId}`);
				if (!response || !response.id) {
					navigate('/login');
				}
			} catch (error) {
				console.error('Failed to authenticate user:', error);
				navigate('/login');
			}
		};

		checkAuth();
	}, [navigate]);

	return (
		<OODDFrame>
			<HomeContainer>
				<HomeTopBar />
				<HomeTabBar
					onOpenBottomSheet={() => setIsOpenBottomSheet(true)}
					onOpenReportSheet={() => setIsOpenReportSheet(true)}
					onOpenCommentModal={() => setIsCommentModalOpen(true)}
					onOpenConfirmationModal={() => setIsConfirmationModalOpen(true)}
				/>
			</HomeContainer>
			<NavBar />

			{isOpenBottomSheet && <BottomSheet {...bottomSheetProps} />}
			{isOpenReportSheet && <BottomSheet {...reportSheetProps} />}
			{isCommentModalOpen && <BottomSheet {...commentSheetProps} />}
			{isModalOpen && <Modal content={`${userName}님의 OOTD를 신고했어요.`} onClose={() => setIsModalOpen(false)} />}
			{isConfirmationModalOpen && <ConfirmationModal {...confirmationModalProps} />}
			{isBlockedModalOpen && (
				<Modal content={`${userName}님을 차단했어요.`} onClose={() => setIsBlockedModalOpen(false)} />
			)}
		</OODDFrame>
	);
};

export default Home;
