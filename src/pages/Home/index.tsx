import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OODDFrame } from '../../components/Frame/Frame';
import HomeTabBar from './HomeTabBar';
import HomeTopBar from './HomeTopBar';
import NavBar from '../../components/NavBar';
import { HomeContainer } from './styles';
import request, { BaseResponse } from '../../apis/core';

import Modal from '../../components/Modal/index.tsx';
import HeartBottomSheet from './BottomSheets/HeartBottomSheet.tsx';
import {
	IsOpenRequestFailModalAtom,
	IsOpenRequestSuccessModalAtom,
	PostRequestAtom,
} from '../../recoil/HeartBottomSheetAtom.ts';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ModalProps } from '../../components/Modal/dto.ts';
import {
	IsOpenBlockConfirmationModalAtom,
	IsOpenBlockFailModalAtom,
	IsOpenBlockSuccessModalAtom,
	PostBlockAtom,
} from '../../recoil/BlockBottomSheetAtom.ts';
import BlockConfirmationModal from './BottomSheets/BlockBottomSheet.tsx';
import MeatballBottomSheet from './BottomSheets/MeatballBottomSheet.tsx';
import ReportBottomSheet from './BottomSheets/ReportBottomSheet.tsx';
import {
	IsOpenReportFailModalAtom,
	IsOpenReportSuccessModalAtom,
	PostReportAtom,
} from '../../recoil/MeatballBottomSheetAtom.ts';

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
	const [isOpenRequestSuccessModal, setIsOpenRequestSuccessModal] = useRecoilState(IsOpenRequestSuccessModalAtom);
	const [isOpenRequestFailModal, setIsOpenRequestFailModal] = useRecoilState(IsOpenRequestFailModalAtom);
	const postRequest = useRecoilValue(PostRequestAtom);
	const [isOpenBlockSuccessModal, setIsOpenBlockSuccessModal] = useRecoilState(IsOpenBlockSuccessModalAtom);
	const [isOpenBlockFailModal, setIsOpenBlockFailModal] = useRecoilState(IsOpenBlockFailModalAtom);
	const isOpenBlockConfirmationModal = useRecoilValue(IsOpenBlockConfirmationModalAtom);
	const postBlock = useRecoilValue(PostBlockAtom);
	const [isOpenReportSuccessModal, setIsOpenReportSuccessModal] = useRecoilState(IsOpenReportSuccessModalAtom);
	const [isOpenReportFailModal, setIsOpenReportFailModal] = useRecoilState(IsOpenReportFailModalAtom);
	const postReport = useRecoilValue(PostReportAtom);
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
			setIsOpenBlockSuccessModal(false);
		},
		content: `${postBlock?.friendName} 님을 차단했어요`,
	};

	const blockFailModalProps: ModalProps = {
		onClose: () => {
			setIsOpenBlockFailModal(false);
		},
		content: `차단에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	// 하트 버튼 클릭 시
	const requestSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsOpenRequestSuccessModal(false);
		},
		content: `${postRequest?.targetName} 님에게 대표 OOTD와\n한줄 메시지를 보냈어요!`,
	};

	const requestFailModalProps: ModalProps = {
		onClose: () => {
			setIsOpenRequestFailModal(false);
		},
		content: `요청에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	// 신고하기 메뉴
	const reportSuccessModalProps: ModalProps = {
		onClose: () => {
			setIsOpenReportSuccessModal(false);
		},
		content: `${postReport?.userName} 님의\nOOTD를 신고했어요`,
	};

	const reportFailModalProps: ModalProps = {
		onClose: () => {
			setIsOpenReportFailModal(false);
		},
		content: `신고에 실패했어요\n잠시 뒤 다시 시도해 보세요`,
	};

	return (
		<OODDFrame>
			{isOpenBlockConfirmationModal && <BlockConfirmationModal />}
			{isOpenBlockSuccessModal && <Modal {...blockSuccessModalProps} />}
			{isOpenBlockFailModal && <Modal {...blockFailModalProps} />}

			<HeartBottomSheet />
			{isOpenRequestSuccessModal && <Modal {...requestSuccessModalProps} />}
			{isOpenRequestFailModal && <Modal {...requestFailModalProps} />}

			<MeatballBottomSheet />
			<ReportBottomSheet />
			{isOpenReportSuccessModal && <Modal {...reportSuccessModalProps} />}
			{isOpenReportFailModal && <Modal {...reportFailModalProps} />}

			<HomeContainer>
				<HomeTopBar />
				<HomeTabBar />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
