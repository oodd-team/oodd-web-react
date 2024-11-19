import React, { useRef, useState } from 'react';
import { OODDFrame } from '../../components/Frame/Frame';
import NavBar from '../../components/NavBar';
import ApiModal from '../../components/Modal/ApiModal/index.tsx';
import CommentBottomSheet from '../../components/CommentBottomSheet/index.tsx';

import { ApiModalProps } from '../../components/Modal/ApiModal/dto.ts';
import { CommentBottomSheetProps } from '../../components/CommentBottomSheet/dto.ts';
import { createMatchingApi } from '../../apis/matching/index.ts';
import { CreateMatchingRequest, CreateMatchingResponse } from '../../apis/matching/dto.ts';

import {
	MatchingInfoAtom,
	IsMatchingCommentBottomSheetOpenAtom,
} from '../../recoil/Home/MatchingCommentBottomSheetAtom.ts';
import { PostBlockAtom } from '../../recoil/Home/BlockBottomSheetAtom.ts';
import { useRecoilState, useRecoilValue } from 'recoil';

import HomeTopBar from './HomeTopBar';
import OOTD from './OOTD/index.tsx';
import { HomeContainer } from './styles';
import { handleError } from '../../apis/util/handleError.ts';
import Modal from '../../components/Modal/index.tsx';
import { ModalProps } from '../../components/Modal/dto.ts';

// Home 페이지입니다.
const Home: React.FC = () => {
	const blockInfo = useRecoilValue(PostBlockAtom);
	const matchingInfo = useRecoilValue(MatchingInfoAtom);
	const [isBlockApiModalOpen, setIsBlockApiModalOpen] = useState(false);
	const [isMatchingCommentBottomSheetOpen, setIsMatchingCommentBottomSheetOpen] = useRecoilState(
		IsMatchingCommentBottomSheetOpenAtom,
	);
	const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');
	const ootdTooltipRef = useRef<HTMLDivElement[]>([]);

	// 매칭 생성 api
	const createMatching = async (comment: string) => {
		try {
			const matchingRequest: CreateMatchingRequest = {
				requesterId: matchingInfo!.requesterId,
				targetId: matchingInfo!.targetId,
				message: comment,
			};
			const response = await createMatchingApi(matchingRequest);

			if (response.isSuccess) {
				setModalContent(`${matchingInfo?.targetName} 님에게 대표 OOTD와\n한 줄 메세지를 보냈어요!`);
			}
		} catch (error) {
			const errorMessage = handleError(error);
			setModalContent(errorMessage);
		} finally {
			setIsMatchingCommentBottomSheetOpen(false);
			setIsStatusModalOpen(true);
		}
	};

	// x 버튼 클릭 시
	// TODO: 차단하기 api 생성되면 호출하는 api 함수 수정
	const blockApiModalProps: ApiModalProps<CreateMatchingResponse> = {
		response: createMatchingApi({ requesterId: 0, targetId: 0, message: '' }),
		content: `${blockInfo?.friendName || '알수없음'}님을 정말로 차단하시겠어요?`,
		buttonContent: '차단하기',
		successContent: '정상적으로 처리되었습니다.',
		handleCloseModal: () => {
			setIsBlockApiModalOpen(true);
		},
	};

	const matchingCommentBottomSheetProps: CommentBottomSheetProps = {
		isBottomSheetOpen: isMatchingCommentBottomSheetOpen,
		commentProps: {
			content: `${matchingInfo?.targetName} 님에게 대표 OOTD와 함께 전달될\n한줄 메시지를 보내보세요!`,
			sendComment: createMatching,
		},
		handleCloseBottomSheet: () => {
			setIsMatchingCommentBottomSheetOpen(false);
		},
	};

	// api 응답 상태에 따른 메시지를 출력하는 모달
	const statusModalProps: ModalProps = {
		content: modalContent,
		onClose: () => {
			setIsStatusModalOpen(false);
		},
	};

	return (
		<OODDFrame>
			{isBlockApiModalOpen && <ApiModal {...blockApiModalProps} />}
			<CommentBottomSheet {...matchingCommentBottomSheetProps} />
			{isStatusModalOpen && <Modal {...statusModalProps} />}

			<HomeContainer>
				<HomeTopBar />
				<OOTD tooltipRef={ootdTooltipRef} />
			</HomeContainer>
			<NavBar />
		</OODDFrame>
	);
};

export default Home;
