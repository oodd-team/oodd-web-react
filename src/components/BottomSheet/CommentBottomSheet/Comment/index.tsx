import { useEffect, useRef, useState } from 'react';

import send from '@assets/default/send-comment.svg';

import { StyledText } from '@components/Text/StyledText';

import type { CommentProps } from './dto';

import { CommentLayout, SendContainer, CommentTextarea, SendButton } from './styles';

const Comment: React.FC<CommentProps> = ({ content, sendComment, isModal = false }) => {
	const [comment, setComment] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// textarea 높이 조정
	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem'; // 초기 높이 설정
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 재조정
		}
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.length <= 100) {
			setComment(e.target.value);
		}
	};

	const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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

	// comment가 변경될 때만 높이 재조정
	useEffect(() => {
		adjustTextareaHeight();
	}, [comment]);

	return (
		<CommentLayout $isModal={isModal}>
			<StyledText $textTheme={{ style: 'body1-regular' }}>{content}</StyledText>
			<SendContainer>
				<CommentTextarea
					ref={textareaRef}
					value={comment}
					onChange={handleCommentChange}
					onKeyDown={handleEnterKeyDown}
					maxLength={100}
				/>
				<SendButton onClick={handleSendButtonClick}>
					<img src={send} alt="메시지 전송 아이콘" />
				</SendButton>
			</SendContainer>
		</CommentLayout>
	);
};

export default Comment;
