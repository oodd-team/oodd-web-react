import React, { useState } from 'react';
import { Content, PostContainer, ImageWrapper } from './styles';
import { Header, PrevButton } from '../styles';
import { StyledText } from '../../../components/Text/StyledText';
import Modal from '../../../components/Modal';
import { ModalProps } from '../../../components/Modal/dto';
import close from '../assets/close.svg';
import { InstaFeedSelectModalProps, Post } from './dto';
//import { posts } from './dummyPosts';

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
			<Header>
				<PrevButton onClick={onClose}>
					<img src={close} />
				</PrevButton>
				<StyledText $textTheme={{ style: 'body2-light', lineHeight: 2 }}>가져올 OOTD 선택</StyledText>
			</Header>
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
