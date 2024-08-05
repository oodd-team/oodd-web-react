import { StyledText } from '../Text/StyledText';
import theme from '../../styles/theme';
import { CommentLayout, SendContainer, CommentTextarea, SendImg } from './styles';
import Send from '/Send.svg';
import { useEffect, useRef, useState } from 'react';

const Comment: React.FC = () => {
	const [comment, setComment] = useState('');
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = '1.2rem';
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이를 설정
		}
	}, [comment]);

	const onChangeComment = (e: any) => {
		if (e.target.value.length >= 100) {
			return;
		} else {
			setComment(e.target.value);
		}
	};

	return (
		<CommentLayout>
			<StyledText
				style={{ padding: '0 3.31rem', whiteSpace: 'normal', wordBreak: 'keep-all' }}
				$textTheme={{ style: 'body2-light', lineHeight: 1.5 }}
				color={theme.colors.gray3}
			>
				IDID님에게 대표 이미지와 함께 전달될
				<br />
				한줄 메시지를 보내보세요!
			</StyledText>
			<SendContainer>
				<CommentTextarea ref={textareaRef} value={comment} onChange={onChangeComment} />
				<SendImg src={Send} />
			</SendContainer>
		</CommentLayout>
	);
};

export default Comment;
