import { StyledText } from '../Text/StyledText';
import { CommentLayout, SendContainer, CommentTextarea, SendImg } from './styles';
import Send from '../../assets/default/send.svg';
import React, { useEffect, useRef, useState } from 'react';
import { CommentProps } from './dto';

const Comment: React.FC<CommentProps> = ({ content, sendComment, isModal }) => {
	const [comment, setComment] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// textarea 내용에 따라 높이 조정
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [comment]);

	const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		console.log(e.target.value);
		if (e.target.value.length <= 100) {
			setComment(e.target.value);
		}
	};

	// textarea에서 enter 입력 시 실행
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (comment === '') {
			e.preventDefault();
			return;
		}
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendComment(e.currentTarget.value);
			setComment('');
		}
	};

	// send 이미지 클릭 시 실행
	const handleClickSend = () => {
		if (comment === '') {
			return;
		}
		if (textareaRef.current) {
			sendComment(textareaRef.current.value);
			setComment('');
		}
	};

	return (
		<CommentLayout $isModal={isModal}>
			<StyledText $textTheme={{ style: 'body1-regular', lineHeight: 1.5 }}>{content}</StyledText>
			<SendContainer>
				<CommentTextarea
					ref={textareaRef}
					value={comment}
					onChange={handleChangeComment}
					onKeyDown={handleKeyDown}
					maxLength={100}
				/>
				<SendImg src={Send} onClick={handleClickSend} />
			</SendContainer>
		</CommentLayout>
	);
};

export default Comment;
