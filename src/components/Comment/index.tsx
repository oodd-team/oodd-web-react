import { StyledText } from '../Text/StyledText';
import { CommentLayout, SendContainer, CommentTextarea, SendImg } from './styles';
import Send from '../../assets/default/send-comment.svg';
import React, { useEffect, useRef, useState } from 'react';
import { CommentProps } from './dto';

const Comment: React.FC<CommentProps> = ({ content, sendComment, isModal }) => {
	const [comment, setComment] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// textarea 높이 조정 함수
	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem'; // 초기 높이 설정
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 재조정
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	}, [comment]); // comment가 변경될 때만 높이 재조정

	const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.length <= 100) {
			setComment(e.target.value);
		}
	};

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

	const handleSendButtonClick = () => {
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
				<SendImg src={Send} onClick={handleSendButtonClick} />
			</SendContainer>
		</CommentLayout>
	);
};

export default Comment;
