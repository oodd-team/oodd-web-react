import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { postImagesAtom } from '../../recoil/PostUpload/PostUploadAtom';
import { Content, PostContainer, ImageWrapper } from './styles';
import { OODDFrame } from '../../components/Frame/Frame';
import TopBar from '../../components/TopBar';
import Modal from '../../components/Modal';
import ConfirmationModal from '../../components/ConfirmationModal';
import { ConfirmationModalProps } from '../../components/ConfirmationModal/dto';
import { ModalProps } from '../../components/Modal/dto';
import close from '../../assets/Upload/close.svg';
import { InstaFeedSelectModalProps, Post } from './dto';

const PostInstaFeedSelect: React.FC<InstaFeedSelectModalProps> = () => {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);
	const [, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [posts, setPosts] = useState<Post[]>([]); // Post 타입으로 지정
	const [, setImages] = useRecoilState(postImagesAtom);
	const navigate = useNavigate();

	// 인스타그램 데이터 가져오는 함수
	const fetchInstagramData = async (accessToken: string) => {
		try {
			setIsLoading(true);
			const response = await axios.get('https://localhost:3001/instagram-import', {
				params: { access_token: accessToken },
			});
			setPosts(response.data as Post[]); // Post 타입으로 받아옴
		} catch (error) {
			console.error('Failed to fetch Instagram media:', error);
			setIsModalOpen(true); // 실패 모달 열기
		} finally {
			setIsLoading(false);
		}
	};

	// 연동 실패 모달 속성
	const failedModalProps: ConfirmationModalProps = {
		content: `계정 연동에 실패했어요`,
		isCancelButtonVisible: false,
		confirm: {
			text: '다시 시도하기',
			action: () => {
				setIsModalOpen(false);
				fetchInstagramData('accessToken'); // 함수 호출 시 실행되도록 수정
			},
		},
		onCloseModal: () => {
			setIsModalOpen(false);
		},
	};

	// 연동 성공 모달 속성
	const modalProps: ModalProps = {
		content: `계정 연동에 성공했어요!\n가져올 OOTD를 선택해 보세요`,
		onClose: () => {
			setIsSuccessModalOpen(false);
		},
	};

	// 이미지 선택 시 실행
	const handlePostSelect = (post: Post) => {
		const newImages = post.imgs;
		setImages(newImages); // 선택한 이미지 Recoil 상태로 설정
		navigate('/upload'); // 다음 페이지로 이동
	};

	// 페이지 종료 함수
	const handleClose = () => {
		navigate('/mypage'); // 마이페이지로 이동
	};

	return (
		<OODDFrame>
			{isSuccessModalOpen && <Modal {...modalProps} />}
			<TopBar text="가져올 OOTD 선택" LeftButtonSrc={close} onLeftClick={handleClose} />{' '}
			{/* onClose 대신 handleClose 사용 */}
			<Content>
				{posts.map((post, index) => (
					<PostContainer key={index} onClick={() => handlePostSelect(post)}>
						<ImageWrapper>
							<img src={post.imgs[0]} alt={`Instagram post ${index}`} /> {/* alt 추가 */}
						</ImageWrapper>
					</PostContainer>
				))}
			</Content>
			{isModalOpen && <ConfirmationModal {...failedModalProps} />} {/* 오류 모달 표시 */}
		</OODDFrame>
	);
};

export default PostInstaFeedSelect;
