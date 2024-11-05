import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import HomeTopBar from './HomeTopBar';
import NavBar from '../../components/NavBar';
import { HomeContainer } from './styles';
import request, { BaseResponse } from '../../apis/core';

import Modal from '../../components/Modal/index.tsx';
import HeartBottomSheet from '../../components/PostBottomSheets/HeartBottomSheet.tsx';
import {
	IsRequestFailModalOpenAtom,
	IsRequestSuccessModalOpenAtom,
	PostRequestAtom,
} from '../../recoil/Home/HeartBottomSheetAtom.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ModalProps } from '../../components/Modal/dto.ts';
import {
	IsBlockConfirmationModalOpenAtom,
	IsBlockFailModalOpenAtom,
	IsBlockSuccessModalOpenAtom,
	PostBlockAtom,
} from '../../recoil/Home/BlockBottomSheetAtom.ts';
import BlockConfirmationModal from '../../components/PostBottomSheets/BlockConfirmationModal.tsx';
import MeatballBottomSheet from '../../components/PostBottomSheets/MeatballBottomSheet.tsx';
import ReportBottomSheet from '../../components/PostBottomSheets/ReportBottomSheet.tsx';
import {
	IsReportFailModalOpenAtom,
	IsReportSuccessModalOpenAtom,
	PostReportAtom,
} from '../../recoil/Home/MeatballBottomSheetAtom.ts';
import OOTD from './OOTD/index.tsx';

interface UserResponseType {
	id: number;
	name: string;
	email: string;
	nickname: string | null;
	phoneNumber: string | null;
	profilePictureUrl: string;
	bio: string | null;
	joinedAt: string;
}

interface UserResponse extends BaseResponse<UserResponseType> {}

// Home 페이지입니다.
const Home: React.FC = () => {
	const navigate = useNavigate();

	// 모달과 바텀시트 상태 및 로직
	const [isRequestSuccessModalOpen, setIsRequestSuccessModalOpen] = useRecoilState(IsRequestSuccessModalOpenAtom);
	const [isRequestFailModalOpen, setIsRequestFailModalOpen] = useRecoilState(IsRequestFailModalOpenAtom);
	const postRequest = useRecoilValue(PostRequestAtom);
	const [isBlockSuccessModalOpen, setIsBlockSuccessModalOpen] = useRecoilState(IsBlockSuccessModalOpenAtom);
	const [isBlockFailModalOpen, setIsBlockFailModalOpen] = useRecoilState(IsBlockFailModalOpenAtom);
	const isBlockConfirmationModalOpen = useRecoilValue(IsBlockConfirmationModalOpenAtom);
	const postBlock = useRecoilValue(PostBlockAtom);
	const [isReportSuccessModalOpen, setIsReportSuccessModalOpen] = useRecoilState(IsReportSuccessModalOpenAtom);
	const [isReportFailModalOpen, setIsReportFailModalOpen] = useRecoilState(IsReportFailModalOpenAtom);
	const postReport = useRecoilValue(PostReportAtom);

	const ootdTooltipRef = useRef<HTMLDivElement[]>([]);

	// 로그인 여부에 따라 navigate
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
				if (!response || !response.result.id) {
					console.log(response);
					navigate('/login');
				}
			} catch (error) {
				console.error('Failed to authenticate user:', error);
				navigate('/login');
			}
		};

		checkAuth();
	}, [navigate]);

	// feed
	// x 버튼 클릭 시
	const blockSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsBlockSuccessModalOpen(false);
		},
		content: `${postBlock?.friendName} 님을 차단했어요`,
	};

	const blockFailModalProps: ModalProps = {
		onClose: () => {
			setIsBlockFailModalOpen(false);
		},
		content: `차단에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	// 하트 버튼 클릭 시
	const requestSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsRequestSuccessModalOpen(false);
		},
		content: `${postRequest?.targetName} 님에게 대표 OOTD와\n한줄 메시지를 보냈어요!`,
	};

	const requestFailModalProps: ModalProps = {
		onClose: () => {
			setIsRequestFailModalOpen(false);
		},
		content: `요청에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	// 신고하기 메뉴
	const reportSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsReportSuccessModalOpen(false);
		},
		content: `${postReport?.userName} 님의\nOOTD를 신고했어요`,
	};

	const reportFailModalProps: ModalProps = {
		onClose: () => {
			setIsReportFailModalOpen(false);
		},
		content: `신고에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	return (
		<OODDFrame>
			{isBlockConfirmationModalOpen && <BlockConfirmationModal />}
			{isBlockSuccessModalOpen && <Modal {...blockSuccessModalProps} />}
			{isBlockFailModalOpen && <Modal {...blockFailModalProps} />}

			<HeartBottomSheet />
			{isRequestSuccessModalOpen && <Modal {...requestSuccessModalProps} />}
			{isRequestFailModalOpen && <Modal {...requestFailModalProps} />}

			<MeatballBottomSheet />
			<ReportBottomSheet />
			{isReportSuccessModalOpen && <Modal {...reportSuccessModalProps} />}
			{isReportFailModalOpen && <Modal {...reportFailModalProps} />}

			<HomeContainer>
				<HomeTopBar />
				<OOTD tooltipRef={ootdTooltipRef} />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
