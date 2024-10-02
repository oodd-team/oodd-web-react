import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { CommentLayout, SendContainer, CommentTextarea, SendImg } from './styles';
import Send from '/Send.svg';
import React, { useEffect, useRef, useState } from 'react';
import { CommentProps } from './dto';

const Comment: React.FC<CommentProps> = ({ content, sendComment }) => {
	const [comment, setComment] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// textarea 내용에 따라 높이 조정
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [comment]);

	const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.length <= 100) {
			setComment(e.target.value);
		}
	};

	// textarea에서 enter 입력 시 실행
	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
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
	const onClickSend = (): void => {
		if (comment === '') {
			return;
		}
		if (textareaRef.current) {
			sendComment(textareaRef.current.value);
		}
		setComment('');
	};

	return (
		<CommentLayout>
			<StyledText
				style={{ whiteSpace: 'pre-line' }}
				$textTheme={{ style: 'body2-light', lineHeight: 1.5 }}
				color={theme.colors.gray3}
			>
				{content}
			</StyledText>
			<SendContainer>
				<CommentTextarea
					ref={textareaRef}
					value={comment}
					onChange={onChangeComment}
					onKeyDown={onKeyDown}
					maxLength={100}
				/>
				<SendImg src={Send} onClick={onClickSend} />
			</SendContainer>
		</CommentLayout>
	);
};

export default Comment;
