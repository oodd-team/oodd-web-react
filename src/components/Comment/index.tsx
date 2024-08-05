import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { CommentLayout, SendContainer, CommentTextarea, SendImg } from './styles';
import Send from '/Send.svg';
import { useEffect, useRef, useState } from 'react';
import { CommentProps } from './dto';

const Comment: React.FC<CommentProps> = ({ sendComment }) => {
	const [comment, setComment] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// textarea 내용에 따라 높이 조정
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [comment]);

	const onChangeComment = (e: any) => {
		if (e.target.value.length >= 100) {
			return;
		} else {
			setComment(e.target.value);
		}
	};

	// textarea에서 enter 입력 시 실행
	const onKeyDown = (e: any): void => {
		if (comment === '') {
			e.preventDefault();
			return;
		}
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendComment(e.target.value);
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
				style={{ padding: '0 3.31rem', whiteSpace: 'normal', wordBreak: 'keep-all' }}
				$textTheme={{ style: 'body2-light', lineHeight: 1.5 }}
				color={theme.colors.gray3}
			>
				{/* TODO: 내용 고정? props로 받기? padding에 따라 개행? 고정 개행? 결정 후 수정 */}
				IDID님에게 대표 이미지와 함께 전달될 한줄 메시지를 보내보세요!
			</StyledText>
			<SendContainer>
				<CommentTextarea ref={textareaRef} value={comment} onChange={onChangeComment} onKeyDown={onKeyDown} />
				<SendImg src={Send} onClick={onClickSend} />
			</SendContainer>
		</CommentLayout>
	);
};

export default Comment;
