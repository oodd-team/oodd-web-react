import React, { useState } from 'react';
import { Content, PostContainer, ImageWrapper } from './styles';
import TopBar from '../../../components/TopBar';
import Modal from '../../../components/Modal';
import { ModalProps } from '../../../components/Modal/dto';
import close from '../../../assets/Upload/close.svg';
import { InstaFeedSelectModalProps, Post } from './dto';

const InstaFeedSelectModal: React.FC<InstaFeedSelectModalProps> = ({ posts, onAddImages, onClose, onNext }) => {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);

	const modalProps: ModalProps = {
		content: `계정 연동에 성공했어요!\n가져올 OOTD를 선택해 보세요`,
		onClose: () => {
			setIsSuccessModalOpen(false);
		},
	};

	const handlePostSelect = (post: Post) => {
		const newImages = post.imgs;
		onAddImages(newImages);
		onNext();
	};

	return (
		<>
			{isSuccessModalOpen && <Modal {...modalProps} />}
			<TopBar text="가져올 OOTD 선택" LeftButtonSrc={close} onLeftClick={onClose} />
			<Content>
				{posts.map((post, index) => (
					<PostContainer key={index} onClick={() => handlePostSelect(post)}>
						<ImageWrapper>
							<img src={post.imgs[0]} />
						</ImageWrapper>
					</PostContainer>
				))}
			</Content>
		</>
	);
};

export default InstaFeedSelectModal;
