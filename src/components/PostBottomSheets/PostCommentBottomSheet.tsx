import { CommentProps } from '../Comment/dto';
import request from '../../apis/core';
import { ApiDto } from './dto';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	IsPostCommentBottomSheetOpenAtom,
	IsPostCommentFailModalOpenAtom,
	IsPostCommentSuccessModalOpenAtom,
	PostCommentAtom,
} from '../../recoil/Home/PostCommentBottomSheetAtom';
import CommentBottomSheet from '../CommentBottomSheet';
import { CommentBottomSheetProps } from '../CommentBottomSheet/dto';

const PostCommentBottomSheet: React.FC = () => {
	const [isPostCommentBottomSheetOpen, setIsPostCommentBottomSheetOpen] = useRecoilState(
		IsPostCommentBottomSheetOpenAtom,
	);
	const [, setIsPostCommentSuccessModal] = useRecoilState(IsPostCommentSuccessModalOpenAtom);
	const [, setIsPostCommentFailModal] = useRecoilState(IsPostCommentFailModalOpenAtom);
	const postComment = useRecoilValue(PostCommentAtom);

	const postCommentProps: CommentProps = {
		content: `${postComment?.userName} 님의 게시물에 대한 코멘트를 남겨주세요\n코멘트는 ${postComment?.userName} 님에게만 전달됩니다`,
		sendComment: (message: string) => {
			const postNewComment = async () => {
				if (postComment) {
					const response = await request.post<ApiDto>(`/posts/${postComment.postId}/comment`, {
						content: message,
					});

					if (response.isSuccess) {
						setIsPostCommentBottomSheetOpen(false);
						setTimeout(() => {
							setIsPostCommentSuccessModal(true);
						}, 100);
					} else {
						setIsPostCommentFailModal(true);
					}
				} else {
					alert('잘못된 요청입니다.');
				}
			};

			postNewComment();
		},
	};

	const commentBottomSheetProps: CommentBottomSheetProps = {
		isBottomSheetOpen: isPostCommentBottomSheetOpen,
		commentProps: postCommentProps,
		handleCloseBottomSheet: () => {
			setIsPostCommentBottomSheetOpen(false);
		},
	};
	return <CommentBottomSheet {...commentBottomSheetProps} />;
};

export default PostCommentBottomSheet;
6;
